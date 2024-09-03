/* eslint-disable no-undef */
import { atualizaTextoEditor } from './documento.js';

const socket = io();
function selecionarDocumento(nomeDocumento) {
    socket.emit('texto_documento', nomeDocumento);
}
function emitirTextoEditor(dados) {
    socket.emit('texto_editor', dados);
}
socket.on('texto_editor_clientes', (texto) => {
    //ENVIA O BROADCAST
    atualizaTextoEditor(texto);
});

export { emitirTextoEditor, selecionarDocumento };
