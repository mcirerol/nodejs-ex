const admin = require("firebase-admin");
const service = require('./services');

function sendNotification(req, reply) {
    const testToken = 'fNuiSR6IVgQ:APA91bGKFtQXVdsQaVvAh7e46rDPOg_jgVE_7z_6TxLR-yrYIlHdZDVVrC8HY7UKZyzN828lroyCRHFpR7oPb2CqCxL_pmNOpv2332JJJaZMYfyuH2DXb5mjZ9-glM6l9ZxQGn2wrU8e'
    admin.messaging().sendToTopic('-LGwaXMZNtZjT3seCVcq-off', { notification: { body: 'hey moises' } }).then((result)=>{
        console.log('message send');
        console.log(result);
        reply();
    }).catch(error => {
        console.log(error);
        reply(new Error('message not send ', error.message));
    })
}

function subscribeDevice(req, reply){
    const device = req.payload.deviceToken;
    service.subscribeEvents(device, req.auth.credentials.uid).then(()=>{
        console.log('device subscribed to events');
        reply();
    }).catch(error => {
        console.log('error subscribe device');
        console.error(error);
        reply(error);
    })
}

function subscribeDevicesToEvent(req, reply){
    const eventKey = req.payload.eventKey;
    service.subscribeDevicesToEvent(eventKey).then(()=>{
        console.log('devices subscribed to new event');
        reply();
    }).catch(error => {
        console.log('error subscribe devices to new event');
        console.error(error);
        reply(error);
    })
}

function updateSubscription(req, reply){
    const toSubscribe = req.payload.toSubscribe;
    const toUnsubscribe = req.payload.tuUnsubscribe;
    const uid = req.auth.credentials.uid;
    service.updateSubscription(toSubscribe, toUnsubscribe, uid).then(()=>{
        console.log('update subscribed');
        reply();
    }).catch(error => {
        console.log('update subscribed');
        console.error(error);
        reply(error);
    })
}


module.exports = {
    sendNotification,
    subscribeDevice,
    subscribeDevicesToEvent,
    updateSubscription,
};