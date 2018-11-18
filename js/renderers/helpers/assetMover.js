"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiffConverter_1 = require("../helpers/tiffConverter");
const index_1 = require("../../generators/index");
const ziphandler_1 = require("../../helpers/ziphandler");
exports.default = copyAssetToOutputDirectory;
//helper that moves image based asset from ppt to output directory
function copyAssetToOutputDirectory(outputDirectory, assetPath, convertTifftoPNG) {
    return __awaiter(this, void 0, void 0, function* () {
        //get the file from the zipfile
        let assetData = yield ziphandler_1.default.getFileInZip(assetPath);
        let fileName = assetPath.split("/").pop();
        //copy the file to the output
        yield index_1.WriteOutputFile(outputDirectory, "assets/media/" + fileName, assetData, { encoding: "base64" });
        //if it is an ppt image (ppt converts native images to tiffs), then do this step
        if (convertTifftoPNG) {
            let fileExtension = fileName.split(".").pop();
            if (fileExtension === "tiff") {
                let newFileName = fileName.split(".")[0] + ".png"; //convert to png
                tiffConverter_1.default(outputDirectory + "/assets/media/" + fileName, outputDirectory + "/assets/media/" + newFileName);
            }
        }
    });
}
