let { AirParser } = require("airppt-parser");
let { AirRenderer } = require("../js/main");

let pptPath = "/Users/raviteja_lingineni/Documents/Projects/airppt-renderer/tests/sample.pptx";
//TO-DO: Write test for each shape and slide number and confirm
let pptParser = new AirParser(pptPath);

waitForParsing();

async function waitForParsing() {
	let details = await pptParser.ParsePowerPoint(5);
	details.inputPath = pptPath;

	let pptRenderer = new AirRenderer(details, {
		GridSize: 12,
		OutputPath: "../output",
		PositionType: 1
	});

	let rendered = await pptRenderer.renderPage();
	console.log(rendered);
}
