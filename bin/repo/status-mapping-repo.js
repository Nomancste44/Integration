const AWS = require('aws-sdk');
const {tableNameList} = require('../../bin/tableNames');
let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const dynamoDB = {   
    write:async(item) => {
        const params = {
            TableName: tableNameList.tblCrmWithXeroStatusMapping,
            Item: item             
        };
 
        return await documentClient
        .put(params)
        .promise()
        .then(data=>{})
        .catch(err=>{});
    },     

    update: async(item, userId) => {
        const params = {
            Key: { "UserId": userId ,"CombinedSortKey": item.CombinedSortKey},
            ExpressionAttributeNames: { "#xeroStatus": "XeroStatus" },
            ExpressionAttributeValues: { ":xeroStatus": item.XeroStatus },
            UpdateExpression: "SET #xeroStatus = :xeroStatus",
            TableName: tableNameList.tblCrmWithXeroStatusMapping,
            ReturnValues:"ALL_NEW"
        };
        return documentClient.update(params).promise();
    },

    get: async(userId, moduleName)=>{

        let params = {
            TableName: tableNameList.tblCrmWithXeroStatusMapping,
            ProjectionExpression: '#combinedSortKey, #moduleName, CrmStatus, XeroStatus',
            KeyConditionExpression: '#userId = :userId and begins_with(#combinedSortKey, :moduleName)',
            ExpressionAttributeNames: {
                '#userId': 'UserId',
                '#combinedSortKey': 'CombinedSortKey',                
                '#moduleName': 'ModuleName'
            },
            ExpressionAttributeValues: {
                ':userId': userId,
                ':moduleName': moduleName
            },
            ConsistentRead: true
        };
    
        return await documentClient.query(params).promise();;
    },

};
module.exports = dynamoDB;
