import { RendererOptions } from "../../models/options";
import { GridScaler } from "../../helpers/gridscaler";
import ElementRenderer from "../renderer";
import { PowerpointElement } from "airppt-models/pptelement";
import { PowerpointDetails } from "airppt-models/pptdetails";
export default class Textbox extends ElementRenderer {
    constructor(scaler: GridScaler, element: PowerpointElement, pptDetails: PowerpointDetails, rendererOptions: RendererOptions);
    render(): string;
}
