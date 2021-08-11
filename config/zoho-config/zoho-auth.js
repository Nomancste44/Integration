const axios = require('axios').default;
const zohoClient = require('./zoho-client');
const zohoAuthTokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
const {KeyValuePairs}= require('../../lib/common/common');
const getZohoAuthRequestHeader = () => {
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'access-control-allow-origin': '*'
    };
};

const getZohoRefreshTokenParams = async(userId, tableName) => {
    let clientAccess = await zohoClient.getStoredZohoAccess(userId,tableName);
    return {
        refresh_token: clientAccess[KeyValuePairs.zohoRefreshTokenColumnName],
        grant_type: 'refresh_token',
        client_id: clientAccess[KeyValuePairs.zohoClientIdColumnName],
        client_secret:clientAccess[KeyValuePairs.zohoClientSecretColumnName],
    };
};


const authenticateZohoClient = async(clientInfo) =>{
    let result;
    let options ={
        headers: getZohoAuthRequestHeader(),
        params: {
            grant_type: 'authorization_code',
            client_id: clientInfo.client_id,
            client_secret: clientInfo.client_secret,
            redirect_uri: '',
            code: clientInfo.code
        }
    }
    await axios.post(zohoAuthTokenUrl, null, options)
    .then(res=>{
        result = res.data;
    })
    .catch(err=>{
        return Promise.reject(err);
    });
    return result;
}

const refreshToken = async(userId,tableName) =>{
    let accessToken;
    let options = {
        headers: getZohoAuthRequestHeader(),
        params: await getZohoRefreshTokenParams(userId,tableName)
    };
    await axios.post(zohoAuthTokenUrl, null, options)
    .then(res=>{
        accessToken = res.data.access_token;
    })
    .catch(err=>{
        return Promise.reject(err);
    });
    return accessToken;
};

module.exports = {
    refreshToken,
    authenticateZohoClient
}
