import { atualizaDocumento, encontrarDocumento } from './documentosDB.js';
import io from './server.js';

io.on('connection', (socket) => {
    console.log('Um cliente se conectou com o id: ' + socket.id);
    socket.on('texto_documento', async (nomeDocumento, devolverDocumento) => {
        socket.join(nomeDocumento);
        const documento = await encontrarDocumento(nomeDocumento);
        if (documento && documento.texto != '') {
            devolverDocumento(documento.texto);
        }
    });

    socket.on('texto_editor', ({ texto, nomeDocumento }) => {
        // socket.broadcast.emit('texto_editor_clientes', texto);
        const atualizacaoDocumento = atualizaDocumento(texto, nomeDocumento);
        if (atualizacaoDocumento.modifiedCount) {
            // documento.texto = texto;
            // console.log(documento.texto);
            io.to(nomeDocumento).emit('texto_editor_clientes', texto);
        }
    });
});
