import * as dotenv from 'dotenv';
import * as amqplib from 'amqplib';
import { queueKey } from '../utils/enviroments.js';

dotenv.config();

const connectRabbitMQ = async () => {
  try {
     const connection = await amqplib.connect(process.env.RABBIT_MQ);
     const channel = await connection.createChannel();

     await channel.assertQueue(queueKey, { durable: false });

     return { connection, channel };
  } catch (err) {
    console.error('Erro ao conectar no RabbitMQ', err);
    process.exit(1);
  }
};

export { connectRabbitMQ }