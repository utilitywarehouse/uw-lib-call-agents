const SocketIoDriver = require('../../src/drivers/socketIo');

describe('SocketIoDriver', () => {
  /** var SocketIoDriver **/
  let agentDriver;

  beforeEach(() => {
    agentDriver = new SocketIoDriver();
  })

  it('can create server', () => {
    const result = agentDriver.createServer();

    expect(result).to.be.an('object');
    expect(result.listen).to.be.a('function');
    expect(result.on).to.be.a('function');
  })
})