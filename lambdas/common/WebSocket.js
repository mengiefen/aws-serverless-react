const AWS = require('aws-sdk');

const create = (domainName, stage) => {
  const endpoint = `${domainName}/${stage}`;
  return new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint,
  });
};

const send = ({ domainName, stage, connectionId, message }) => {
  //  create a new instance of the API Gateway Management API for each message sent
  const ws = create(domainName, stage);

  const postParams = {
    Data: message,
    connectionId,
  };

  try {
    return ws.postToConnection(postParams).promise();
  } catch (error) {
    console.log('Error in postToConnection', error);
    if (error.statusCode === 410) {
      console.log(`Stale connection`);
    } else {
      throw error;
    }
  }
};

module.exports = {
  send,
};
