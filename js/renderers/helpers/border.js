"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format = require("string-template");
/**
 * Pass in an Element and generate the border for it
 */
function GenerateBorderCSS(border, elementName) {
    let scaleFactor = 96 / 914400; //default scale converts EMU to pixel
    let css = format(`#{name}.border{
			border-style:{type};
			border-color:{color};
			border-width:{width}px;

        }`, {
        name: elementName,
        type: border.type,
        color: border.color,
        width: border.thickness * scaleFactor
    });
    return css;
}
exports.default = GenerateBorderCSS;
