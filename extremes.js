<<<<<<< HEAD
const fs = require("fs");

let lowestTemp = 9999;
let highestTemp = -9999;
var myArgs = process.argv.slice(2);
let filename, userDate;

//Usage 
if(myArgs.length>0){
    //checks to see if entered file path mathches the one containing log data
    if(myArgs[0].length>0){
        filename = `${__dirname}/${myArgs[0]}`;
    }
    else console.log("file path entered does not contain recorded data");
    userDate = myArgs[1];
} else {
    console.log("Enter: [Log file path] [yyyy-mm-dd]")
}

//read file and parse JSON string to object jsonString
let jsonString = fs.readFileSync(filename, 'utf8');

let logString;
    try {
        logString = JSON.parse(jsonString);
     } catch(err) {
        console.log('Error parsing JSON string:', err)
    }

//search through file and compare string
for(let i = 0; i < logString.length; i++){
    const date = logString[i].date;
    if(date.indexOf( userDate ) > -1){
        if(logString[i].highTemp>highestTemp){
            highestTemp = logString[i].highTemp;
        }
        if(logString[i].lowTemp<lowestTemp){
            lowestTemp = logString[i].lowTemp;
        }
    }
}
console.log(`High Temperature: ${highestTemp} | Low Temperature: ${lowestTemp}`);
=======
const fs = require("fs");

let lowestTemp = 9999;
let highestTemp = -9999;
var myArgs = process.argv.slice(2);
let filename, userDate;

//Usage 
if(myArgs.length>0){
    //checks to see if entered file path mathches the one containing log data
    if(myArgs[0].length>0){
        filename = `${__dirname}/${myArgs[0]}`;
    }
    else console.log("file path entered does not contain recorded data");
    userDate = myArgs[1];
} else {
    console.log("Enter: [Log file path] [yyyy-mm-dd]")
}

//read file and parse JSON string to object jsonString
let jsonString = fs.readFileSync(filename, 'utf8');

let logString;
    try {
        logString = JSON.parse(jsonString);
     } catch(err) {
        console.log('Error parsing JSON string:', err)
    }

//search through file and compare string
for(let i = 0; i < logString.length; i++){
    const date = logString[i].date;
    if(date.indexOf( userDate ) > -1){
        if(logString[i].highTemp>highestTemp){
            highestTemp = logString[i].highTemp;
        }
        if(logString[i].lowTemp<lowestTemp){
            lowestTemp = logString[i].lowTemp;
        }
    }
}
console.log(`High Temperature: ${highestTemp} | Low Temperature: ${lowestTemp}`);
>>>>>>> dee83ae7a7c9daf3655e55fe9f222804b136c15f
