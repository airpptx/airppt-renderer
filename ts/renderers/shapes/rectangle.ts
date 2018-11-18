import { RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";
import GenerateParagraphCSS from "../helpers/paragraph";
import GenerateBorderCSS from "../helpers/border";
import copyAssetToOutputDirectory from "../helpers/assetMover";

import * as format from "string-template";
import { PowerpointElement, LinkType, FillType } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";

/**
 * 
/**
 * Takes in an element and it's attributes to generate a rectangle and places elements in correct place. The scaler can help you convert heights and widths.
 * Raw GlobalXML values are passed in for reference such as theme.xml and presentation.xml
 */
export default class Rectangle extends ElementRenderer {
	//NOTE: We don't have to worry about positioning, our scaler and the base class takes care of that for us
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
			display: table;
            }`,
			{
				name: this.element.name,
				width: this.scaler.getScaledValue(this.element.elementOffsetPosition.cx),
				height: this.scaler.getScaledValue(this.element.elementOffsetPosition.cy),
				background: this.determineBackground()
			}
		);

		//stylize text in this element with a generic paragraph helper, may or may not work on all shapes
		if (this.element.paragraph) {
			let fontCSS = GenerateParagraphCSS(this.element.paragraph, this.element.name);
			elementCSS.push(fontCSS);
		}

		if (this.element.shape.border) {
			let borderCSS = GenerateBorderCSS(this.element.shape.border, this.element.name);
			elementCSS.push(borderCSS);
		}
	}

	getHtml(): string {
		//NOTE: I'm using JQUERY to build my dom, but you can return html however you want

		let shapeDiv = format(
			`<div id="{0}" class="{1}">
				<a style="height:100%;display:block;"> </a>
			</div>`,
			this.element.name,
			"position shape border"
		);
		this.$("body").append(shapeDiv); //add the shapediv initially

		if (this.element.links) {
			if (this.element.links.Type == LinkType.External) {
				this.$("#" + this.element.name + " > a").attr("href", this.element.links.Uri);
			}
		}

		if (this.element.paragraph) {
			let paragraphHTML = format('<p class="font">{0}</p>', this.element.paragraph.text);
			this.$("#" + this.element.name).append(paragraphHTML); //add the paragraph div within t
		}

		return this.$("#" + this.element.name)[0].outerHTML;
	}

	determineBackground(): string {
		if (this.element.shape.opacity == 0) {
			return "transparent";
		}

		let fillDetails = this.element.shape.fill;
		if (fillDetails.fillType == FillType.Solid) {
			return "#" + this.element.shape.fill.fillColor;
		}

		if (fillDetails.fillType == FillType.Image) {
			copyAssetToOutputDirectory(this.rendererOptions.OutputPath, fillDetails.fillColor, true);
			//change tiff references to pngs
			let imagePath = this.getOutputImagePath(fillDetails.fillColor);
			console.log("GOT Imagepath as ", imagePath);
			return format("url({0})", imagePath);
		}

		return "transparent";
	}
}
