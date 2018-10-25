

// Dependencies
const http = require('http');
const createServer = require('./createServer');
const cluster = require('cluster');
const os = require('os');

const app = {};

app.init = function () {

  const server = http.createServer(createServer);

  // Start the server and listen
  server.listen(3030, () => {
    console.log('Listening on port 3030');
  });

};

// Self invoking only if required directly
if (require.main === module) {

  if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }
  } else {
    app.init();
  }

}


