// Server
const express = require("express");
const morgan = require("morgan");
const PORT = 8080;
const fs = require("fs");

// Websocket
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

// settings
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.set("json spaces", 2);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname, + "./public"));

// Archivo
const datos = fs.readFileSync("./data/msn.json", "utf-8");
const archivo = JSON.parse(datos);

// Server Chat - Websockets
io.on("connection", (socket) => {
    socket.on("mensaje", (data) => {
      archivo.push(data);
      fs.writeFileSync("./data/msn.json", archivo)
      io.sockets.emit("mensaje_recibido", archivo);
    });
});

// starting the server
const server = app.listen(PORT, () =>{
    console.log(`Servidor conectado en puerto ${server.address().port}`);
});