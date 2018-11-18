import fs = require("fs");
import { AnySrvRecord } from "dns";
//take in HTML and CSS and generate a nice bundle!

export default WriteOutputFile;

//TO-DO: Allow this to be configurable
//must also udpdate assetmover.ts
function WriteOutputFile(outputDirectory: string, filename: string, value: string, options: any = {}): Promise<boolean> {
	return new Promise(function(resolve, reject) {
		//make an output folder
		if (!fs.existsSync(outputDirectory)) {
			fs.mkdirSync(outputDirectory);
			fs.mkdirSync(outputDirectory + "/assets/");
			fs.mkdirSync(outputDirectory + "/assets/media");
		}

		let filePath = outputDirectory + "/" + filename;
		fs.writeFile(filePath, value, options, function(err) {
			if (err) {
				console.log(filePath + " -> File Writing Error");
				reject(err);
			} else {
				resolve(true);
			}
		});
	});
}
