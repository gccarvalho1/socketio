/* eslint-disable no-undef */
import { atualizaTextoEditor } from './documento.js';

const socket = io();
function selecionarDocumento(nomeDocumento) {
    socket.emit('texto_documento', nomeDocumento, (texto) => {
        atualizaTextoEditor(texto);
    });
}
function emitirTextoEditor(dados) {
    socket.emit('texto_editor', dados);
}
socket.on('texto_editor_clientes', (texto) => {
    atualizaTextoEditor(texto);
});

export { emitirTextoEditor, selecionarDocumento };
