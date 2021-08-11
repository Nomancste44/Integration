const AWS = require('aws-sdk');

let options = {};
if (process.env.IS_OFFLINE) {
    options = {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
    };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    get: async(UserId, TableName) =>{
        const params = {
            TableName,
            Key: {
                UserId,
            },
            ConsistentRead: true
        };
        
        const data = await documentClient.get(params).promise();
        if (!data || !data.Item) return undefined;
        return data.Item;
    },

    write: async(data, TableName) =>{
        if (!data.UserId) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data,
        };
        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.UserId} in table ${TableName}`);
        }

        return data;
    },

    update: async({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) => {
        const params = {
            TableName: tableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues: {
                ':updateValue': updateValue,
            },
        };

        return documentClient.update(params).promise();
    },
};
module.exports = Dynamo;
