import { PositionType, RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";
import copyAssetToOutputDirectory from "../helpers/assetMover";

import * as format from "string-template";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";

export default class Image extends ElementRenderer {
	constructor(scaler: GridScaler, element: PowerpointElement, pptDetails: PowerpointDetails, rendererOptions: RendererOptions) {
		super(scaler, element, pptDetails, rendererOptions);

		copyAssetToOutputDirectory(this.rendererOptions.OutputPath, this.element.links.Uri, true); //also convert tiff to png
	}

	getCSS(): string {
		let shapeCSS = format(
			`#{name}.shape{
            width:{width}px;
            height:{height}px;    
            }`,
			{
				name: this.element.name,
				width: this.scaler.getScaledValue(this.element.elementOffsetPosition.cx),
				height: this.scaler.getScaledValue(this.element.elementOffsetPosition.cy)
			}
		);

		let positionCSS = this.getPositionCSS();

		return this.beautify(shapeCSS + positionCSS, { format: "css" });
	}

	getHTML(): string {
		let imagePath = this.getOutputImagePath(this.element.links.Uri);

		return format('<img id="{0}" src="{1}" class="position shape">', this.element.name, imagePath);
	}
}
