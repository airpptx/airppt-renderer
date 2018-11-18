import { RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";
import GenerateParagraphCSS from "../helpers/paragraph";
import GenerateBorderCSS from "../helpers/border";

import * as format from "string-template";
import { PowerpointElement, FillType } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";

/**
 * Takes in an element and it's attributes to generate a rectangle and places elements in correct place. The scaler can help you convert heights and widths.
 * Raw GlobalXML values are passed in for reference such as theme.xml and presentation.xml
 */
export default class Ellipse extends ElementRenderer {
	//NOTE: We don't have to worry about width and height, our positioner takes care of that for us
	constructor(scaler: GridScaler, element: PowerpointElement, pptDetails: PowerpointDetails, rendererOptions: RendererOptions) {
		super(scaler, element, pptDetails, rendererOptions);
	}

	getCSS(): string {
		let elementCSS = [];
		let shapeCSS = format(
			`#{name}.shape{
            width:{width}px;
            height:{height}px;    
            background: {background}; 
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            border-radius: 50%;
			display: table;
            }`,
			{
				name: this.element.name,
				width: this.scaler.getScaledValue(this.element.elementOffsetPosition.cx),
				height: this.scaler.getScaledValue(this.element.elementOffsetPosition.cy),
				background: this.element.shape.fill.fillType == FillType.Solid ? "#" + this.element.shape.fill.fillColor : "transparent"
			}
		);
		elementCSS.push(shapeCSS);
		//stylize text in this element with a generic paragraph helper, may or may not work on all shapes
		if (this.element.paragraph) {
			let fontCSS = GenerateParagraphCSS(this.element.paragraph, this.element.name);
			elementCSS.push(fontCSS);
		}

		if (this.element.shape.border) {
			let borderCSS = GenerateBorderCSS(this.element.shape.border, this.element.name);
			elementCSS.push(borderCSS);
		}

		elementCSS.push(this.getPositionCSS());
		return this.beautify(elementCSS.join(""), { format: "css" });
	}

	getHTML(): string {
		//NOTE: I'm using JQUERY to build my dom, but you can return html however you want

		let shapeDiv = format('<div id="{0}" class="{1}"><p></p> </div>', this.element.name, "position shape border");
		this.$("body").append(shapeDiv); //add the shapediv initially

		if (this.element.paragraph) {
			let paragraphHTML = format('<p class="font">{0}</p>', this.element.paragraph.text);
			this.$("#" + this.element.name).append(paragraphHTML); //add the paragraph div within t
		}

		return this.$("#" + this.element.name)[0].outerHTML;
	}
}
