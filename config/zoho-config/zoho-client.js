const dynamodb = require('../../bin/repo/dynamoDb');
const {KeyValuePairs} = require('../../lib/common/common');
const {tableNameList} = require('../../bin/tableNames');

const storeZohoClientAccess = async(zohoClient, clientInfo)=>{
    let data = {};
    data[KeyValuePairs.tblUsersPrimaryKey] = process.env.userId;
    data[KeyValuePairs.zohoClientIdColumnName] = clientInfo.client_id;
    data[KeyValuePairs.zohoClientSecretColumnName] = clientInfo.client_secret;

    data[KeyValuePairs.zohoAccessTokenColumnName] = zohoClient.access_token;
    data[KeyValuePairs.zohoRefreshTokenColumnName] = zohoClient.refresh_token;
    data[KeyValuePairs.zohoApiDomainColumnName] = zohoClient.api_domain;

    let tableName =  tableNameList.userTable;
    let userExistedData = await dynamodb.get(process.env.userId,tableName);
    if(!userExistedData) 
        return await dynamodb.write(data,tableName);
    Object.assign(userExistedData,data);
    return await dynamodb.write(userExistedData,tableName);
}

const updateAccessToken = async(accessToken, userId, tableName) =>{

    let result = await dynamodb.update({ 
        tableName,
        primaryKey: KeyValuePairs.tblUsersPrimaryKey, 
        primaryKeyValue : userId, 
        updateKey: KeyValuePairs.zohoAccessTokenColumnName,
        updateValue : accessToken
    });
    return result;
}

const getStoredZohoAccess = async(userId, tableName)=> await dynamodb.get(userId,tableName);

const getStoredZohoAccessToken = async(userId, tableName)=>{
   let clientAccess = await dynamodb.get(userId,tableName);
   return clientAccess[KeyValuePairs.zohoAccessTokenColumnName];
} 

const getStoredRefreshToken = async(userId,tableName)=>{
    let clientAccess = await dynamodb.get(userId,tableName);
   return clientAccess[KeyValuePairs.zohoRefreshTokenColumnName];
}
module.exports = {
    storeZohoClientAccess,
    updateAccessToken,
    getStoredRefreshToken,
    getStoredZohoAccessToken,
    getStoredZohoAccess
}