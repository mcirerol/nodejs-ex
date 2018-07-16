const admin = require('firebase-admin');

function subscribeToEvents(token, events) {
    const promises = events.map((event) => {
        return admin.messaging().subscribeToTopic(token, event);
    });

    return Promise.all(promises);

}

function subscribeDevicesToEvent(deviceTokens, event) {
    return admin.messaging().subscribeToTopic(deviceTokens, `${event}-off`);
}

function updateSubscription(toSubscribe, toUnsubscribe, devices) {
    return admin.messaging().unsubscribeFromTopic(devices, toSubscribe)
        .then(() => admin.messaging().subscribeToTopic(devices, toSubscribe));
}

module.exports = {
    subscribeToEvents,
    subscribeDevicesToEvent,
    updateSubscription
};
