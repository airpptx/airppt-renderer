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
	OutputPath?: string;
}

export interface RawSlideShowDetails {
	slideShowGlobals: any;
	slideShowTheme: any;
}
