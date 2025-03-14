import * as amqplib from "amqplib";

const connectUrl = "amqp://root:root@localhost";

const sendMessage = async message => {
  try {
    const connection = await amqplib.connect(connectUrl);
    const channel = await connection.createChannel();
    const queue = "hello";

    await channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`[x] Sent ${message}`);

    setTimeout(() => connection.close(), 500);
  } catch (err) {
    console.log("Problema ao realizar a conexão!");
    console.log(err);
  }
};

const message = process.argv.slice(2).join(' ') || 'Hello, RabbitMQ!';
sendMessage(message);
