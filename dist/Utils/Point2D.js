"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point2D = void 0;
class Point2D {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }
    set X(_x) {
        this.x = _x;
    }
    set Y(_y) {
        this.y = _y;
    }
    Add(_vector) {
        this.x += _vector.X;
        this.y += _vector.Y;
        return this;
    }
    Subtract(_vector) {
        this.x -= _vector.X;
        this.y -= _vector.Y;
        return this;
    }
    Equals(_point) {
        return _point.X === this.X && _point.Y === this.Y;
    }
    ToString() {
        return `(${this.X},${this.Y})`;
    }
    static GetManhattanDist(_p1, _p2) {
        return Math.abs(_p1.X - _p2.X) + Math.abs(_p1.Y - _p2.Y);
    }
    static Copy(_point) {
        return new Point2D(_point.X, _point.Y);
    }
}
exports.Point2D = Point2D;
//# sourceMappingURL=Point2D.js.map