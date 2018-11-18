/**
 * Generates HTML output and adds relevant classes to elements, doesn't write to file
 */
import { PositionType } from "../models/options";
declare class HTMLGenerator {
    private JSDOM;
    private window;
    private $;
    constructor(positionType: PositionType);
    addElementToDOM(htmlString: string): void;
    getGeneratedHTML(): any;
}
export default HTMLGenerator;
