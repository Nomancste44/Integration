const axios = require('axios').default;
const axiosInstance = axios.create();
const {getStoredXeroAccessToken,getStoredXeroAccess, storeXeroClientAccess} = require('./xero-client');
const {getXeroRefreshToken} = require('./xero-auth');
const {tableNameList} = require('../../bin/tableNames');
const {KeyValuePairs} = require('../../lib/common/common')
axiosInstance.interceptors.request.use(
    async config => {
        const xeroAccessToken = await getStoredXeroAccessToken( process.env.userId,tableNameList.userTable);
        config.headers['Authorization']= `Bearer ${xeroAccessToken}`;
        config.headers['Content-Type']= 'application/json';
        config.headers['xero-tenant-id']= config.headers[KeyValuePairs.xeroTenantIdHeader];
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
        const userData = await getStoredXeroAccess(userId,tableName);
        const clientAccess = await getXeroRefreshToken({
            clientId:userData[KeyValuePairs.xeroClientIdColumnName],
            clientSecret:userData[KeyValuePairs.xeroClientSecretColumnName],
            refreshToken:userData[KeyValuePairs.xeroRefreshTokenColumnName]
        });
        await storeXeroClientAccess({
            xeroClient: clientAccess,
            isFromRefreshing: true
        });
        error.response.config.headers['Authorization'] = `Bearer ${clientAccess.access_token}`;
        return axios(error.response.config);
    }
    return Promise.reject(error);
});

module.exports = {
    axiosInstance
}