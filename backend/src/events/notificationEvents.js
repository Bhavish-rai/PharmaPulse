const eventEmitter = require("./eventEmitter");

eventEmitter.on(
    "ORDER_CREATED",
    (data) => {
        console.log(
            "ORDER CREATED EVENT:",
            data
        );
    }
);