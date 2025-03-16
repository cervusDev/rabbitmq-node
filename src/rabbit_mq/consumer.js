import * as dotenv from "dotenv";
import { queueKey } from "../utils/enviroments.js";
import { connectRabbitMQ } from "../config/rabbitmq.js";

dotenv.config();

async function receiveMessage() {
  try {
    const { channel } = await connectRabbitMQ();

    console.log(` [*] Waiting for messages in ${queueKey}. To exit press CTRL+C`);

    channel.consume(
      queueKey,
      msg => {
        if (msg !== null) {
          console.log(` [x] Received '${msg.content.toString()}'`);
          channel.ack(msg);
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Erro no consumer:", error.message);
  }
}

receiveMessage();