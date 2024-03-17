import * as http from 'http';
import * as WebSocket from 'ws';

// Create an HTTP server with request listener
const httpServer: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('HTTP Server Running');
});

// Initialize a WebSocket server instance
const wsServer: WebSocket.Server = new WebSocket.Server({ noServer: true });

wsServer.on('connection', (ws: WebSocket) => {
	console.log('Client connected via WebSocket');

	ws.on('message', (message: WebSocket.Data) => {
		console.log(`Received message: ${message.toString()}`);
		ws.send(`Echo: ${message.toString()}`);
	});

	ws.on('close', () => {
		console.log('WebSocket connection closed');
	});
});

// Handle upgrade requests by integrating with the HTTP server
httpServer.on('upgrade', (request: http.IncomingMessage, socket: any, head: Buffer) => {
	console.log('HTTP Upgrade request received, upgrading to WebSocket');

	wsServer.handleUpgrade(request, socket, head, (ws) => {
		wsServer.emit('connection', ws, request);
	});
});

const port: number = 3000;
httpServer.listen(port, '0.0.0.0', () => {
	console.log(`Server listening on http://0.0.0.0:${port}`);
});
