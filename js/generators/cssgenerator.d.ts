import { PositionType } from "../models/options";
declare class CSSGenerator {
    static gridCSS: any[];
    static absoluteCSS: any[];
    static generateCSS(posType: PositionType, cssElements: string[], absoluteSizeX?: number, absoluteSizeY?: number): string;
}
export default CSSGenerator;
