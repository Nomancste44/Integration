const dynamodb = require('../../bin/repo/dynamoDb');
const {KeyValuePairs} = require('../../lib/common/common');
const {tableNameList} = require('../../bin/tableNames');

const storeXeroClientAccess = async({xeroClient, connections= {}, clientInfo= {}, isFromRefreshing = false})=>{
    let data = {};
    
    if(!isFromRefreshing){
        data[KeyValuePairs.xeroClientIdColumnName] = clientInfo.client_id;
        data[KeyValuePairs.xeroClientSecretColumnName] = clientInfo.client_secret;
        data[KeyValuePairs.xeroTenantIdsColumnName] = connections;
    } 
    
    data[KeyValuePairs.tblUsersPrimaryKey] = process.env.userId;
    data[KeyValuePairs.xeroAccessTokenColumnName] = xeroClient.access_token;
    data[KeyValuePairs.xeroRefreshTokenColumnName] = xeroClient.refresh_token;


    let tableName =  tableNameList.userTable;
    let userExistedData = await dynamodb.get(process.env.userId,tableName);
    if(!userExistedData) 
        return await dynamodb.write(data,tableName);
    Object.assign(userExistedData,data);
    return await dynamodb.write(userExistedData,tableName);
}


const getStoredXeroAccess = async(userId, tableName)=> await dynamodb.get(userId,tableName);

const getStoredXeroAccessToken = async(userId, tableName)=>{
   let clientAccess = await dynamodb.get(userId,tableName);
   return clientAccess[KeyValuePairs.xeroAccessTokenColumnName];
} 

const getStoredRefreshToken = async(userId,tableName)=>{
    let clientAccess = await dynamodb.get(userId,tableName);
   return clientAccess[KeyValuePairs.xeroRefreshTokenColumnName];
}
module.exports = {
    storeXeroClientAccess,
    getStoredRefreshToken,
    getStoredXeroAccessToken,
    getStoredXeroAccess
}