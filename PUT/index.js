const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
// const parser = require('lambda-multipart-parser');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context) => {
  console.log(event);
  var params = {
    TableName: 'taskmaster',
    Key: {
      'id': `${event.pathParameters.id}`,
    },
    UpdateExpression: `set assignee = :name`,
    ExpressionAttributeValues: {
      ":name": event.pathParameters.assignee
    },
    ReturnValues: "UPDATED_NEW"
  };

  const data = await ddbClient.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
};