"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options_1 = require("../models/options");
const jsdom = require("jsdom");
const jquery = require("jquery");
const beautify = require("beautify");
/**
 * Every Shape that is implemented must extend this renderer
 */
class ElementRenderer {
    constructor(scaler, element, powerpointDetails, rendererOptions) {
        this.scaler = scaler;
        this.element = element;
        this.powerpointDetails = powerpointDetails;
        this.rendererOptions = rendererOptions;
        this.elementCSS = [];
        this.$ = jquery(new jsdom.JSDOM().window);
        if (rendererOptions.PositionType == options_1.PositionType.Absolute) {
            this.generateElementAbsolutePosition();
        }
        else {
            this.generateElementGridPosition();
        }
    }
    getCSS() {
        return beautify(this.elementCSS.join(""), { format: "css" });
    }
    generateElementAbsolutePosition() {
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
    generateElementGridPosition() {
        let cssPosition = this.scaler.getElementGridPlacement({
            x: this.element.elementPosition.x,
            y: this.element.elementPosition.y
        }, {
            x: this.element.elementOffsetPosition.cx,
            y: this.element.elementOffsetPosition.cy
        });
        let elementStyleKey = "#" + this.element.name + ".position";
        let layoutStyle = {};
        layoutStyle[elementStyleKey] = cssPosition;
        let css = this.generateCSSfromObject(layoutStyle);
        this.elementCSS.push(css);
        return css;
    }
    generateCSSfromObject(obj) {
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
    getOutputImagePath(tiffPath) {
        let imagePath = tiffPath.replace("ppt", "assets");
        let fileExtension = tiffPath.split(".").pop();
        if (fileExtension == "tiff") {
            imagePath = imagePath.replace(".tiff", ".png"); //tiffs are converted to pngs, so use the new filepath
        }
        return imagePath;
    }
    addCSSAttribute(css) {
        this.elementCSS.push(css); //add the new css object
    }
}
exports.default = ElementRenderer;
