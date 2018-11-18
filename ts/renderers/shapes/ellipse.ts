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
		let css = format(
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
				name: element.name,
				width: scaler.getScaledValue(element.elementOffsetPosition.cx),
				height: scaler.getScaledValue(element.elementOffsetPosition.cy),
				background: element.shape.fill.fillType == FillType.Solid ? "#" + element.shape.fill.fillColor : "transparent"
			}
		);

		//stylize text in this element with a generic paragraph helper, may or may not work on all shapes
		if (element.paragraph) {
			let fontCSS = GenerateParagraphCSS(element.paragraph, element.name);
			this.addCSSAttribute(fontCSS);
		}

		if (element.shape.border) {
			let borderCSS = GenerateBorderCSS(element.shape.border, element.name);
			this.addCSSAttribute(borderCSS);
		}
		this.addCSSAttribute(css);
	}

	render(): string {
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
