import {Vector2D} from "./Vector2D";

export class Point2D {
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

    set X(_x: number) {
        this.x = _x;
    }

    set Y(_y: number) {
        this.y = _y;
    }

    Add(_vector: Vector2D): this {
        this.x += _vector.X;
        this.y += _vector.Y;
        return this;
    }

    Subtract(_vector: Vector2D): this {
        this.x -= _vector.X;
        this.y -= _vector.Y;
        return this;
    }

    Equals(_point: Point2D): boolean {
        return _point.X === this.X && _point.Y === this.Y;
    }

    ToString(): string {
        return `(${this.X},${this.Y})`;
    }

    static Copy(_point: Point2D): Point2D {
        return new Point2D(_point.X, _point.Y);
    }

    private x: number;
    private y: number;
}