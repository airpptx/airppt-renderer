"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { decode } = require("decode-tiff");
const { PNG } = require("pngjs");
const fs = require("fs");
/**
 * Powerpoint converts images into Tiffs, we need to convert them back to PNGs when writing our content to support HTML
 */
function convertToPNGandWrite(inputPath, outputPath) {
    try {
        const { width, height, data } = decode(fs.readFileSync(inputPath));
        const png = new PNG({ width, height });
        png.data = data;
        fs.writeFileSync(outputPath, PNG.sync.write(png));
    }
    catch (ex) {
        console.log(ex);
        throw Error("Something went wrong when reading and converting Tiff to PNG");
    }
}
exports.default = convertToPNGandWrite;
