const eventEmitter = require("./eventEmitter");

eventEmitter.on(
    "LOW_STOCK",
    (data) => {
        console.log(
            "LOW STOCK EVENT:",
            data
        );
    }
);