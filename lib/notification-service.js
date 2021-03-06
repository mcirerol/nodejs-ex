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
    return admin.messaging().unsubscribeFromTopic(devices, toUnsubscribe)
        .then(() => admin.messaging().subscribeToTopic(devices, toSubscribe));
}

function notifyTopic(body, topic) {
    const notification = {
        body,
        title: 'Tortas APP',
        sound:'default'
    };
    return admin.messaging().sendToTopic(topic, { notification, data : { body } }, { priority: 'high' });
}

module.exports = {
    subscribeToEvents,
    subscribeDevicesToEvent,
    updateSubscription,
    notifyTopic,
};
