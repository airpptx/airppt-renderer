export declare enum PositionType {
    Grid = 0,
    Absolute = 1
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
