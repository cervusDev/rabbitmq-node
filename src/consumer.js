import { connect } from 'amqplib';

const connectUrl = "amqp://root:root@localhost";

async function receiveMessage() {
    try {
        const connection = await connect(connectUrl);
        const channel = await connection.createChannel();
        const queue = 'hello';

        await channel.assertQueue(queue, { durable: false });

        console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

        // Consome mensagens da fila
        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(` [x] Received '${msg.content.toString()}'`);
                channel.ack(msg); // Confirma o processamento da mensagem
            }
        }, { noAck: false }); // noAck: false -> Requer confirmação (ack) manual
    } catch (error) {
        console.error("Erro no consumer:", error.message);
    }
}

// Inicia o consumer
receiveMessage();