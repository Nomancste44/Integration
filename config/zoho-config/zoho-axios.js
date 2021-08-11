const axios = require('axios').default;
const axiosInstance = axios.create();
const zohoClient = require('./zoho-client');
const zohoAuth = require('./zoho-auth');
const {tableNameList} = require('../../bin/tableNames');
const {KeyValuePairs} = require('../../lib/common/common')
axiosInstance.interceptors.request.use(
    async config => {
        let userId = process.env.userId;
        let tableName =  tableNameList.userTable;
        const zohoAccessRes = await zohoClient.getStoredZohoAccess(userId,tableName);
        config.url = `${zohoAccessRes[KeyValuePairs.zohoApiDomainColumnName]}/${config.url}`;
        config.headers['Authorization']= `Zoho-oauthtoken ${zohoAccessRes[KeyValuePairs.zohoAccessTokenColumnName]}`;
        config.headers['Content-Type']= 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });

// Response interceptor for API calls
axiosInstance.interceptors.response.use((response) => {
    return response
}, async(error) =>{
    if (error.response.status === 401 && !error.config._retry) {
        error.config._retry = true;
        let userId = process.env.userId;
        let tableName = tableNameList.userTable;
        const accessToken = await zohoAuth.refreshToken(userId,tableName);
        await zohoClient.updateAccessToken(accessToken,userId,tableName);
        error.response.config.headers['Authorization'] = `Zoho-oauthtoken ${accessToken}`;
        return axios(error.response.config);
    }
    return Promise.reject(error);
});

module.exports = {
    axiosInstance
}