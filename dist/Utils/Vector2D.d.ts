import { Point2D } from "./Point2D";
export declare class Vector2D {
    constructor(_x: number, _y: number);
    get X(): number;
    get Y(): number;
    Scale(_scalar: number): void;
    Normalize(): void;
    Length(): number;
    ToString(): string;
    static GetDelta(_p1: Point2D, _p2: Point2D): Vector2D;
    x: number;
    y: number;
}
