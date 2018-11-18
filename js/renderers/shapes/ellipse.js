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
        let css = format(`#{name}.shape{
            width:{width}px;
            height:{height}px;    
            background: {background}; 
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            border-radius: 50%;
			display: table;
            }`, {
            name: element.name,
            width: scaler.getScaledValue(element.elementOffsetPosition.cx),
            height: scaler.getScaledValue(element.elementOffsetPosition.cy),
            background: element.shape.fill.fillType == pptelement_1.FillType.Solid ? "#" + element.shape.fill.fillColor : "transparent"
        });
        //stylize text in this element with a generic paragraph helper, may or may not work on all shapes
        if (element.paragraph) {
            let fontCSS = paragraph_1.default(element.paragraph, element.name);
            this.addCSSAttribute(fontCSS);
        }
        if (element.shape.border) {
            let borderCSS = border_1.default(element.shape.border, element.name);
            this.addCSSAttribute(borderCSS);
        }
        this.addCSSAttribute(css);
    }
    render() {
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
