/**
 * Generates HTML output and adds relevant classes to elements, doesn't write to file
 */

import * as jsdom from "jsdom";
import * as beautify from "beautify";
import * as jquery from "jquery";
import * as format from "string-template";
import { RendererOptions, Defaults } from "../models/options";

class HTMLGenerator {
	private JSDOM;
	private window;
	private $;

	constructor(private settings: RendererOptions) {
		let styleSheetName = settings.StyleSheetName;
		if (!settings.StyleSheetName) {
			styleSheetName = Defaults.STYLE_SHEET_NAME;
		}
		this.JSDOM = jsdom.JSDOM;
		this.window = new this.JSDOM(
			format(
				`
					<html>
					<head>
						<link rel="stylesheet" type="text/css" href="{0}">
					</head>
						<body> 
						<div id="layout" class="wrapper">
						</div>
						</body>
					</html>`,
				styleSheetName
			)
		).window;
		this.$ = jquery(this.window);
	}

	public addElementToDOM(htmlString: string) {
		/**
		 * <div class="one">1</div>
		 */

		this.$("#layout").append(htmlString);
	}

	public getGeneratedHTML() {
		return beautify(this.window.document.documentElement.outerHTML, { format: "html" });
	}
}

export default HTMLGenerator;
