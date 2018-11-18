"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
//take in HTML and CSS and generate a nice bundle!
exports.default = WriteOutputFile;
//TO-DO: Allow this to be configurable
//must also udpdate assetmover.ts
function WriteOutputFile(filename, value, options = {}) {
    return new Promise(function (resolve, reject) {
        //make an output folder
        if (!fs.existsSync("../output")) {
            fs.mkdirSync("../output");
            fs.mkdirSync("../output/assets");
            fs.mkdirSync("../output/assets/media");
        }
        fs.writeFile("../output/" + filename, value, options, function (err) {
            if (err) {
                console.log(filename + " File Writing Error");
                reject(err);
            }
            else {
                console.log("The " + filename + " file was written!");
                resolve(true);
            }
        });
    });
}
