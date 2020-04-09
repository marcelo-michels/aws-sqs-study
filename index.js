/**
 *  Cria novas mensagens numa fila e fica logando a 
 *  quantidade de mensagens que possui na fila
 */

require('dotenv').config();

const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
const QUEUE_NAME = process.env.QUEUE_NAME;

async function getQueueURL() {
    try { 
        const url = await sqs.getQueueUrl({ QueueName: QUEUE_NAME }).promise();
        return url.QueueUrl;
    } catch (error) { }
}

async function createQueue() {
    await sqs.createQueue({QueueName: QUEUE_NAME}).promise();
}

async function countMsgs() {
    // Log da quantidade de mensagens que tem na fila 
    const queueUrl = await getQueueURL();
    const ret = await sqs.getQueueAttributes({ QueueUrl: queueUrl, AttributeNames: ['All'] }).promise();
    console.log('---')
    // Quantidade de mensagens aguardando para serem processadas
    console.log('Messages', ret.Attributes.ApproximateNumberOfMessages)
    // Quantidade de mensagens que estão sendo processadas (ou foram nos ultimos 30 segundos)
    console.log('MessagesNotVisible', ret.Attributes.ApproximateNumberOfMessagesNotVisible)

    // Loga novamente cada 5 segundos
    setTimeout(() => countMsgs(), 5000);
}

async function index() {
    try {
        // Busca a URL da fila
        const queueUrl = await getQueueURL();
        if (!queueUrl) {
            // Caso não encontre a URL da fila, cria uma fila e tenta buscar a URL novamente    
            createQueue();
            return index();
        }

        // Cria 100 novas mensagens na fila
        const promises = Array.from(Array(100).keys());
        await Promise.all(promises.map(item =>{
            const params = {
                MessageBody: `This is message body ${item}`,
                QueueUrl: queueUrl,
            };
            return sqs.sendMessage(params).promise();
        })); 

        countMsgs();
    } catch (error) {
        console.log(error)
    }
};

index(); 