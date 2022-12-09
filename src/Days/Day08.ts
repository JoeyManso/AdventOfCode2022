import {Day, Part} from "./Day";
import {IsWithinInclusive} from "../Utils/Number";

export class Day08 extends Day {
    public Run(_part: Part) {
        if (!this.treeGrid.length) {
            for (const input of this.inputArray) {
                const treeLine: number[] = [];
                for (const char of input) {
                    treeLine.push(parseInt(char));
                }
                this.treeGrid.push(treeLine);
            }
        }

        let answer = 0;
        for (let x = 0; x < this.treeGrid.length; ++x) {
            for (let y = 0; y < this.treeGrid.length; ++y) {
                if (_part === Part.Part01) {
                    answer += this.IsVisible(x, y) ? 1 : 0;
                }
                else if (_part === Part.Part02) {
                    answer = Math.max(this.GetScenicScore(x, y), answer);
                }
            }
        }
        console.log(answer);
    }

    private IsVisible(_x: number, _y: number): boolean {
        return (
            this.IsVisibleLine(_x, _y, -1, 0)       // Left
            || this.IsVisibleLine(_x, _y, 1, 0)     // Right
            || this.IsVisibleLine(_x, _y, 0, -1)    // Up
            || this.IsVisibleLine(_x, _y, 0, 1)     // Down
        );
    }

    private IsVisibleLine(_x: number, _y: number, _deltaX: number, _deltaY: number): boolean {
        const treeHeight: number = this.GetHeight(_x, _y);
        while (IsWithinInclusive(_x, 0, this.treeGrid.length) && IsWithinInclusive(_y, 0, this.treeGrid.length)) {
            _x += _deltaX;
            _y += _deltaY;
            if (treeHeight <= this.GetHeight(_x, _y)) {
                return false;
            }
        }
        return true;
    }

    private GetScenicScore(_x: number, _y: number): number {
        let visibility = 1;
        visibility *= this.GetScenicScoreLine(_x, _y, -1, 0);       // Left
        visibility *= this.GetScenicScoreLine(_x, _y, 1, 0);        // Right
        visibility *=  this.GetScenicScoreLine(_x, _y, 0, -1);      // Up
        visibility *= this.GetScenicScoreLine(_x, _y, 0, 1);        // Down
        return visibility;
    }

    private GetScenicScoreLine(_x: number, _y: number, _deltaX: number, _deltaY: number): number {
        let visibilityLine = 0;
        const treeHeight: number = this.GetHeight(_x, _y);
        while (IsWithinInclusive(_x, 0, this.treeGrid.length) && IsWithinInclusive(_y, 0, this.treeGrid.length)) {
            _x += _deltaX;
            _y += _deltaY;
            const otherTreeHeight = this.GetHeight(_x, _y)
            if (otherTreeHeight >= 0) {
                ++visibilityLine;
            }
            if (otherTreeHeight < 0 || treeHeight <= otherTreeHeight) {
                break;
            }
        }
        return visibilityLine;
    }


    private GetHeight(_x: number, _y: number): number {
        if (IsWithinInclusive(_x, 0, this.treeGrid.length - 1) && IsWithinInclusive(_y, 0, this.treeGrid[_x].length - 1)) {
            return this.treeGrid[_x][_y];
        }
        return -1;
    }

    private treeGrid: number[][] = [];
}