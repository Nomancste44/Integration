'use strict'
const { authenticateXeroClient, getXeroConnections } = require('../../config/xero-config/xero-auth');
const { storeXeroClientAccess } = require('../../config/xero-config/xero-client');
const {authenticateZohoClient} = require('../../config/zoho-config/zoho-auth');
const {storeZohoClientAccess} = require('../../config/zoho-config/zoho-client');
const { hooks} = require('../../lib/common/hooks');
const response = require('../common/endpoints-responses');

const getZohoClientAccess = async(event) =>{
    let headers = event.headers;
    let zohoAccessRes = await authenticateZohoClient(headers);
    if(['invalid_code','invalid_client'].indexOf(zohoAccessRes.error) > -1) 
        return response._400(zohoAccessRes.error);
    let storedToken = await storeZohoClientAccess(zohoAccessRes, headers);
    return response._201(storedToken);
}

const getXeroClientAccess = async(event) =>{
    let headers = event.headers;
    try {
        const xeroAccessTokenInfo = await authenticateXeroClient(headers);
        const connections = await getXeroConnections(xeroAccessTokenInfo.access_token);
        await storeXeroClientAccess(
            {
                xeroClient: xeroAccessTokenInfo, 
                connections: connections,
                clientInfo: headers
            }
        );
        return response._201(connections);
    } catch (error) {return response._500(error) }
}
module.exports={
    getZohoClientAccess : hooks(getZohoClientAccess),
    getXeroClientAccess : hooks(getXeroClientAccess)
}