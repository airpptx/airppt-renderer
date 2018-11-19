"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("../models/options");
/**
 * Generates CSS Layout and Item Placement Classes as Per Slide
 */
const beautify = require("beautify");
class CSSGenerator {
    constructor(slideCanvasSize, settings) {
        this.slideCanvasSize = slideCanvasSize;
        this.settings = settings;
        this.allCSS = [];
        if (settings.PositionType == options_1.PositionType.Absolute) {
            let absCSS = `.wrapper {
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
        }
        else {
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
    addCSSObject(css) {
        //TO-DO: Validate CSS
        this.allCSS.push(css);
    }
    getGeneratedCSS() {
        return beautify(this.allCSS.join(""), { format: "css" });
    }
}
exports.default = CSSGenerator;
