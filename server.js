const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080
});

server.route({
    path: '/',
    method: 'GET',
    handler(req, reply) {
        reply('i said morning');
    }
});

server.start(((err) => {
    if (err != null) {
        return console.error(err);
    }

    console.log('server running at: ', server.info.uri);

}));