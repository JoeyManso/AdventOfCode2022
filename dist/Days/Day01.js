"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day01 = void 0;
const Day_1 = require("./Day");
class Day01 extends Day_1.Day {
    constructor() {
        super(...arguments);
        this.calorieSums = null;
    }
    Run(_part) {
        if (!this.calorieSums) {
            this.calorieSums = [0];
            for (const inputLine of this.inputArray) {
                const calories = Number.parseInt(inputLine);
                if (isNaN(calories)) {
                    this.calorieSums.push(0);
                }
                else {
                    this.calorieSums[this.calorieSums.length - 1] += calories;
                }
            }
            this.calorieSums.sort((a, b) => a > b ? -1 : 1);
        }
        let calorieSumsMax = 0;
        const sumCount = _part === Day_1.Part.Part01 ? 1 : 3;
        for (let i = 0; i < sumCount; ++i) {
            calorieSumsMax += this.calorieSums[i];
        }
        console.log(`Most Calories Sum: ${calorieSumsMax}`);
    }
}
exports.Day01 = Day01;
//# sourceMappingURL=Day01.js.map