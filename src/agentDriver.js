const EventEmitter = require('events').EventEmitter;

class CallAgentDriver extends EventEmitter {

  constructor() {
    super();
  }

  createServer() {
    throw new Error('Not implemented');
  }

};

module.exports = CallAgentDriver;