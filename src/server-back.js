import {
    atualizaDocumento,
    emitirDocumentos,
    encontrarDocumento,
    excluirDocumento,
    inserirDocumento,
} from './documentosDB.js';
import io from './server.js';

io.on('connection', (socket) => {
    socket.on('emitir_documentos', async (devolverDocumentos) => {
        const resultado = await emitirDocumentos();
        devolverDocumentos(resultado);
    });

    socket.on('adicionar_documento', async (nomeDocumento) => {
        const documentoExiste =
            (await encontrarDocumento(nomeDocumento)) !== null;

        if (documentoExiste) {
            socket.emit('documento_existente', true);
        } else {
            socket.emit('documento_existente', false);
            const documento = await inserirDocumento(nomeDocumento);

            if (documento.acknowledged) {
                io.emit('adicionar_documento_interface', nomeDocumento);
            }
        }
    });

    socket.on('texto_documento', async (nomeDocumento, devolverDocumento) => {
        socket.join(nomeDocumento);
        const documento = await encontrarDocumento(nomeDocumento);
        if (documento) {
            devolverDocumento(documento.texto);
        }
    });

    socket.on('texto_editor', async ({ texto, nomeDocumento }) => {
        const atualizacaoDocumento = await atualizaDocumento(texto, nomeDocumento);
        if (atualizacaoDocumento.modifiedCount) {
            io.to(nomeDocumento).emit('texto_editor_clientes', texto);
        }
    });

    socket.on('excluir_documento', async (nome) => {
        const resultado = await excluirDocumento(nome);

        if (resultado.deletedCount) {
            io.emit('excluir_documento_sucesso', nome);
        }
    });

    // Parte do indexHTML
});
