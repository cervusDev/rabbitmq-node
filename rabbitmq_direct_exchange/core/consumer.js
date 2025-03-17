import * as dotenv from "dotenv";
import { connectRabbitMQExchange } from "../config/rabbitmq.js";

dotenv.config();

const queues = [
  { name: "queue_info", key: "info" },
  { name: "queue_warning", key: "warning" },
  { name: "queue_error", key: "error" }
];

async function consume() {
  try {
    const { channel } = await connectRabbitMQExchange();

    for (const { name, key } of queues) {
      await channel.assertQueue(name, { durable: false });
      await channel.bindQueue(name, process.env.EXCHANGE, key);

      console.log(`[*] Escutando a fila '${name}' para mensagens com chave '${key}'...`);

      channel.consume(name, (msg) => {
        console.log(`[x] Recebido na fila '${name}': '${msg.content.toString()}'`);
      }, { noAck: true })
    };

  } catch (error) {
    console.error("Erro no consumer:", error.message);
  }
}

consume();