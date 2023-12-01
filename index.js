const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

const Port = 2308;

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const receivedMessage = message.toString(); 
    console.log('Mensagem recebida no servidor:', receivedMessage);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(receivedMessage);
        console.log('Mensagem enviada para cliente:', receivedMessage);
      }
    });
  });
});

server.listen(Port, () => {
  console.log(`Servidor WebSocket está rodando na porta ${Port}`);
});
