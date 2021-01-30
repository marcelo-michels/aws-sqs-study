/**
 *  Worker que processa mensagens que tenha na fila
 */

require('dotenv').config()

const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const QUEUE_NAME = process.env.QUEUE_NAME;

let msgReceives = 0;

async function getQueueURL() {
    const url = await sqs.getQueueUrl({ QueueName: QUEUE_NAME }).promise();
    return url.QueueUrl;
}

async function index() {
    const app = Consumer.create({
        queueUrl: await getQueueURL(),
        handleMessage: async (message) => {
          await new Promise((resolve) => setTimeout(resolve, 30))
          // if([10,15,20,25,30].includes(+message)){
          //     throw new Error("Numeros invalidos")
          // }
          console.log(message);
        }
      });
       
      app.on('error', (err) => {
        console.error(err.message);
      });
       
      app.on('processing_error', (err) => {
        console.error(err.message);
      });
       
      app.start();
};

index(); 
