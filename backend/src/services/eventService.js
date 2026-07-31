const eventEmitter = require("../events/eventEmitter");

const publishEvent = (eventName, data) => {
    eventEmitter.emit(eventName, data);
};

module.exports = {
    publishEvent
};