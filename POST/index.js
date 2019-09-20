const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
// const parser = require('lambda-multipart-parser');

const doc = require('dynamodb-doc');
const dynamo = new doc.DynamoDB();

AWS.config.update({ region: 'us-west-2' });

// const dynamodb = new AWS.DynamoDB();
// const ddbClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  console.log("Event: ", event);
  const done = (err, res) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
  });

  let newItem = event;
  newItem.id = uuid();

  newItem.status = 'assigned';
  let params = {
    TableName: 'taskmaster',
    Item: newItem
  };
  dynamo.putItem(params, done);

  return "Function ended with no errors.";

};