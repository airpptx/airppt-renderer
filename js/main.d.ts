import { GridScaler } from "./helpers/gridscaler";
import { RendererOptions } from "./models/options";
import { HTMLGenerator } from "./generators/index";
import { PowerpointDetails } from "airppt-models/pptdetails";
export declare class AirRenderer {
    private slideShowDetails;
    private settings;
    scaler: GridScaler;
    htmlGenerator: HTMLGenerator;
    constructor(slideShowDetails: PowerpointDetails, settings: RendererOptions);
    private generateElement;
    renderPage(outputPath: any): Promise<any[]>;
}
