import express from "express";
import * as dotenv from "dotenv";
import { postMessage } from "./controllers/message_controller.js";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/send-message", postMessage);

const startServer = async () => {
  try {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
  }
};

startServer();
