"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day08 = void 0;
const Day_1 = require("./Day");
const Number_1 = require("../Utils/Number");
class Day08 extends Day_1.Day {
    constructor() {
        super(...arguments);
        this.treeGrid = [];
    }
    Run(_part) {
        if (!this.treeGrid.length) {
            for (const input of this.inputArray) {
                const treeLine = [];
                for (const char of input) {
                    treeLine.push(parseInt(char));
                }
                this.treeGrid.push(treeLine);
            }
        }
        let answer = 0;
        for (let x = 0; x < this.treeGrid.length; ++x) {
            for (let y = 0; y < this.treeGrid.length; ++y) {
                if (_part === Day_1.Part.Part01) {
                    answer += this.IsVisible(x, y) ? 1 : 0;
                }
                else if (_part === Day_1.Part.Part02) {
                    answer = Math.max(this.GetScenicScore(x, y), answer);
                }
            }
        }
        console.log(answer);
    }
    IsVisible(_x, _y) {
        return (this.IsVisibleLine(_x, _y, -1, 0) // Left
            || this.IsVisibleLine(_x, _y, 1, 0) // Right
            || this.IsVisibleLine(_x, _y, 0, -1) // Up
            || this.IsVisibleLine(_x, _y, 0, 1) // Down
        );
    }
    IsVisibleLine(_x, _y, _deltaX, _deltaY) {
        const treeHeight = this.GetHeight(_x, _y);
        while ((0, Number_1.IsWithinInclusive)(_x, 0, this.treeGrid.length) && (0, Number_1.IsWithinInclusive)(_y, 0, this.treeGrid.length)) {
            _x += _deltaX;
            _y += _deltaY;
            if (treeHeight <= this.GetHeight(_x, _y)) {
                return false;
            }
        }
        return true;
    }
    GetScenicScore(_x, _y) {
        let visibility = 1;
        visibility *= this.GetScenicScoreLine(_x, _y, -1, 0); // Left
        visibility *= this.GetScenicScoreLine(_x, _y, 1, 0); // Right
        visibility *= this.GetScenicScoreLine(_x, _y, 0, -1); // Up
        visibility *= this.GetScenicScoreLine(_x, _y, 0, 1); // Down
        return visibility;
    }
    GetScenicScoreLine(_x, _y, _deltaX, _deltaY) {
        let visibilityLine = 0;
        const treeHeight = this.GetHeight(_x, _y);
        while ((0, Number_1.IsWithinInclusive)(_x, 0, this.treeGrid.length) && (0, Number_1.IsWithinInclusive)(_y, 0, this.treeGrid.length)) {
            _x += _deltaX;
            _y += _deltaY;
            const otherTreeHeight = this.GetHeight(_x, _y);
            if (otherTreeHeight >= 0) {
                ++visibilityLine;
            }
            if (otherTreeHeight < 0 || treeHeight <= otherTreeHeight) {
                break;
            }
        }
        return visibilityLine;
    }
    GetHeight(_x, _y) {
        if ((0, Number_1.IsWithinInclusive)(_x, 0, this.treeGrid.length - 1) && (0, Number_1.IsWithinInclusive)(_y, 0, this.treeGrid[_x].length - 1)) {
            return this.treeGrid[_x][_y];
        }
        return -1;
    }
}
exports.Day08 = Day08;
//# sourceMappingURL=Day08.js.map