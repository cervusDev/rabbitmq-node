import * as dotenv from 'dotenv';
import { queueKey } from '../utils/enviroments.js';
import { connectRabbitMQ } from '../config/rabbitmq.js';

dotenv.config();

const sendMessage = async message => {
  try {
    const { connection, channel } = await connectRabbitMQ();

    channel.sendToQueue(queueKey, Buffer.from(message));
    console.log(`[x] Sent ${message}`);

    setTimeout(() => connection.close(), 500);
  } catch (err) {
    console.log("Problema ao realizar a conexão!");
    console.log(err);
    throw err;
  }
};

export { sendMessage };