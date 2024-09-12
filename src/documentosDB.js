import { documentosColecao } from './dbConnect.js';

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome: nome,
    });
    return documento;
}
function atualizaDocumento(texto, nome) {
    const atualizacao = documentosColecao.updateOne(
        { nome },
        {
            $set: { texto },
        }
    );
    return atualizacao;
}

function emitirDocumentos() {
    const resultados = documentosColecao.find().toArray();

    return resultados;
}

function inserirDocumento(nome) {
    const resultados = documentosColecao.insertOne({
        nome,
        texto: '',
    });
    return resultados;
}

function excluirDocumento(nome) {
    const excluir = documentosColecao.deleteOne({
        nome,
    });
    return excluir;
}

export {
    encontrarDocumento,
    atualizaDocumento,
    emitirDocumentos,
    inserirDocumento,
    excluirDocumento,
};
