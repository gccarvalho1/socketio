import {
    emitirExcluirDocumento,
    emitirTextoEditor,
    selecionarDocumento,
} from './socket-front-documento.js';

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get('nome');

const textoEditor = document.getElementById('editor-texto');
const tituloDocumento = document.getElementById('titulo-documento');
const chatMensagem = document.getElementById('chat-mensagens');
const erroMensagem = document.getElementById('erro-mensagem');
const buttonExcluir = document.getElementById('excluir-documento');

tituloDocumento.textContent = nomeDocumento || 'Documento sem título';
selecionarDocumento(nomeDocumento);

textoEditor.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const nomeUsuario = document.getElementById('nome-usuario').value;
        const mensagem = textoEditor.value;

        if (nomeUsuario && mensagem) {
            chatMensagem.textContent += `\n${nomeUsuario}: ${mensagem}`;
            emitirTextoEditor({
                texto: chatMensagem.textContent,
                nomeDocumento,
            });
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
    // Adiciona o texto ao novo elemento
    chatMensagem.textContent = texto;
}

buttonExcluir.addEventListener('click', () => {
    emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
    if (nome === nomeDocumento) {
        alert(`O documento ${nome} foi apagado!`);
        window.location.href = '/';
    }
}

export { atualizaTextoEditor, alertarERedirecionar };
