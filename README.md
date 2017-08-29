# uw-lib-call-agents
Call agent servers

# Purpose
The library simplifies the development of telephony related applications in node.js by abstracting a CallAgentServer.  
Additionally, it abstracts a socket CallAgentServer.

It also provides concrete implementations of the CallServer --- currently, only one: SocketIo.

# SocketIo CallAgentServer
Implementation based on Socket.IO.

# Supported methods
A CallAgentServer can perform the following:

 - `start(port)` --- starts listening on the _port_,
 - `acknowledgeCallBooked(agentId, callId)` --- acknowledges that the call has been booked by the agent,
 - `acknowledgeCallBridged(agentId, callId)` --- acknowledges that the call has been bridged with the agent,
 - `acknowledgeCallEnded(agentId, callId)` --- acknowledges that the call has ended.

# Events
CallAgentServer emits the following events:

 - `agent.connected` --- with the value of agent ID --- when an agent has become available,
 - `agent.ready` --- with _agentId_ and _address_ --- when the address of the agent has been established,
 - `agent.disconnected` --- with the value of agent ID --- when the agent has become unavailable,
 - `call.termination.requested` --- with the value of agent ID --- on a request for terminating the call the agent is on.

Use `CallAgentServer.on(EVENT_NAME, (args) => { /* what to do */ })` to listen for an event and act whenever it occurs.

# Tests
Tests can be found in the tests/ folder: `make test` or `make test-coverage` to run them.

# Example usage
```
const agentServer = new SocketIoServer();   

agentServer.start(3988);   

agentServer.on('agent.connected', (agentId) => {
  log('Agent connected:', agentId);
  /* do sth more */
});  
```

# Ready examples
A working example can be found here:
https://github.com/utilitywarehouse/uw-callqueue-framework/blob/master/examples/index.js

