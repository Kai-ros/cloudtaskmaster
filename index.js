
const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
// const parser = require('lambda-multipart-parser');

AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();
const ddbClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event, context) => {

  var params = {
    TableName: 'taskmaster-backend',
    Key: {
      'id': `${event.pathParameters.id}`,
    }
  };

  const data = await ddbClient.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
};
