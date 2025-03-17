import * as dotenv from 'dotenv';
import * as amqplib from 'amqplib';

dotenv.config();

const connectRabbitMQExchange = async () => {
  try {
     const connection = await amqplib.connect(process.env.RABBIT_MQ);
     const channel = await connection.createChannel();

     await channel.assertExchange(process.env.EXCHANGE, 'direct',{ durable: false });

     return { connection, channel };
  } catch (err) {
    console.error('Erro ao conectar no RabbitMQ', err);
    process.exit(1);
  }
};

export { connectRabbitMQExchange }