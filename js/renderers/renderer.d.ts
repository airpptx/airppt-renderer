import { GridScaler } from "../helpers/gridscaler";
import { RendererOptions } from "../models/options";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
/**
 * Every Shape that is implemented must extend this renderer, the positioning is handled automatically
 */
declare abstract class ElementRenderer {
    protected scaler: GridScaler;
    protected element: PowerpointElement;
    protected powerpointDetails: PowerpointDetails;
    protected rendererOptions: RendererOptions;
    protected $: any;
    protected beautify: any;
    constructor(scaler: GridScaler, element: PowerpointElement, powerpointDetails: PowerpointDetails, rendererOptions: RendererOptions);
    abstract getHTML(): string;
    abstract getCSS(): string;
    private generateElementAbsolutePosition;
    private generateElementGridPosition;
    protected getPositionCSS(): string;
    protected generateCSSfromObject(obj: any): string;
    protected getOutputImagePath(tiffPath: any): any;
}
export default ElementRenderer;
