import { RendererOptions, PositionType } from "../models/options";
import { Coordinate } from "../models/grid";

/**
 * Generates CSS Layout and Item Placement Classes as Per Slide
 */

const beautify = require("beautify");

export default class CSSGenerator {
	private allCSS = [];

	constructor(private slideCanvasSize: Coordinate, private settings: RendererOptions) {
		if (settings.PositionType == PositionType.Absolute) {
			let absCSS =
				`.wrapper {
				position: fixed;
				width:` +
				slideCanvasSize.x +
				`px;
				height:` +
				slideCanvasSize.y +
				`px;
				border-color: #000000;
				border-style: dotted
			  }`;
			this.allCSS.push(this.allCSS);
		} else {
			let gridCSS = `
			.wrapper {
				display: grid;
				grid-template-columns: repeat(12, 1fr);
				grid-gap: 10px;
				grid-auto-rows: minmax(80px, auto);
				width: 100vw;
			  }`;

			this.allCSS.push(gridCSS);
		}
	}

	public addCSSObject(css: string) {
		//TO-DO: Validate CSS
		this.allCSS.push(css);
	}

	public getGeneratedCSS() {
		return beautify(this.allCSS.join(""), { format: "css" });
	}
}
