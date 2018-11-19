"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gridscaler_1 = require("./helpers/gridscaler");
const options_1 = require("./models/options");
const ShapeRenderers = require("./renderers/index");
const index_1 = require("./generators/index");
const pptelement_1 = require("airppt-models/pptelement");
const ziphandler_1 = require("./helpers/ziphandler");
class AirRenderer {
    constructor(slideShowDetails, settings) {
        this.slideShowDetails = slideShowDetails;
        this.settings = settings;
        this.htmlGenerator = new index_1.HTMLGenerator(this.settings);
        //TO-DO: Update Parser to pass in these details after parsed
        let slideSizeX = slideShowDetails.slideShowGlobals["p:presentation"]["p:sldSz"][0]["$"]["cx"];
        let slideSizeY = slideShowDetails.slideShowGlobals["p:presentation"]["p:sldSz"][0]["$"]["cy"];
        this.scaler = new gridscaler_1.GridScaler(slideSizeX, slideSizeY, 12);
        let scaledSlideX = this.scaler.getScaledValue(slideSizeX);
        let scaledSlideY = this.scaler.getScaledValue(slideSizeY);
        this.cssGenerator = new index_1.CSSGenerator({ x: scaledSlideX, y: scaledSlideY }, this.settings);
        //iterate and generate
    }
    generateElement(scaler, pptElement) {
        //return the CSS and HTML for only one element
        let rendererType = pptElement.specialityType == pptelement_1.SpecialityType.None ? pptElement.shapeType : pptElement.specialityType; //set the renderer type dynamically
        //Convert PPT shapes
        let renderedElement = new ShapeRenderers[rendererType](scaler, pptElement, this.slideShowDetails, this.settings);
        let css = renderedElement.getCSS();
        let html = renderedElement.getHTML();
        return {
            html,
            css
        };
    }
    renderPage(writeToFile) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ziphandler_1.default.loadZip(this.slideShowDetails.inputPath);
            let all = [];
            for (let element of this.slideShowDetails.powerPointElements) {
                let generatedElement = this.generateElement(this.scaler, element);
                all.push(generatedElement);
                this.htmlGenerator.addElementToDOM(generatedElement.html);
                this.cssGenerator.addCSSObject(generatedElement.css);
            }
            if (writeToFile) {
                //add HTML and CSS to files
                let styleSheetName = this.settings.StyleSheetName;
                if (!this.settings.StyleSheetName) {
                    styleSheetName = options_1.Defaults.STYLE_SHEET_NAME;
                }
                yield index_1.WriteOutputFile(this.settings.OutputDirectory, styleSheetName, this.cssGenerator.getGeneratedCSS());
                yield index_1.WriteOutputFile(this.settings.OutputDirectory, "index.html", this.htmlGenerator.getGeneratedHTML());
            }
            return all;
        });
    }
}
exports.AirRenderer = AirRenderer;
