const sensor = require("node-dht-sensor").promises;
const bunyan = require("bunyan");
const fs = require("fs");

const logPath  = "var/tmp/dhtsensor.log";
let lowestTemp = 9999;
let highestTemp = -9999;


const log = bunyan.createLogger({
    name: "dht",
    streams: [
        {
            path: logPath,
            level: "info"
        }
    ]
});

setInterval(async () => {
    try {
        const reading = await sensor.read(22,4);
        const temp = reading.temperature;
        const humid = reading.humidity;
        const date = new Date();
        if (temp>highestTemp) {
            highestTemp = temp;
        }
        else if(temp<lowestTemp) {
            lowestTemp = temp;
        }
        log.info(`{'highTemp': ${highestTemp},'lowTemp': ${lowestTemp},'temperature': '${temperature},' humidity': ${humid},'date': ${date.toLocaleDateString("en-US")}}`);
        console.log(`Temperature ${temp} | humidity ${humid} | Highest Temperature ${highestTemp} | Lowest Temperature ${lowestTemp} | humidity ${humid} | date ${date.toLocaleDateString("en-US")}`);
    } catch (e) {
        console.log("Error!");
        console.log(e);
    }
}, 10000);