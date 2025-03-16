import express from 'express';
import { postMessage } from '../controllers/message_controller.js';

const router = express.Router();

router.post('/send-message', postMessage);

export { router };
