const admin = require('firebase-admin');

function getEventsToSubscribe(uid) {
    return new Promise((resolve, reject) => {
        const dbRef = admin.database().ref('users/' + uid + '/participants');
        dbRef.once('value', (snapshot) => {
            const usersParticipations = snapshot.val();
            const eventsTopics = [];
            Object.keys(usersParticipations).forEach((eventKey) => {
                if (usersParticipations[eventKey].total == null || usersParticipations[eventKey].total === 0) {
                    eventsTopics.push(eventKey + '-off');
                }
                else {
                    eventsTopics.push(eventKey + '-on');
                }
            })

            resolve(eventsTopics);
        }, (error) => reject(error));
    });
}

function getDevices() {
    return new Promise((resolve, reject) => {
        const ref = admin.database().ref('users-ids');
        ref.once('value', (snapshot) => {
            const users = snapshot.val();
            let devices = [];
            Object.keys(users).forEach((userKey) => {
                devices = devices.concat(Object.keys(users[userKey].devices || []));
            });
            resolve(devices);
        }, (error) => {
            reject(error);
        });
    })
}

function getUserDevices(uid) {
    return new Promise((resolve, reject) => {
        const ref = admin.database().ref('users-ids/' + uid + '/devices');
        ref.once('value', (snapshot) => {
            resolve(Object.keys(snapshot.val() || {}));
        }, (error) => {
            reject(error);
        });
    })
}

module.exports = {
    getEventsToSubscribe,
    getDevices,
    getUserDevices,
};