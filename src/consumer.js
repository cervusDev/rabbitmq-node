import * as amqplib from 'amqplib';
import * as dotenv from 'dotenv';

dotenv.config();

async function receiveMessage() {
    try {
        const connection = await amqplib.connect("amqp://root:root@localhost");
        const channel = await connection.createChannel();
        const queue = 'send_messages_queues';

        await channel.assertQueue(queue, { durable: false });

        console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(` [x] Received '${msg.content.toString()}'`);
                channel.ack(msg);
            }
        }, { noAck: false });
    } catch (error) {
        console.error("Erro no consumer:", error.message);
    }
}

receiveMessage();