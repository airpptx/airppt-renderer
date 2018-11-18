import { GridScaler } from "../helpers/gridscaler";
import { RendererOptions } from "../models/options";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
/**
 * Every Shape that is implemented must extend this renderer
 */
declare abstract class ElementRenderer {
    protected scaler: GridScaler;
    protected element: PowerpointElement;
    protected powerpointDetails: PowerpointDetails;
    protected rendererOptions: RendererOptions;
    protected elementCSS: any[];
    protected $: any;
    constructor(scaler: GridScaler, element: PowerpointElement, powerpointDetails: PowerpointDetails, rendererOptions: RendererOptions);
    getCSS(): string;
    abstract render(): string;
    private generateElementAbsolutePosition;
    private generateElementGridPosition;
    protected generateCSSfromObject(obj: any): string;
    protected getOutputImagePath(tiffPath: any): any;
    protected addCSSAttribute(css: string): void;
}
export default ElementRenderer;
