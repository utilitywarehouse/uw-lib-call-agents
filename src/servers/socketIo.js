const SocketIoDriver = require('../drivers/socketIo');
const SocketServer = require('./socket');

class SocketIoServer extends SocketServer {

  constructor() {
    super(new SocketIoDriver());
  }

  emitCallBooked(agentId, callId) {
    const socket = this._getSocket(agentId);
    socket.emit('call.booked', callId);
  }

  emitCallBridged(agentId, callId) {
    const socket = this._getSocket(agentId);
    socket.emit('call.bridged');
  }

  emitCallEnded(agentId, callId) {
    const socket = this._getSocket(agentId);
    socket.emit('call.ended');
  }
}

module.exports = SocketIoServer;