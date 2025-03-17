import * as dotenv from 'dotenv';
import { connectRabbitMQExchange } from '../config/rabbitmq.js';

dotenv.config();

const messages = [
  { key: "info", text: "Informação geral" },
  { key: "warning", text: "Atenção: algo pode dar errado" },
  { key: "error", text: "Erro crítico detectado!" }
];

const sendMessage = async () => {
  try {
    const { connection, channel } = await connectRabbitMQExchange();

    messages.forEach(({ key, text }) => {
      channel.publish(process.env.EXCHANGE, key, Buffer.from(text));
      console.log(`[x] Enviado '${text}' para '${key}'`);
    });

    setTimeout(() => connection.close(), 500);
  } catch (err) {
    console.log("Problema ao realizar a conexão!");
    return;
  }
};

sendMessage();