import {
    emitirTextoEditor,
    selecionarDocumento,
} from './socket-front-documento.js';

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get('nome');

const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');
const chatMensagem = document.getElementById('chat-mensagens');
const erroMensagem = document.getElementById('erro-mensagem');

tituloDocumento.textContent = nomeDocumento || 'Documento sem título';
selecionarDocumento(nomeDocumento);

textoEditor.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const nomeUsuario = document.getElementById('nome-usuario').value;
        const mensagem = textoEditor.value;

        if (nomeUsuario && mensagem) {
            // Envia a mensagem pelo socket
            emitirTextoEditor({
                texto: `${nomeUsuario}: ${mensagem}`,
                nomeDocumento,
            });
            // Adiciona a mensagem ao chat localmente
            // const novaMensagem = `${nomeUsuario}: ${mensagem}`;
            // chatMensagem.appendChild(document.createTextNode(novaMensagem));
            // chatMensagem.appendChild(document.createElement('br'));

            // Limpa o campo de texto
            textoEditor.value = '';
        }
        if (nomeUsuario === '') {
            erroMensagem.textContent = 'Por favor, digite seu nome!';
            erroMensagem.style.display = 'block';
        } else {
            erroMensagem.style.display = 'none';
        }
    }
});

function atualizaTextoEditor(texto) {
    // FAZ O BROADCAST
    chatMensagem.textContent = texto;
    // chatMensagem.appendChild(document.createTextNode(texto));
    // chatMensagem.appendChild(document.createElement('br'));
}

export { atualizaTextoEditor };
