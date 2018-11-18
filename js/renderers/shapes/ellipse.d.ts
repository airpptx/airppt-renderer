import { RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
/**
 * Takes in an element and it's attributes to generate a rectangle and places elements in correct place. The scaler can help you convert heights and widths.
 * Raw GlobalXML values are passed in for reference such as theme.xml and presentation.xml
 */
export default class Ellipse extends ElementRenderer {
    constructor(scaler: GridScaler, element: PowerpointElement, pptDetails: PowerpointDetails, rendererOptions: RendererOptions);
    render(): string;
}
