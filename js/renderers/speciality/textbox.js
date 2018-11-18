"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("../renderer");
const format = require("string-template");
const pptelement_1 = require("airppt-models/pptelement");
class Textbox extends renderer_1.default {
    constructor(scaler, element, pptDetails, rendererOptions) {
        super(scaler, element, pptDetails, rendererOptions);
    }
    getCSS() {
        let shapeCSS = format(`#{name}.shape{
            width:{width}px;
            height:{height}px;    
            background: #{background}; 
            }`, {
            name: this.element.name,
            width: this.scaler.getScaledValue(this.element.elementOffsetPosition.cx),
            height: this.scaler.getScaledValue(this.element.elementOffsetPosition.cy),
            background: this.element.shape.fill.fillType == pptelement_1.FillType.Solid ? "#" + this.element.shape.fill.fillColor : "transparent"
        });
        return this.beautify(shapeCSS, { format: "css" });
    }
    getHTML() {
        let shapeDiv = format('<div id="{0}" class="{1}"> </div>', this.element.name, "position shape");
        this.$("body").append(shapeDiv); //add the shapediv initially
        if (this.element.paragraph) {
            let inputHTML = format('<input class="font" placeholder="{0}" style="width:100%; height:100%"/>', this.element.paragraph.text);
            this.$("#" + this.element.name).append(inputHTML);
        }
        return this.$("#" + this.element.name)[0].outerHTML;
    }
}
exports.default = Textbox;
