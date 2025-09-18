const {WebSocketServer} = require('ws');
const dotevn = require('dotenv');

dotevn.config();


const wss = new WebSocketServer({port:process.env.PORT || 8080});

wss.on("connection", (ws) => {

    ws.on('error', console.error);

    ws.send("Welcome to the WebSocket server");

    
    ws.on('message', (data) => {
        wss.clients.forEach((client) =>  client.send(data.toString()))
            
        
    })

    console.log("Client connected")
})