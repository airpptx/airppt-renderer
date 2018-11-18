"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("../renderer");
const paragraph_1 = require("../helpers/paragraph");
const border_1 = require("../helpers/border");
const format = require("string-template");
const pptelement_1 = require("airppt-models/pptelement");
/**
 * Takes in an element and it's attributes to generate a rectangle and places elements in correct place. The scaler can help you convert heights and widths.
 * Raw GlobalXML values are passed in for reference such as theme.xml and presentation.xml
 */
class Ellipse extends renderer_1.default {
    //NOTE: We don't have to worry about width and height, our positioner takes care of that for us
    constructor(scaler, element, pptDetails, rendererOptions) {
        super(scaler, element, pptDetails, rendererOptions);
    }
    getCSS() {
        let elementCSS = [];
        let shapeCSS = format(`#{name}.shape{
            width:{width}px;
            height:{height}px;    
            background: {background}; 
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            border-radius: 50%;
			display: table;
            }`, {
            name: this.element.name,
            width: this.scaler.getScaledValue(this.element.elementOffsetPosition.cx),
            height: this.scaler.getScaledValue(this.element.elementOffsetPosition.cy),
            background: this.element.shape.fill.fillType == pptelement_1.FillType.Solid ? "#" + this.element.shape.fill.fillColor : "transparent"
        });
        elementCSS.push(shapeCSS);
        //stylize text in this element with a generic paragraph helper, may or may not work on all shapes
        if (this.element.paragraph) {
            let fontCSS = paragraph_1.default(this.element.paragraph, this.element.name);
            elementCSS.push(fontCSS);
        }
        if (this.element.shape.border) {
            let borderCSS = border_1.default(this.element.shape.border, this.element.name);
            elementCSS.push(borderCSS);
        }
        elementCSS.push(this.getPositionCSS());
        return this.beautify(elementCSS.join(""), { format: "css" });
    }
    getHTML() {
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
exports.default = Ellipse;
