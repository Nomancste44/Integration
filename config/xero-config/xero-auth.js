'use strict'
const axios = require('axios').default;
const querystring = require('querystring');
const {KeyValuePairs} = require('../../lib/common/common');
const xeroConnectionsUrl = 'https://api.xero.com/connections';
const xeroAccessTokenUrl = 'https://identity.xero.com/connect/token';

const getXeroAuthRequestOptions = (clientInfo) =>{
    return {
        headers:{
            'Authorization': 'Basic ' 
                + Buffer.from(clientInfo.client_id + ':' + clientInfo.client_secret).toString('base64'),
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
            grant_type: 'authorization_code',
            redirect_uri: KeyValuePairs.xeroRedirectUri,
            code: clientInfo.code
        })
    }
}

const authenticateXeroClient = async(clientInfo)=>{
    let clientAccess;
    try {
        
        const options = getXeroAuthRequestOptions(clientInfo);

        await axios.post(xeroAccessTokenUrl, options.body, {headers: options.headers})
        .then(res=>{ clientAccess = res.data })
        .catch(err=>{ return Promise.reject(err) });

        return clientAccess;
    } catch (error) {  return Promise.reject(error);  }
    
}

const getXeroConnections = async(accessToken) =>{
    let connections;
    try {
        await axios.get(xeroConnectionsUrl,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })
        .then(res=> { connections = res.data})
        .catch(error=> { return Promise.reject(error) })
        connections = connections.map((aConnection)=>{
            return {
                tenantId: aConnection.tenantId,
                tenantType: aConnection.tenantType,
                tenantName: aConnection.tenantName
            }
        });
        return connections;
    } catch (error) { return Promise.reject(error)  }

}
const getXeroRefreshToken = async({clientId, clientSecret,refreshToken})=>{
    let clientAccess;
    try {
        await axios.post(xeroAccessTokenUrl, 
            querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }),
        {
            headers: {
                'Authorization': 'Basic ' 
                    + Buffer.from(clientId+ ':' + clientSecret).toString('base64'),
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        .then(res=>{ clientAccess = res.data })
        .catch(err=>{ return Promise.reject(err) });

        return clientAccess;
    } catch (error) {  return Promise.reject(error); }
}
module.exports = {
    authenticateXeroClient,
    getXeroConnections,
    getXeroRefreshToken
}