import { RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";

import * as format from "string-template";
import { PowerpointElement, FillType } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";

/**
 * Takes in an ppt element and it's attributes to generate a triangle and places elements in correct place
 * Raw GlobalXML values are passed in for reference such as theme.xml and presentation.xml
 */
export default class Triangle extends ElementRenderer {
	constructor(scaler: GridScaler, element: PowerpointElement, pptDetails: PowerpointDetails, rendererOptions: RendererOptions) {
		super(scaler, element, pptDetails, rendererOptions);
	}

	getCSS(): string {
		let shapeCSS = format(
			`#{name}.shape {
            width: 0;
            height: 0;
            border-top: {height}px solid transparent;
            border-left: {width}px solid {background};
            border-bottom: {height}px solid transparent;
        }
        `,
			{
				name: this.element.name,
				width: this.scaler.getScaledValue(this.element.elementOffsetPosition.cx),
				height: this.scaler.getScaledValue(this.element.elementOffsetPosition.cy) / 2,
				background: this.element.shape.fill.fillType == FillType.Solid ? "#" + this.element.shape.fill.fillColor : "transparent"
			}
		);

		let positionCSS = this.getPositionCSS();
		return this.beautify(shapeCSS + positionCSS, { format: "css" });
	}

	getHTML(): string {
		let shapeDiv = format('<div id="{0}" class="{1}"> </div>', this.element.name, "position shape");
		this.$("body").append(shapeDiv); //add the shapediv initially

		if (this.element.paragraph) {
			let paragraphHTML = format('<p class="font">{0}</p>', this.element.paragraph.text);
			this.$("#" + this.element.name).append(paragraphHTML); //add the paragraph div within t
		}

		return this.$("#" + this.element.name)[0].outerHTML;
	}
}
