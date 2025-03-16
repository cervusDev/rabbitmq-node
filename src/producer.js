import * as amqplib from "amqplib";
import * as dotenv from 'dotenv';

dotenv.config();

export const sendMessage = async message => {
  try {
    const connection = await amqplib.connect(process.env.RABBIT_MQ);
    const channel = await connection.createChannel();
    const queue = "send_messages_queues";

    await channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`[x] Sent ${message}`);

    setTimeout(() => connection.close(), 500);
  } catch (err) {
    console.log("Problema ao realizar a conexão!");
    console.log(err);
    throw err;
  }
};