"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day10 = void 0;
const Day_1 = require("./Day");
const Number_1 = require("../Utils/Number");
class Day10 extends Day_1.Day {
    constructor() {
        super(...arguments);
        this.signalStrengthSum = 0;
        this.pixelRows = [''];
    }
    Run(_part) {
        if (!this.signalStrengthSum) {
            let valueX = 1;
            let nextSignalStrengthMilestone = 20;
            let cycle = 1;
            for (const input of this.inputArray) {
                let deltaCycles = 0, deltaX = 0;
                const matchArrayAddX = Day10.regexAddX.exec(input);
                if (input === Day10.instructionNoop) {
                    deltaCycles = 1;
                }
                else if (matchArrayAddX) {
                    deltaX = parseInt(matchArrayAddX[1]);
                    deltaCycles = 2;
                }
                while (deltaCycles > 0) {
                    if (cycle === nextSignalStrengthMilestone) {
                        this.signalStrengthSum += cycle * valueX;
                        nextSignalStrengthMilestone += 40;
                    }
                    let pixelRowIdx = this.pixelRows.length - 1;
                    if (this.pixelRows[pixelRowIdx].length === 40) {
                        pixelRowIdx = this.pixelRows.push('') - 1;
                    }
                    const pixelColIdx = this.pixelRows[pixelRowIdx].length;
                    this.pixelRows[pixelRowIdx] += (0, Number_1.IsWithinInclusive)(valueX, pixelColIdx - 1, pixelColIdx + 1) ? '#' : '.';
                    ++cycle;
                    --deltaCycles;
                }
                valueX += deltaX;
            }
        }
        if (_part === Day_1.Part.Part01) {
            console.log(`Signal Strength Sum: ${this.signalStrengthSum}`);
        }
        else if (_part === Day_1.Part.Part02) {
            for (const pixelRow of this.pixelRows) {
                console.log(pixelRow);
            }
        }
    }
}
exports.Day10 = Day10;
Day10.instructionNoop = 'noop';
Day10.regexAddX = new RegExp(/addx (-?\d+)/);
//# sourceMappingURL=Day10.js.map