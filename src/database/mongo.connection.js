const MongoClient = require("mongodb").MongoClient;

const cliente = new MongoClient(process.env.CONNECTION_PATH, {
  retryWrites: true,
  w: "majority",
});

let collections = [];

class Connection {
  static execute() {
    try {
      cliente.connect().then(() => {
        const db = cliente.db("socketio");
        this._getConnections(db);
        console.log("Connectado no banco socketio");
      });
    } catch (e) {
      console.log(e);
    }
  }
  static _getConnections(db) {
    const documentos = db.collection("documentos");
    collections.push({ collection: documentos, name: "documentos" });
  }
}

module.exports = { Connection, collections };
