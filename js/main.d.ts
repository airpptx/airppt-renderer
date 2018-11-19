import { GridScaler } from "./helpers/gridscaler";
import { RendererOptions } from "./models/options";
import { HTMLGenerator, CSSGenerator } from "./generators/index";
import { PowerpointDetails } from "airppt-models/pptdetails";
export declare class AirRenderer {
    private slideShowDetails;
    private settings;
    scaler: GridScaler;
    htmlGenerator: HTMLGenerator;
    cssGenerator: CSSGenerator;
    constructor(slideShowDetails: PowerpointDetails, settings: RendererOptions);
    private generateElement;
    renderPage(writeToFile: boolean): Promise<any[]>;
}
