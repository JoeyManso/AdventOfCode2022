"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day01 = void 0;
const Day_1 = require("./Day");
class Elf {
    constructor() {
        this.caloriesArray = [];
    }
    GetCaloriesSum() {
        let caloriesSum = 0;
        for (const calories of this.caloriesArray) {
            caloriesSum += calories;
        }
        return caloriesSum;
    }
}
class Day01 extends Day_1.Day {
    constructor() {
        super(...arguments);
        this.calorieSums = null;
    }
    Run(_part) {
        const elves = [
            new Elf(),
        ];
        if (!this.calorieSums) {
            for (const inputLine of this.inputArray) {
                const calories = Number.parseInt(inputLine);
                if (isNaN(calories)) {
                    elves.push(new Elf());
                }
                else {
                    const elf = elves[elves.length - 1];
                    elf.caloriesArray.push(calories);
                }
            }
            this.calorieSums = [];
            for (const elf of elves) {
                this.calorieSums.push(elf.GetCaloriesSum());
            }
            this.calorieSums.sort((a, b) => a < b ? 1 : -1);
        }
        const sumCount = _part === Day_1.Part.Part01 ? 1 : 3;
        let calorieSumsMax = 0;
        for (let i = 0; i < sumCount; ++i) {
            calorieSumsMax += this.calorieSums[i];
        }
        console.log(`Most Calories Sum: ${calorieSumsMax}`);
    }
}
exports.Day01 = Day01;
//# sourceMappingURL=Day01.js.map