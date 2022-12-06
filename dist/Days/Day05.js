"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day05 = void 0;
const Day_1 = require("./Day");
class Day05 extends Day_1.Day {
    constructor() {
        super(...arguments);
        this.crateStacksMap = null;
    }
    Run(_part) {
        this.crateStacksMap = new Map();
        for (const input of this.inputArray) {
            const commandMatchArray = Day05.regexCommand.exec(input);
            if (commandMatchArray) {
                let moveCount = parseInt(commandMatchArray[1]);
                const stackSrc = this.crateStacksMap.get(parseInt(commandMatchArray[2]));
                const stackDst = this.crateStacksMap.get(parseInt(commandMatchArray[3]));
                if (_part === Day_1.Part.Part01) {
                    while (moveCount > 0) {
                        stackDst.unshift(...stackSrc.splice(0, 1));
                        --moveCount;
                    }
                }
                else if (_part === Day_1.Part.Part02) {
                    stackDst.unshift(...stackSrc.splice(0, moveCount));
                }
            }
            else {
                let crateId = 1;
                for (let i = 0; i < input.length; i += 4, ++crateId) {
                    if (!this.crateStacksMap.has(crateId)) {
                        this.crateStacksMap.set(crateId, []);
                    }
                    const lineMatchArray = Day05.regexStack.exec(input.substring(i, i + 4));
                    if (lineMatchArray) {
                        this.crateStacksMap.get(crateId).push(lineMatchArray[1]);
                    }
                }
            }
        }
        let topCrates = '';
        for (const crateStack of this.crateStacksMap.values()) {
            topCrates += (crateStack[0]);
        }
        console.log(`Top Crates: ${topCrates}`);
    }
}
exports.Day05 = Day05;
Day05.regexStack = new RegExp(/\[([A-Z])]/);
Day05.regexCommand = new RegExp(/move (\d+) from (\d+) to (\d+)/);
//# sourceMappingURL=Day05.js.map