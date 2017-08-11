const CallAgentServer = require('../agentServer');

class SocketServer extends CallAgentServer {

  constructor(driver) {
    super(driver);
    this._socketRegistry = new Map();

    this._driver.on('agent.connected', ({agentId, socket}) => {
      this._registerSocket(agentId, socket);
    });

    this._driver.on('agent.disconnected', (agentId) => {
      this._unregisterSocket(agentId);
    });
  }

  _registerSocket(agentId, socket) {
    this._socketRegistry.set(agentId, socket);
  }

  _unregisterSocket(agentId) {
    this._socketRegistry.delete(agentId);
  }

  _getSocket(agentId) {
    return this._socketRegistry.get(agentId);
  }
}

module.exports = SocketServer;