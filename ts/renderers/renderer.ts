import { GridScaler } from "../helpers/gridscaler";
import { PositionType, RendererOptions } from "../models/options";

import * as jsdom from "jsdom";
import * as jquery from "jquery";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";

const textBeautify = require("beautify");

/**
 * Every Shape that is implemented must extend this renderer, the positioning is handled automatically
 */
abstract class ElementRenderer {
	protected elementCSS = [];
	protected $ = jquery(new jsdom.JSDOM().window);
	protected beautify = textBeautify;

	constructor(
		protected scaler: GridScaler,
		protected element: PowerpointElement,
		protected powerpointDetails: PowerpointDetails,
		protected rendererOptions: RendererOptions
	) {
		if (rendererOptions.PositionType == PositionType.Absolute) {
			this.generateElementAbsolutePosition();
		} else {
			this.generateElementGridPosition();
		}
	}

	public abstract getHtml(): string;
	public abstract getCSS(): string;

	private generateElementAbsolutePosition() {
		let scaledPositionCoordinates = this.scaler.getScaledCoordinate({
			x: this.element.elementPosition.x,
			y: this.element.elementPosition.y
		});
		let cssPosition = {
			position: "absolute",
			top: scaledPositionCoordinates.y + "px",
			left: scaledPositionCoordinates.x + "px"
		};
		let elementStyleKey = "#" + this.element.name + ".position";
		let layoutStyle = {};
		layoutStyle[elementStyleKey] = cssPosition;
		let css = this.generateCSSfromObject(layoutStyle);
		this.elementCSS.push(css);
		return css;
	}

	private generateElementGridPosition() {
		let cssPosition = this.scaler.getElementGridPlacement(
			{
				x: this.element.elementPosition.x,
				y: this.element.elementPosition.y
			},
			{
				x: this.element.elementOffsetPosition.cx,
				y: this.element.elementOffsetPosition.cy
			}
		);
		let elementStyleKey = "#" + this.element.name + ".position";
		let layoutStyle = {};
		layoutStyle[elementStyleKey] = cssPosition;
		let css = this.generateCSSfromObject(layoutStyle);
		this.elementCSS.push(css);
		return css;
	}

	protected getPositionCSS() {
		let css = "";
		if (this.rendererOptions.PositionType == PositionType.Absolute) {
			css = this.generateElementAbsolutePosition();
		} else {
			css = this.generateElementGridPosition();
		}

		return css;
	}

	protected generateCSSfromObject(obj: any) {
		const selectors = Object.keys(obj);
		let css = selectors
			.map(selector => {
				const definition = obj[selector];
				const rules = Object.keys(definition)
					.map(rule => `${rule}:${definition[rule]}`)
					.join(";");
				return `${selector} {${rules}}`;
			})
			.join("");
		return css;
	}

	protected getOutputImagePath(tiffPath) {
		let imagePath = tiffPath.replace("ppt", "assets");
		let fileExtension = tiffPath.split(".").pop();
		if (fileExtension == "tiff") {
			imagePath = imagePath.replace(".tiff", ".png"); //tiffs are converted to pngs, so use the new filepath
		}

		return imagePath;
	}
	protected addCSSAttribute(css: string): void {
		this.elementCSS.push(css); //add the new css object
	}
}

export default ElementRenderer;
