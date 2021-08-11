const AWS = require('aws-sdk');

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const dynamo = {
    write: async(tableName,item) => {
        const params = {
             TableName: tableName,
             Item: item,
             ConditionExpression: 'attribute_not_exists(UserId)'
         };
 
         return await documentClient
         .put(params)
         .promise()
         .then(data=>{})
         .catch(err=>{});
    },

    get: async(tableName,userId,projectionExpression)=>{
        const params = {
            TableName: tableName,
            ProjectionExpression: projectionExpression ,            
            KeyConditionExpression: '#userId = :userId',
            ExpressionAttributeNames: {
                '#userId': 'UserId'               
            },
            ExpressionAttributeValues: {
                ':userId': userId                
            },
            ConsistentRead: true
        };
    
        return await documentClient.query(params).promise();
    },

    update: async(tableName,item, userId) => {
        const params = {
            Key: { "UserId": userId ,"CombinedSortKey": item.CombinedSortKey},
            ExpressionAttributeNames: {                  
                "#actualValue":"ActualValue" 
            },
            ExpressionAttributeValues: {                 
                ":actualValue": item.ActualValue
            },
            UpdateExpression: "SET #actualValue = :actualValue",
            TableName: tableName,
            ReturnValues:"ALL_NEW"
        };
        return documentClient.update(params).promise();
    }    
};
module.exports = dynamo;