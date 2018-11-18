import * as format from "string-template";
import { PowerpointElement } from "airppt-models/pptelement";

/**
 * Pass in an Element and generate the border for it
 */
export default function GenerateBorderCSS(border: PowerpointElement["shape"]["border"], elementName: string): string {
	let scaleFactor = 96 / 914400; //default scale converts EMU to pixel

	let css = format(
		`#{name}.border{
			border-style:{type};
			border-color:{color};
			border-width:{width}px;

        }`,
		{
			name: elementName,
			type: border.type,
			color: border.color,
			width: border.thickness * scaleFactor
		}
	);
	return css;
}
