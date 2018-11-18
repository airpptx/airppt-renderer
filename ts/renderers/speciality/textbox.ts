import { PositionType, RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";

import * as format from "string-template";
import { PowerpointElement, FillType } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";

export default class Textbox extends ElementRenderer {
	constructor(scaler: GridScaler, element: PowerpointElement, pptDetails: PowerpointDetails, rendererOptions: RendererOptions) {
		super(scaler, element, pptDetails, rendererOptions);
		let css = format(
			`#{name}.shape{
            width:{width}px;
            height:{height}px;    
            background: #{background}; 
            }`,
			{
				name: element.name,
				width: scaler.getScaledValue(element.elementOffsetPosition.cx),
				height: scaler.getScaledValue(element.elementOffsetPosition.cy),
				background: element.shape.fill.fillType == FillType.Solid ? "#" + element.shape.fill.fillColor : "transparent"
			}
		);
		this.addCSSAttribute(css);
	}

	getHtml(): string {
		let shapeDiv = format('<div id="{0}" class="{1}"> </div>', this.element.name, "position shape");
		this.$("body").append(shapeDiv); //add the shapediv initially

		if (this.element.paragraph) {
			let inputHTML = format('<input class="font" placeholder="{0}" style="width:100%; height:100%"/>', this.element.paragraph.text);
			this.$("#" + this.element.name).append(inputHTML);
		}

		return this.$("#" + this.element.name)[0].outerHTML;
	}
}
