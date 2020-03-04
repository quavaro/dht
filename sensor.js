const sensor = require("node-dht-sensor").promises;
const bunyan = require("bunyan");
const fs = require("fs");

const logPath  = "/var/tmp/dhtsensor.log";
let lowestTemp = 9999;
let highestTemp = -9999;
var myArgs = process.argv.slice(2);
let filename, userDate;


//Usage 
if(myArgs.length>0){
    //checks to see if entered file path mathches the one containing log data
    if(myArgs[0] == logPath){
        filename = myArgs[0];
    }
    else console.log("file path entered does not contain recorded data");
    userDate = myArgs[1];
} else {
    console.log("Enter: [Log file path] [yyyy-mm-dd]")
}

//read file and parse JSON string to object jsonString
let logString;
fs.readFile(filename, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
        logString = JSON.parse(jsonString);
        console.log("JSON string parsed");
    } catch(err) {
        console.log('Error parsing JSON string:', err)
    }
})

//search through file and compare string
for(let i = 0; i < logString.length; i++){
    const date = logString[i].time;
    if(date.indexOf( userDate ) > -1){
        console.log(logString[i]);
    }
}


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