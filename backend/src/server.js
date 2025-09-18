const {WebSocketServer} = require('ws');
const dotevn = require('dotenv');

dotevn.config();


const wss = new WebSocketServer('wss://projetochat-backend.onrender.com');

wss.on("connection", (ws) => {

    ws.on('error', console.error);

    ws.send("Welcome to the WebSocket server");

    
    ws.on('message', (data) => {
        wss.clients.forEach((client) =>  client.send(data.toString()))
            
        
    })

    console.log("Client connected")
})