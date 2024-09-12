import './socket-front-index.js';
import { adicionarNomeDocumento } from './socket-front-index.js';

const listaDocumento = document.getElementById('lista-documentos');

function inserirLinkDocumento(nomeDocumento) {
    listaDocumento.innerHTML += `<a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action" id="documento-${nomeDocumento}">
    ${nomeDocumento}
      </a>`;
}

const form = document.getElementById('form-adiciona-documento');
const nome = document.getElementById('input-documento');

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    adicionarNomeDocumento(nome.value);
    nome.value = '';
});

function removerLinkDocumento(nomeDocumento) {
    const documento = document.getElementById(`documento-${nomeDocumento}`);
    listaDocumento.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };
