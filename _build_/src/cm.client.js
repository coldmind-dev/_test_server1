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
exports.Client = void 0;
const engineIO = __importStar(require("engine.io-client"));
class Client {
    constructor() {
        const options = {
            transports: ['websocket'],
            upgrade: true,
            allowUpgrades: true
        };
        this.socket = new engineIO.Socket('ws://localhost:3000', options);
        this.init();
    }
    send(msg) {
        this.socket.send(msg);
    }
    init() {
        this.socket.on('open', () => {
            console.log('Connected to the server.');
            this.send('Hello, server!');
        });
        this.socket.on('message', (data) => {
            console.log(`Message from server: ${data}`);
        });
        this.socket.on('close', () => {
            console.log('Disconnected from server.');
        });
    }
}
exports.Client = Client;
new Client();
