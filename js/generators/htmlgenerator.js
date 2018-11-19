"use strict";
/**
 * Generates HTML output and adds relevant classes to elements, doesn't write to file
 */
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = require("jsdom");
const beautify = require("beautify");
const jquery = require("jquery");
const format = require("string-template");
const options_1 = require("../models/options");
class HTMLGenerator {
    constructor(settings) {
        this.settings = settings;
        let styleSheetName = settings.StyleSheetName;
        if (!settings.StyleSheetName) {
            styleSheetName = options_1.Defaults.STYLE_SHEET_NAME;
        }
        this.JSDOM = jsdom.JSDOM;
        this.window = new this.JSDOM(format(`
					<html>
					<head>
						<link rel="stylesheet" type="text/css" href="{0}">
					</head>
						<body> 
						<div id="layout" class="wrapper">
						</div>
						</body>
					</html>`, styleSheetName)).window;
        this.$ = jquery(this.window);
    }
    addElementToDOM(htmlString) {
        /**
         * <div class="one">1</div>
         */
        this.$("#layout").append(htmlString);
    }
    getGeneratedHTML() {
        return beautify(this.window.document.documentElement.outerHTML, { format: "html" });
    }
}
exports.default = HTMLGenerator;
