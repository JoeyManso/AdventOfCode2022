import { Vector2D } from "./Vector2D";
export declare class Point2D {
    constructor(_x: number, _y: number);
    get X(): number;
    get Y(): number;
    set X(_x: number);
    set Y(_y: number);
    Add(_vector: Vector2D): this;
    Subtract(_vector: Vector2D): this;
    Equals(_point: Point2D): boolean;
    ToString(): string;
    static GetManhattanDist(_p1: Point2D, _p2: Point2D): number;
    static Copy(_point: Point2D): Point2D;
    private x;
    private y;
}
