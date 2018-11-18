import { GridScaler } from "./helpers/gridscaler";
import { RendererOptions, RenderedElement } from "./models/options";
import * as ShapeRenderers from "./renderers/index";
import { HTMLGenerator, WriteOutputFile, CSSGenerator } from "./generators/index";
import { PowerpointElement, SpecialityType } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
import ZipHandler from "./helpers/ziphandler";

export class AirRenderer {
	scaler: GridScaler;
	htmlGenerator = new HTMLGenerator(this.settings.PositionType);

	constructor(private slideShowDetails: PowerpointDetails, private settings: RendererOptions) {
		//TO-DO: Update Parser to pass in these details after parsed
		let slideSizeX = slideShowDetails.slideShowGlobals["p:presentation"]["p:sldSz"][0]["$"]["cx"];
		let slideSizeY = slideShowDetails.slideShowGlobals["p:presentation"]["p:sldSz"][0]["$"]["cy"];

		this.scaler = new GridScaler(slideSizeX, slideSizeY, 12);

		let scaledSlideX = this.scaler.getScaledValue(slideSizeX);
		let scaledSlideY = this.scaler.getScaledValue(slideSizeY);

		//iterate and generate
	}

	private generateElement(scaler, pptElement: PowerpointElement): RenderedElement {
		//return the CSS and HTML for only one element
		let rendererType = pptElement.specialityType == SpecialityType.None ? pptElement.shapeType : pptElement.specialityType; //set the renderer type dynamically
		//Convert PPT shapes
		let renderedElement = new ShapeRenderers[rendererType](scaler, pptElement, this.slideShowDetails, this.settings);
		let css = renderedElement.getCSS();
		let html = renderedElement.getHTML();

		return {
			html,
			css
		};
	}

	async renderPage(outputPath) {
		await ZipHandler.loadZip(this.slideShowDetails.inputPath);
		let all = [];
		for (let element of this.slideShowDetails.powerPointElements) {
			let result = this.generateElement(this.scaler, element);
			all.push(result);
			this.htmlGenerator.addElementToDOM(result.html);
		}

		if (outputPath) {
			//add HTML and CSS to files
			this.htmlGenerator.getGeneratedHTML();
			//await WriteOutputFile();
		}

		return all;
	}
}
