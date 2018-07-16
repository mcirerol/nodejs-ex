const handlers = require('./handlers');

module.exports = [
    {
        path: '/secure',
        method: 'GET',
        handler: handlers.sendNotification,
        config: {
            auth: 'firebase',
        }
    },
    {
        path: '/events/subscriptions',
        method: 'POST',
        handler: handlers.subscribeDevice,
        config: {
            auth: 'firebase',
        }
    },
    {
        path: '/devices/subscriptions',
        method: 'POST',
        handler: handlers.subscribeDevicesToEvent,
        config: {
            auth: 'firebase',
        }
    },
    {
        path: '/users/subscriptions',
        method: 'PUT',
        handler: handlers.updateSubscription,
        config: {
            auth: 'firebase',
        }
    },
]