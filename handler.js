'use strict';
const axios = require('axios')

module.exports.handler = async (event, context, callback) => {
  const today = new Date().getDate()
  console.log(`Today is ${today}th of the month.`)

  const mockGet = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: mockGet.data
      }
    )
  };
  return callback(null, response)

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


