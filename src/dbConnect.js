/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const client = new MongoClient(process.env.url);
let documentosColecao;
try {
    await client.connect();
    const db = client.db('alura-websockets');
    documentosColecao = db.collection('documentos');

    console.log('Conectado ao banco de dado com sucesso.');
} catch (erro) {
    console.log(erro);
}

export { documentosColecao };
