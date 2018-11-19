/**
 * Generates HTML output and adds relevant classes to elements, doesn't write to file
 */
import { RendererOptions } from "../models/options";
declare class HTMLGenerator {
    private settings;
    private JSDOM;
    private window;
    private $;
    constructor(settings: RendererOptions);
    addElementToDOM(htmlString: string): void;
    getGeneratedHTML(): any;
}
export default HTMLGenerator;
