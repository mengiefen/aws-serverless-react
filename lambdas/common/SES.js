const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: 'us-east-1' });

const SES = {
  async sendEmail(to, from, subject, text) {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: from,
    };

    const res = await ses.sendEmail(params).promise();

    return res;
  },
};

module.exports = SES;
