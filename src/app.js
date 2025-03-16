import express from "express";
import * as dotenv from "dotenv";
import { router as messageRouter } from "./routes/message_router.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/message", messageRouter);

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
