const SocketIoServer = require('../../src/servers/socketIo');

const mockSocketIoSocket = () => {
  const stubbedSocket = {
    emit: (event, data) => {},
  };
  sinon.spy(stubbedSocket, 'emit');

  return stubbedSocket;
};

describe('SocketIoServer', () => {
  /** var SocketIoServer **/
  let agentServer;

  beforeEach(() => {
    agentServer = new SocketIoServer();
  })

  it('can emit call.booked', () => {
    const agentId = 'A0';
    const callId = 'C0';
    const socket = mockSocketIoSocket();
    agentServer._registerSocket(agentId, socket);

    agentServer.emitCallBooked(agentId, callId);

    socket.emit.should.have.been.calledWith('call.booked', 'C0');
  })

  it('can emit call.bridged', () => {
    const agentId = 'A1';
    const callId = 'C1';
    const socket = mockSocketIoSocket();
    agentServer._registerSocket(agentId, socket);

    agentServer.emitCallBridged(agentId, callId);

    socket.emit.should.have.been.calledWith('call.bridged');
  })

  it('can emit call.ended', () => {
    const agentId = 'A2';
    const callId = 'C2';
    const socket = mockSocketIoSocket();
    agentServer._registerSocket(agentId, socket);

    agentServer.emitCallEnded(agentId, callId);

    socket.emit.should.have.been.calledWith('call.ended');
  })

  it('registers socket when agent has connected', () => {
    const agentId = 'A3';
    const socket = mockSocketIoSocket();

    agentServer._driver.emit('agent.connected', {agentId, socket});

    agentServer._getSocket(agentId).should.equal(socket);
  })
})