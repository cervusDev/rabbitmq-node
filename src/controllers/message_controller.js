import { sendMessage } from "../rabbit_mq/producer.js";

const postMessage = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "A mensagem é obrigatória!" });
  }

  sendMessage(message)
    .then(() => {
      res.status(200).json({ success: "Mensagem enviada com sucesso!" });
    })
    .catch(error => {
      res.status(500).json({ error: "Erro ao enviar a mensagem." });
    });
};

export { postMessage };
