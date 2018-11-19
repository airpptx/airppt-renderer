import { GridScaler } from "./helpers/gridscaler";
import { RendererOptions, RenderedElement, Defaults } from "./models/options";
import * as ShapeRenderers from "./renderers/index";
import { HTMLGenerator, WriteOutputFile, CSSGenerator } from "./generators/index";
import { PowerpointElement, SpecialityType } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
import ZipHandler from "./helpers/ziphandler";

export class AirRenderer {
	scaler: GridScaler;
	htmlGenerator = new HTMLGenerator(this.settings);
	cssGenerator: CSSGenerator;
	constructor(private slideShowDetails: PowerpointDetails, private settings: RendererOptions) {
		//TO-DO: Update Parser to pass in these details after parsed
		let slideSizeX = slideShowDetails.slideShowGlobals["p:presentation"]["p:sldSz"][0]["$"]["cx"];
		let slideSizeY = slideShowDetails.slideShowGlobals["p:presentation"]["p:sldSz"][0]["$"]["cy"];

		this.scaler = new GridScaler(slideSizeX, slideSizeY, 12);

		let scaledSlideX = this.scaler.getScaledValue(slideSizeX);
		let scaledSlideY = this.scaler.getScaledValue(slideSizeY);
		this.cssGenerator = new CSSGenerator({ x: scaledSlideX, y: scaledSlideY }, this.settings);
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

	async renderPage(writeToFile: boolean) {
		await ZipHandler.loadZip(this.slideShowDetails.inputPath);
		let all = [];
		for (let element of this.slideShowDetails.powerPointElements) {
			if (this.settings.DoNotRenderIDs && this.settings.DoNotRenderIDs.indexOf(element.name) != -1) {
				//ignore any elements that the user doesn't want rendered.
				continue;
			}
			let generatedElement = this.generateElement(this.scaler, element);
			all.push(generatedElement);
			this.htmlGenerator.addElementToDOM(generatedElement.html);
			this.cssGenerator.addCSSObject(generatedElement.css);
		}

		if (writeToFile) {
			//add HTML and CSS to files
			let styleSheetName = this.settings.StyleSheetName;
			if (!this.settings.StyleSheetName) {
				styleSheetName = Defaults.STYLE_SHEET_NAME;
			}

			await WriteOutputFile(this.settings.OutputDirectory, styleSheetName, this.cssGenerator.getGeneratedCSS());
			await WriteOutputFile(this.settings.OutputDirectory, "index.html", this.htmlGenerator.getGeneratedHTML());
		}

		return all;
	}

	public getPowerpointScaler() {
		return this.scaler;
	}
}
