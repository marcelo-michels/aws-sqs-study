/**
 *  Worker que processa mensagens que tenha na fila
 */

require('dotenv').config()

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const QUEUE_NAME = process.env.QUEUE_NAME;

let msgReceives = 0;

async function getQueueURL() {
    const url = await sqs.getQueueUrl({ QueueName: QUEUE_NAME }).promise();
    return url.QueueUrl;
}

async function index() {
    const queueUrl = await getQueueURL();
    
    // Busca mensagens da fila
    // Por padrão vai receber até 10 mensagens por vez 
    const result = await sqs.receiveMessage({ QueueUrl: queueUrl }).promise();
    
    if (result.Messages) {
        for (const msg of result.Messages || []) {
            msgReceives++;
            console.log('msg', msg.Body);
            // Deleta essa mensagem da fila, para não ser mais processada
            await sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: msg.ReceiptHandle }).promise();
        }
        index();
    } else {
        // Loga quantas mensagens esse worker processou
        console.log('Mensagens recebidas', msgReceives);
        msgReceives = 0;
        // Aguarda um tempo e busca por novas mensagens
        setTimeout(() => index(), 10000);
    }
};

index(); 