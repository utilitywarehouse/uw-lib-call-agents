const SocketIoDriver = require('../drivers/socketIo');
const SocketServer = require('./socket');

class SocketIoServer extends SocketServer {

  constructor() {
    super(new SocketIoDriver());
  }

  acknowledgeCallBooked(agentId, callId) {
    const socket = this._getSocket(agentId);
    socket.emit('call.booked', callId);
  }

  acknowledgeCallBridged(agentId, callId) {
    const socket = this._getSocket(agentId);
    socket.emit('call.bridged');
  }

  acknowledgeCallEnded(agentId, callId) {
    const socket = this._getSocket(agentId);
    socket.emit('call.ended');
  }
}

module.exports = SocketIoServer;