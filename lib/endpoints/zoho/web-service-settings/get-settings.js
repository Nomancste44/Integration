const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1'}); 
const _ = require('underscore');
const response = require('../../../common/endpoints-responses');
const { tableNameList } = require('../../../../bin/tableNames');

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const dynamodb = new AWS.DynamoDB.DocumentClient(options);
const tableName = tableNameList.webServiceSettings;

const getSetting= async(event)=>{   
    try 
    {      
        let query = event.queryStringParameters;

        let params = {
            TableName: tableName,             
            KeyConditionExpression: "#websersettingsid = :websersettingsid and #userid = :userid",                        
            ExpressionAttributeNames:{
                "#websersettingsid": "WebSerSettingId",
                "#userid": "UserId"
            },
            ExpressionAttributeValues: {              
                ":websersettingsid": query.WebSerSettingId,
                ":userid": query.UserId               
            }          
        };
        
        let res = await dynamodb.query(params).promise();
        
        if(!_.isEmpty(res.Items)) 
            return response._200(res);
        else 
            return response._404(res);
            
    } 
    catch (err)
    {        
        return {
            statusCode: err.statusCode ? err.statusCode : 500,            
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unknown error"
            })
        };
    }
}

module.exports={
    getSetting 
}