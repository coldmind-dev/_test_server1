"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const engine_io_1 = require("engine.io");
const httpServer = http.createServer((req, res) => {
    res.writeHead(501);
    res.end('Not Implemented');
});
const eioServer = new engine_io_1.Server({
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }
});
eioServer.on('connection', (socket) => {
    console.log(`Client connected with session id ${socket.id}`);
    socket.on('message', (data) => {
        console.log(`Message from ${socket.id}: ${data}`);
        socket.send(data);
    });
    socket.on('close', (reason) => {
        console.log(`Client ${socket.id} disconnected: ${reason}`);
    });
});
const port = 3000;
httpServer.listen(port, '0.0.0.0', () => {
    console.log(`Engine.IO server running on port ${port}`);
});
