"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const format = require("string-template");
/**
 * Pass in a PPT Element and then generate the Text CSS
 */
function GenerateParagraphCSS(paragraph, elementName) {
    let css = format(`#{name} .font{
        font-size:{size}px;
        font-family: "{font}", Times, serif;  
        color: #{fill}; 
		text-align:{alignment};
		vertical-align:middle;
		display: table-cell;
        }`, {
        name: elementName,
        size: paragraph.textCharacterProperties.size / 100,
        font: paragraph.textCharacterProperties.font,
        fill: paragraph.textCharacterProperties.fillColor,
        alignment: paragraph.paragraphProperties.alignment
    });
    return css;
}
exports.default = GenerateParagraphCSS;
