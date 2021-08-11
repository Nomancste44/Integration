'use strict'
const {tableNameList} = require('../../../../bin/tableNames');
const  dynamo = require('../../../../bin/repo/fields-mapping-repo');
const { hooks } = require('../../../common/hooks');

const updateMappingFields = async (event, context, callback) => {

  //const {data, table, cb} = event
  const {data} = event.body

  /**
   * Update: {
            Key: { "id": { "S": "ABC-XYABV2-2019" }},
            ExpressionAttributeNames: { "#s": "s" },
            ExpressionAttributeValues: { ":s": { "S": "OHIO" } },
            UpdateExpression: "SET #s = :s",
            TableName: "test-order-dev"
        }
   */
  // Build the batches
  var batches = [];
  var current_batch = [];
  var item_count = 0;
  const userId = process.env.userId;
  for (var i = 0; i < data.length; i++) {
    // Add the item to the current batch
     item_count++
    // current_batch.push({
    //   PutRequest: {
    //     Item: data[i],
    //   }
    // })
    current_batch.push({
        Update: {
            Key: { "UserId": userId ,"CombinedSortKey": data[i].CombinedSortKey},
            ExpressionAttributeNames: { "#xeroFieldId": "XeroFieldId", "#xeroFieldName":"XeroFieldName" },
            ExpressionAttributeValues: { ":xeroFieldId": data[i].XeroFieldId, ":xeroFieldName": data[i].XeroFieldName },
            UpdateExpression: "SET #xeroFieldId = :xeroFieldId, #xeroFieldName = :xeroFieldName",
            TableName: tableNameList.crmWithXeroFieldsMapping
        }
    })
    // If we've added 25 items, add the current batch to the batches array
    // and reset it
    if (item_count % 25 === 0) {
      batches.push(current_batch)
      current_batch.length = 0;
    }
  }

  // Add the last batch if it has records and is not equal to 25
  if (current_batch.length > 0 && current_batch.length !== 25) {
    batches.push(current_batch)
  }

  // Handler for the database operations
  var completed_requests = 0
  var errors = false

  function handler (request) {

    console.log('in the handler: ', request)

    return function (err, data) {
      // Increment the completed requests
      completed_requests++;

      // Set the errors flag
      errors = (errors) ? true : err;

      // Log the error if we got one
      if(err) {
        console.error(JSON.stringify(err, null, 2));
        console.error("Request that caused database error:");
        console.error(JSON.stringify(request, null, 2));
        callback(err);
      }else {
        callback(null, data);
      }

      // Make the callback if we've completed all the requests
    //   if(completed_requests === batches.length) {
    //     cb(errors);
    //   }
    }
  }

  // Make the requests
  var params;
  for (var j = 0; j < batches.length; j++) {
    // Items go in params.RequestItems.id array
    // Format for the items is {PutRequest: {Item: ITEM_OBJECT}}
    params = '{"TransactItems": []}'
    params = JSON.parse(params)
    params.TransactItems.push(batches[j]);

    console.log('before db.batchWrite: ', params)

    // Perform the batchWrite operation
   // docClient.batchWrite(params, handler(params))
   await dynamo.transactWriteItems(params,handler);
  }
};
module.exports ={
    updateMappingFields : hooks(updateMappingFields)
}

