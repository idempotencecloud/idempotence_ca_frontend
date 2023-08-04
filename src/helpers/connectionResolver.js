function resolveReciprocalConnection(agent, connection) {
  let candidates = [];
  if (connection.vertexOneCertificateAuthority.ID != agent.agent.ID) {
    candidates.push(connection.vertexOneCertificateAuthority);
  }
  if (connection.vertexTwoCertificateAuthority.ID != agent.agent.ID) {
    candidates.push(connection.vertexTwoCertificateAuthority);
  }
  if (candidates.length == 2) {
    candidates.filter((c) => c.companyId != agent.agent.companyId);
  }
  return candidates[0];
}

function processConnections(agent, connections) {
  for (let connection of connections) {
    connection.to_agent = resolveReciprocalConnection(agent, connection);
  }
}

export default processConnections;
