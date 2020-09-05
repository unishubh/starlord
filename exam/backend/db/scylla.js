const scylla = require("cassandra-driver");

const client = (module.exports.client = new scylla.Client({
  contactPoints: ["172.17.0.2"],
  localDataCenter: "datacenter1",
  keyspace: "starlord",
}));

module.exports.connect = async () => {
  console.log("Connection to scylla");
  return client.connect();
};
