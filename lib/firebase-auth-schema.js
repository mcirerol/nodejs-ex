const admin = require('firebase-admin');

function firebaseSchema(server, options) {
    function authenticate(request, reply) {
        if (request.query.idToken == null) {
            return reply('cannot authenticate without id token').code(401);
        }
        admin.auth().verifyIdToken(request.query.idToken).then((result) => {
            console.log(result);
            console.log()
            reply.continue({ credentials: result });
        }).catch((error) => {
            console.log('cannot authenticate');
            console.error(error);
            reply(error.message).code(401);
        })
    }
    return {
        authenticate,
    }
}

module.exports = firebaseSchema;