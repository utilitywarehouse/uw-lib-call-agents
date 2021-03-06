const http = require('http');
const socketIo = require('socket.io');
const uuid = require('uuid');
const CallAgentDriver = require('../agentDriver');

class SocketIoDriver extends CallAgentDriver {

  constructor() {
    super();
  }

  createServer() {
    const server = http.createServer();
    const socketIoServer = socketIo(server);

    socketIoServer.of('/agent').on('connection', (socket) => {
      const agentId = uuid.v4();

      socket.on('agent.ready', (uri) => {
        this.emit('agent.ready', {agentId, address: uri});
      });
      socket.on('disconnect', () => {
        this.emit('agent.disconnected', agentId);
      });
      socket.on('call.termination.requested', () => {
        this.emit('call.termination.requested', agentId);
      });

      this.emit('agent.connected', {agentId, socket});
    });

    return server;
  }

}

module.exports = SocketIoDriver;
