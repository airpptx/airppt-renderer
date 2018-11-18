import * as format from "string-template";
import { PowerpointElement } from "airppt-models/pptelement";

/**
 * Pass in a PPT Element and then generate the Text CSS
 */
export default function GenerateParagraphCSS(paragraph: PowerpointElement["paragraph"], elementName: string): string {
	let css = format(
		`#{name} .font{
        font-size:{size}px;
        font-family: "{font}", Times, serif;  
        color: #{fill}; 
		text-align:{alignment};
		vertical-align:middle;
		display: table-cell;
        }`,
		{
			name: elementName,
			size: paragraph.textCharacterProperties.size / 100,
			font: paragraph.textCharacterProperties.font,
			fill: paragraph.textCharacterProperties.fillColor,
			alignment: paragraph.paragraphProperties.alignment
		}
	);
	return css;
}
