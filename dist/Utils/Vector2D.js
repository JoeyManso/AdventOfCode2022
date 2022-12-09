"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2D = void 0;
class Vector2D {
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
    Scale(_scalar) {
        this.x *= _scalar;
        this.y *= _scalar;
    }
    Normalize() {
        const length = this.Length();
        if (length > 0) {
            this.x /= length;
            this.y /= length;
        }
        else {
            this.x = this.y = 0;
        }
    }
    Length() {
        return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
    }
    ToString() {
        return `(${this.X},${this.Y})`;
    }
    static GetDelta(_p1, _p2) {
        return new Vector2D(_p2.X - _p1.X, _p2.Y - _p1.Y);
    }
}
exports.Vector2D = Vector2D;
//# sourceMappingURL=Vector2D.js.map