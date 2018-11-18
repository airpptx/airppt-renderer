import { RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
/**
 * Takes in an ppt element and it's attributes to generate a triangle and places elements in correct place
 * Raw GlobalXML values are passed in for reference such as theme.xml and presentation.xml
 */
export default class Triangle extends ElementRenderer {
    constructor(scaler: GridScaler, element: PowerpointElement, pptDetails: PowerpointDetails, rendererOptions: RendererOptions);
    getCSS(): string;
    getHTML(): string;
}
