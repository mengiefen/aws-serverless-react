const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();
const Dynamo = {
  async get(id, tableName) {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const data = await documentClient.get(params).promise();

    if (!data.Item) {
      throw Error(`No Item found with provided ID: ${id}`);
    }

    console.log('data', data);

    return data.Item;
  },

  async write(data, tableName) {
    if (!data.id) {
      throw Error(`No Item ID provided`);
    }

    const params = {
      TableName: tableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`Could not write data to table: ${tableName}`);
    }

    return data;
  },

  async delete(id, tableName) {
    if (!id) {
      throw Error(`No Item ID provided`);
    }

    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    const res = await documentClient.delete(params).promise();

    if (!res) {
      throw Error(`Could not delete data from table: ${tableName}`);
    }

    return id;
  },
};

module.exports = Dynamo;
