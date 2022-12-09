import {Point2D} from "./Point2D";

export class Vector2D {
    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    get X() {
        return this.x;
    }

    get Y() {
        return this.y;
    }

    Scale(_scalar: number): void {
        this.x *= _scalar;
        this.y *= _scalar;
    }

    Normalize(): void {
        const length: number = this.Length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
        else {
            this.x = this.y = 0;
        }
    }

    Length(): number {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
    }

    ToString(): string {
        return `(${this.X},${this.Y})`;
    }

    static GetDelta(_p1: Point2D, _p2: Point2D): Vector2D {
        return new Vector2D(_p2.X - _p1.X, _p2.Y - _p1.Y);
    }

    x: number;
    y: number;
}