"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day03 = void 0;
const Day_1 = require("./Day");
class Day03 extends Day_1.Day {
    Run(_part) {
        let prioritySum = 0;
        if (_part === Day_1.Part.Part01) {
            for (const rucksack of this.inputArray) {
                const midpoint = rucksack.length / 2;
                const compartment1 = rucksack.substring(0, midpoint);
                const compartment2 = rucksack.substring(midpoint, rucksack.length);
                for (const char of compartment1) {
                    if (compartment2.includes(char)) {
                        prioritySum += this.GetCharValue(char);
                        break;
                    }
                }
            }
        }
        else if (_part === Day_1.Part.Part02) {
            for (let i = 0; i < this.inputArray.length; i += 3) {
                for (const char of this.inputArray[i]) {
                    if (this.inputArray[i + 1].includes(char) && this.inputArray[i + 2].includes(char)) {
                        prioritySum += this.GetCharValue(char);
                        break;
                    }
                }
            }
        }
        console.log(`Sum of priorities: ${prioritySum}`);
    }
    GetCharValue(_char) {
        if (_char.toUpperCase() == _char) {
            return 27 + (_char.charCodeAt(0) - 'A'.charCodeAt(0));
        }
        return 1 + (_char.charCodeAt(0) - 'a'.charCodeAt(0));
    }
}
exports.Day03 = Day03;
//# sourceMappingURL=Day03.js.map