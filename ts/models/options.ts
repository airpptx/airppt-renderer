export enum PositionType {
	Grid,
	Absolute
}

export interface RenderedElement {
	css: string;
	html: string;
}

export interface RendererOptions {
	PositionType: PositionType;
	GridSize?: number;
	OutputDirectory?: string;
	StyleSheetName?: string;
	DoNotRenderIDs?: string[];
}

export interface RawSlideShowDetails {
	slideShowGlobals: any;
	slideShowTheme: any;
}

export class Defaults {
	public static STYLE_SHEET_NAME = "element.css";
}
