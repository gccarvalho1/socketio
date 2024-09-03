import io from './server.js';

io.on('connection', (socket) => {
    console.log('Um cliente se conectou com o id: ' + socket.id);
    socket.on('texto_documento', (nomeDocumento) => {
        socket.join(nomeDocumento);
    });

    socket.on('texto_editor', ({ texto, nomeDocumento }) => {
        // socket.broadcast.emit('texto_editor_clientes', texto);
        socket.to(nomeDocumento).emit('texto_editor_clientes', texto);
    });
});
