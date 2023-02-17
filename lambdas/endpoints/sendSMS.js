const Responses = require('../common/API_Responses');
const AWS = require('aws-sdk');

const SNS = new AWS.SNS({
  apiVersion: '2010-03-31',
});

exports.handler = async (event) => {
  console.log('event', event);

  const body = JSON.parse(event.body);

  if (!body || !body.phoneNumber || !body.message) {
    Responses._400({
      message: 'missing the phoneNumber or message from the body',
    });
  }

  const AttributeParams = {
    attributes: {
      DefaultSMSType: 'Promotional', // or Transactional (default)
    },
  };

  const params = {
    Message: body.message,
    PhoneNumber: body.phoneNumber,
  };

  try {
    await SNS.setSMSAttributes(AttributeParams).promise();
    await SNS.publish(params).promise();
    return Responses._200({ message: 'message sent!' });
  } catch (error) {
    return Responses._400({ message: 'failed to send message' });
  }
};
