/* eslint-disable no-undef */
import express from 'express';
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();

const porta = process.env.porta; // ADICIONE A PORTA QUE VOCE DESEJA

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, '../..', 'public');

app.use(express.static(diretorioPublico));

const servidorHttp = http.createServer(app);
servidorHttp.listen(porta, () =>
    console.log(`Servidor escutando na porta ${porta}`)
);
const io = new Server(servidorHttp);
export default io;


