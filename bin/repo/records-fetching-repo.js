const R = require('ramda')
const AWS = require('aws-sdk');
const response = require('../../lib/common/endpoints-responses');
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
            Item: item             
         };
 
        return await documentClient
        .put(params)
        .promise()
        .then(data=>{})
        .catch(err=>{});
    },
    deleteAllRecords : async(tableName,pKey,sKey,pKeyValue) =>{
        await collectRecords(tableName,pKey,sKey,pKeyValue);        
    }
};

var getRecords = async(tableName,pKey,sKey,pKeyValue) => {
    var params = {
        TableName: tableName,      
        ProjectionExpression: "#pKey,#sKey",
        KeyConditionExpression: "#pKey = :pKey",
        ExpressionAttributeNames: {
          '#pKey': pKey,
          '#sKey' : sKey
        },
        ExpressionAttributeValues: {
            ":pKey": pKeyValue
        },
        ConsistentRead: true
    };

    const data = await documentClient.query(params).promise();      
    return data.Items;    
};

var collectRecords = async(tableName,pKey,sKey,pKeyValue)=> {    
    let res = await getRecords(tableName,pKey,sKey,pKeyValue);        
    if(Object.keys(res).length != 0){          
        await deleteRecords(tableName,res);             
        collectRecords(tableName,pKey,sKey,pKeyValue);
    }       
};

var deleteRecords = async(tableName,allData)=>{
    let dataSegments = R.splitEvery(5, allData);
        
    for (let i = 0; i < dataSegments.length; i++) {
        const segment = dataSegments[i]
        const params = {
            RequestItems: {
                [tableName]: segment.map(item => ({
                    DeleteRequest: {
                        Key: item
                    }
                }))
            }
        }            
        try 
        {                  
            let res = await documentClient.batchWrite(params).promise();                          
            while (!R.isEmpty(res.UnprocessedItems)) {                
                const params = {
                    RequestItems: res.UnprocessedItems
                }
                res = await docClient.batchWrite(params);
            }
        } 
        catch (error) {  return response._500(err) }           
    }       
};

module.exports = dynamo;