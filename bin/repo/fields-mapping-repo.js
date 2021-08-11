const AWS = require('aws-sdk');
const {tableNameList} = require('../tableNames');
let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const dynamo = {
     write: async(item) => {
       const params = {
            TableName: tableNameList.crmWithXeroFieldsMapping,
            Item: item,
            ConditionExpression: 'attribute_not_exists(UserId)'
        };

        return await documentClient
        .put(params)
        .promise()
        .then(data=>{})
        .catch(err=>{});
    },
    get: async(userId, moduleName)=>{

        let params = {
            TableName: tableNameList.crmWithXeroFieldsMapping,
            ProjectionExpression: '#combinedSortKey, #moduleName, #fieldName,CSectionName,CSectionSeqNo,CFieldLabel,CFieldSeqNumber,CFieldId,CRequired, XeroFieldId, XeroFieldName',
            KeyConditionExpression: '#userId = :userId and begins_with(#combinedSortKey, :moduleName)',
            ExpressionAttributeNames: {
                '#userId': 'UserId',
                '#combinedSortKey': 'CombinedSortKey',
                '#fieldName': 'CFieldApiName',
                '#moduleName': 'CModuleName'
            },
            ExpressionAttributeValues: {
                ':userId': userId,
                ':moduleName': moduleName
            },
            ConsistentRead: true
        };
    
        return await documentClient.query(params).promise();;
    },

    update: async(item, userId) => {
        const params = {
            Key: { "UserId": userId ,"CombinedSortKey": item.CombinedSortKey},
            ExpressionAttributeNames: { "#xeroFieldId": "XeroFieldId", "#xeroFieldName":"XeroFieldName" },
            ExpressionAttributeValues: { ":xeroFieldId": item.XeroFieldId, ":xeroFieldName": item.XeroFieldName },
            UpdateExpression: "SET #xeroFieldId = :xeroFieldId, #xeroFieldName = :xeroFieldName",
            TableName: tableNameList.crmWithXeroFieldsMapping,
            ReturnValues:"ALL_NEW"
        };
        return documentClient.update(params).promise();
    }

    // transactWriteItems: async(params, callback)=>{
    //     return await documentClient.transactWriteItems(params,callback(params));
    // }
};
module.exports = dynamo;
