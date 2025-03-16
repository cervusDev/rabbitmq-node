import express from "express";
import * as dotenv from "dotenv";
import { sendMessage } from "./producer.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/send-message", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required!' });
  };

  try {
    await sendMessage(message);
    res.status(200).json({ message: 'Message sent to RabbitMq successfuly!' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message to RabbitMQ' });
    console.log(err)
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
