import { GridScaler } from "./helpers/gridscaler";
import { RendererOptions } from "./models/options";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
export declare class AirRenderer {
    private slideShowDetails;
    private settings;
    scaler: GridScaler;
    constructor(slideShowDetails: PowerpointDetails, settings: RendererOptions);
    generateElement(scaler: any, pptElement: PowerpointElement): {
        html: any;
        elementCSS: any;
    };
    renderPage(): Promise<any[]>;
    writeOutputPage(): void;
}
