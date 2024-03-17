// Check if running in a browser environment
const isBrowser = typeof window !== "undefined";

// Dynamically determine the WebSocket class based on the environment.
function getWebSocketClass() {
	// Node.js environment
	if (!isBrowser) {
		const WebSocket = require('ws');
		return WebSocket;
	}

	// Browser environment
	return (window as any).WebSocket;
}

const WebSocketClass = getWebSocketClass();

// Assuming 'ws://localhost:3000' is your WebSocket server URL.
const socket = new WebSocketClass('http://127.0.0.1:3000');

/*
declare global {
	var WebSocket: typeof import('ws');
}

// Dynamically require 'ws' only if not in a browser environment
const WebSocketClass = isBrowser ? WebSocket : require('ws');

const socket = new WebSocketClass('ws://localhost:3000');
*/

socket.addEventListener('open', function () {
	console.log('Connected to the server.');
	socket.send('Hello, Server!');
});

socket.addEventListener('message', function (event) {
	console.log('Message from server:', event.data);
});

socket.addEventListener('close', function () {
	console.log('Disconnected from the server.');
});

socket.addEventListener('error', function (event: Event) {
	console.error('WebSocket error:', event);
});
