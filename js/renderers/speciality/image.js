"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderer_1 = require("../renderer");
const assetMover_1 = require("../helpers/assetMover");
const format = require("string-template");
class Image extends renderer_1.default {
    constructor(scaler, element, pptDetails, rendererOptions) {
        super(scaler, element, pptDetails, rendererOptions);
        let css = format(`#{name}.shape{
            width:{width}px;
            height:{height}px;    
            }`, {
            name: element.name,
            width: scaler.getScaledValue(element.elementOffsetPosition.cx),
            height: scaler.getScaledValue(element.elementOffsetPosition.cy)
        });
        this.addCSSAttribute(css);
        assetMover_1.default(this.rendererOptions.OutputPath, this.element.links.Uri, true); //also convert tiff to png
    }
    render() {
        let imagePath = this.getOutputImagePath(this.element.links.Uri);
        return format('<img id="{0}" src="{1}" class="position shape">', this.element.name, imagePath);
    }
}
exports.default = Image;
