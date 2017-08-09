const EventEmitter = require('events').EventEmitter;

class CallAgentServer extends EventEmitter {

  constructor(driver) {
    super();
    this._driver = driver;

    this._driver.on('agent.started', (args) => {
      const { agentId } = args;
      this.emit('agent.started', agentId)
    });

    this._driver.on('agent.ready', ({agentId, address}) => {
      this.emit('agent.ready', {agentId, address});
    })

    this._driver.on('agent.ended', (agentId) => {
      this.emit('agent.ended', agentId);
    })
  }

  emitCallBooked(agentId, callId) {
    throw new Error('Not implemented');
  }

  emitCallBridged(agentId, callId) {
    throw new Error('Not implemented');
  }

  emitCallEnded(agentId, callId) {
    throw new Error('Not implemented');
  }

  start(port) {
    const server = this._driver.createServer();

    return new Promise((resolve, reject) => {
      server.on('listening', resolve);
      server.on('error', reject);
      server.listen(port);
    });
  }
}

module.exports = CallAgentServer;
