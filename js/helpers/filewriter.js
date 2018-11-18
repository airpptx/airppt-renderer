"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
//take in HTML and CSS and generate a nice bundle!
exports.default = WriteOutputFile;
//TO-DO: Allow this to be configurable
//must also udpdate assetmover.ts
function WriteOutputFile(outputDirectory, filename, value, options = {}) {
    return new Promise(function (resolve, reject) {
        //make an output folder
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
            fs.mkdirSync(outputDirectory + "/assets/");
            fs.mkdirSync(outputDirectory + "/assets/media");
        }
        let filePath = outputDirectory + "/" + filename;
        fs.writeFile(filePath, value, options, function (err) {
            if (err) {
                console.log(filePath + " -> File Writing Error");
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
}
