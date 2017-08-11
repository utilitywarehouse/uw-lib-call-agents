const AgentDriver = require('../../src/agentDriver');
const SocketServer = require('../../src/servers/socket');

describe('SocketServer', () => {
  /** var SocketServer **/
  let agentServer;
  /** var AgentDriver **/
  let driver;

  beforeEach(() => {
    driver = new AgentDriver();
    agentServer = new SocketServer(driver);
  })

  it('does not have any sockets registered when created', () => {
    agentServer._socketRegistry.size.should.equal(0);
  })

  it('registers socket when agent has connected', () => {
    driver.emit('agent.connected', {agentId: 'A1', socket: 'socket'});

    agentServer._socketRegistry.size.should.equal(1);
    agentServer._getSocket('A1').should.equal('socket');

    driver.emit('agent.connected', {agentId: 'A2', socket: 'socket2'});

    agentServer._socketRegistry.size.should.equal(2);
    agentServer._getSocket('A2').should.equal('socket2');
  })

  it('unregisters socket when agent has disconnected', () => {
    driver.emit('agent.connected', {agentId: 'A1', socket: 'socket'});
    driver.emit('agent.connected', {agentId: 'A2', socket: 'socket2'});
    driver.emit('agent.disconnected', 'A1');

    agentServer._socketRegistry.size.should.equal(1);
    expect(agentServer._getSocket('A1')).to.be.undefined;
    agentServer._getSocket('A2').should.equal('socket2');
  })
})