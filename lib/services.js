const dataService = require('./data-service');
const notificationService = require('./notification-service');

function subscribeEvents(deviceToken, uid){
    return dataService.getEventsToSubscribe(uid).then(events => notificationService.subscribeToEvents(deviceToken, events));
}

function subscribeDevicesToEvent(event){
    return dataService.getDevices().then(devices => notificationService.subscribeDevicesToEvent(devices, event));
}

function updateSubscription(toSubscribe, toUnsubscribe, uid){
    return dataService.getUserDevices(uid).then(devices => notificationService.updateSubscription(toSubscribe, toUnsubscribe, devices));
}

function postNotification(topic, body){
    return notificationService.notifyTopic(body, topic);
}

module.exports = {
    subscribeEvents,
    subscribeDevicesToEvent,
    updateSubscription,
    postNotification
};