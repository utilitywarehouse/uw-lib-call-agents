const AgentDriver = require('../src/agentDriver');
const AgentServer = require('../src/agentServer');

const mockServer = () => {
  const stubbedServer = {
    listen: (port) => {},
    on: (eventName, func) => func()
  };

  sinon.spy(stubbedServer, 'listen');
  return stubbedServer;
}

const mockAgentDriver = (serverCreatedByDriver) => {
  const stubbedDriver = new AgentDriver();

  stubbedDriver.createServer = () => serverCreatedByDriver;
  sinon.spy(stubbedDriver, 'createServer');

  return stubbedDriver;
};

describe('AgentServer', () => {
  /** var AgentServer **/
  let agentServer;
  /** var AgentDriver **/
  let driver;
  let serverCreatedByDriver;

  beforeEach(() => {
    serverCreatedByDriver = mockServer();
    driver = mockAgentDriver(serverCreatedByDriver);
    agentServer = new AgentServer(driver);

    agentServer.acknowledgeCallBooked = (agentId, callId) => {};
    agentServer.acknowledgeCallBridged = (agentId, callId) => {};
    agentServer.acknowledgeCallEnded = (agentId, callId) => {};
  })

  it('listens for agents on given port when started', async () => {
    await agentServer.start(1234);

    driver.createServer.should.have.been.called;
    serverCreatedByDriver.listen.should.have.been.calledWith(1234);
  })

  it('emits agent.connected when agent has connected', (done) => {
    const agentId = 'A0';
    const socket = {};

    agentServer.on('agent.connected', (args) => {
      args.should.equal('A0');
      done();
    });

    driver.emit('agent.connected', ({agentId, socket}));
  })

  it('emits agent.ready when agent has become ready', (done) => {
    const agentId = 'A1';
    const address = '/agent/address';

    agentServer.on('agent.ready', (args) => {
      args.should.eql({ agentId: 'A1', address: '/agent/address' });
      done();
    });

    driver.emit('agent.ready', ({agentId, address}));
  })

  it('emits agent.disconnected when agent has disconnected', (done) => {
    const agentId = 'A2';

    agentServer.on('agent.disconnected', (args) => {
      args.should.equal('A2');
      done();
    });

    driver.emit('agent.disconnected', agentId);
  })

  it('emits call.termination.requested when agent requested to terminate the call', (done) => {
    const agentId = 'A3';

    agentServer.on('call.termination.requested', (args) => {
      args.should.eql({ agentId: 'A3' });
      done();
    });

    driver.emit('call.termination.requested', ({agentId }));
  })


})
