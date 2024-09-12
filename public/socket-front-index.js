import { inserirLinkDocumento, removerLinkDocumento } from './index.js';

/* eslint-disable no-undef */
const socket = io();
const erroMensagemDoc = document.getElementById('erro-mensagem-doc');

socket.emit('emitir_documentos', (documentos) => {
    documentos.forEach((documento) => {
        inserirLinkDocumento(documento.nome);
    });
});

function adicionarNomeDocumento(nome) {
    socket.emit('adicionar_documento', nome);
}

socket.on('adicionar_documento_interface', async (nome) => {
    inserirLinkDocumento(nome);
});

socket.on('documento_existente', async (validate) => {
    if (validate == true) {
        erroMensagemDoc.style.display = 'block';
    } else {
        erroMensagemDoc.style.display = 'none';
    }
});

socket.on('excluir_documento_sucesso', (nome) => {
    removerLinkDocumento(nome);
});

export { adicionarNomeDocumento };
