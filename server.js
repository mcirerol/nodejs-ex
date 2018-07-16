const Hapi = require('hapi');

const server = new Hapi.Server();
const firebaseSchema = require('./lib/firebase-auth-schema');
const dotEnv = require('dotenv');
const config = dotEnv.config();
const admin = require("firebase-admin");
const serviceAccount = require('./config').firebase;
const handlers = require('./lib/handlers');
const routes = require('./lib/routes');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.database
});

server.connection({
    host: process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    routes: {
        cors: true,
    }
});


server.state('idToken');

server.auth.scheme('FirebaseSchema', firebaseSchema);
server.auth.strategy('firebase', 'FirebaseSchema');

server.route({
    path: '/',
    method: 'GET',
    handler(req, reply) {
        reply('i said morning');
    }
});

server.route(routes);

server.start(((err) => {
    if (err != null) {
        return console.error(err);
    }

    console.log('server running at: ', server.info.uri);

}));