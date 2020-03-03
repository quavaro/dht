const sensor = require("node-dht-sensor").promises;
const bunyan = require("bunyan");
const fs = require("fs");
let lowestTemp = 9999;
let highestTemp = -9999;
var myArgs = process.argv.slice(2);
let filename, date;
if(myArgs.length>0){
    filename = myArgs[0];
    date = myArgs[1];
    
}

const log = bunyan.createLogger({
    name: "dht",
    streams: [
        {
            path: "/var/tmp/dhtsensor.log",
            level: "info"
        }
    ]
});

setInterval(async () => {
    try {
        const reading = await sensor.read(22,4);
        const temp = reading.temperature;
        const humid = reading.humidity;
        if (temp>highestTemp) {
            highestTemp = temp;
        }
        else if(temp<lowestTemp) {
            lowestTemp = temp;
        }
        log.info(`Highest Temperature ${highestTemp}; Lowest Temperature ${lowestTemp}; humidity ${humid}`);
        console.log(`Temperature ${temp} humidity ${humid}`);
    } catch (e) {
        console.log("Error!");
        console.log(e);
    }
}, 10000);