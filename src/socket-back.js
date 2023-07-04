const io = require("../bin/www");
const documentos = [
  { nome: "Javascript", texto: "texto javascript..." },
  { nome: "Socket.Io", texto: "texto socket.io..." },
];

io.on("connection", (socket) => {
  socket.on("selecionar_documento", (nomeDocumento, callback) => {
    socket.join(nomeDocumento);
    const documento = encontrarDocumento(nomeDocumento);
    if (documento) {
      callback(documento.texto);
    }
  });

  socket.on("texto_editor", ({ texto, nomeDocumento }) => {
    const documento = encontrarDocumento(nomeDocumento);
    if (documento) {
      documento.texto = texto;
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });
  function encontrarDocumento(nome) {
    return documentos.find(
      (documento) => documento.nome.toLowerCase() === nome.toLowerCase()
    );
  }
});
