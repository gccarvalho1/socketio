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
export { encontrarDocumento, atualizaDocumento };
