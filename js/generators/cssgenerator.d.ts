import { RendererOptions } from "../models/options";
import { Coordinate } from "../models/grid";
export default class CSSGenerator {
    private slideCanvasSize;
    private settings;
    private allCSS;
    constructor(slideCanvasSize: Coordinate, settings: RendererOptions);
    addCSSObject(css: string): void;
    getGeneratedCSS(): any;
}
