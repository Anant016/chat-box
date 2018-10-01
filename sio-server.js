var express = require("express");
var socket = require("socket.io");

var http = require("http");
var app = express().createServer();;
var config=require('./config');
var io=socket.listen(app);

io.configure () ->
  io.set("transports", ["xhr-polling"])
  io.set("polling duration", 10)


app.use(express.static("./public"));

io.socket.on("connection", function(socket) {

    socket.on("chat", function(message) {
        socket.broadcast.emit("message", message);
    });

    socket.emit("message", "Welcome to Cyber Chat");

});
port = process.env.PORT || 3000;
app.listen(port);

console.log("Starting Socket App - http://localhost:3000");
