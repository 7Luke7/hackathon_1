const express = require("express")
const http = require("http")
const app = express();
const socketIo = require('socket.io');

const server = http.createServer(app)
const io = new socketIo.Server(server, {
    cors: {
        options: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

module.exports = {io, app, express, server}