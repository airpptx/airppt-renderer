import { Plane, Coordinate } from "../models/grid";
export declare class GridScaler {
    private plane;
    private gridSize;
    private scaleFactor;
    constructor(initX: number, initY: number, numColumns: number, scaleFactorVal?: number);
    getNewPlaneSize(): Plane;
    /**
     *
     * @param {*} coordinate
     */
    getScaledCoordinate(coordinate: Coordinate): {
        x: number;
        y: number;
    };
    getScaledValue(val: any): number;
    getElementGridPlacement(origin: Coordinate, offset: Coordinate): {
        "grid-row": string;
        "grid-column": string;
    };
}
