"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day11 = void 0;
const Day_1 = require("./Day");
class Monkey {
    constructor(_inputArray) {
        this.inspectionCount = 0;
        this.items = [];
        this.inspectOperation = null;
        for (const input of _inputArray) {
            if (input.startsWith(Monkey.startingItems)) {
                let startingItemsStr = input.substring(Monkey.startingItems.length);
                while (startingItemsStr.length) {
                    const startingItemsMatch = Monkey.regexNumber.exec(startingItemsStr);
                    if (startingItemsMatch) {
                        this.items.push(parseInt(startingItemsMatch[1]));
                        startingItemsStr = startingItemsStr.substring(startingItemsMatch.index + startingItemsMatch.length);
                    }
                }
            }
            else {
                const matchOperation = Monkey.regexOperation.exec(input);
                const matchTest = Monkey.regexTest.exec(input);
                const matchTestIf = Monkey.regexTestIf.exec(input);
                if (matchOperation) {
                    this.inspectOperation = (_item) => {
                        const operandA = matchOperation[1] === 'old' ? _item : parseInt(matchOperation[1]);
                        const operandB = matchOperation[3] === 'old' ? _item : parseInt(matchOperation[3]);
                        switch (matchOperation[2]) {
                            case '+':
                                return operandA + operandB;
                            case '*':
                                return operandA * operandB;
                            default:
                                throw new Error(`Unhandled operand ${matchOperation[2]}`);
                        }
                    };
                }
                else if (matchTest) {
                    this.divisibleBy = parseInt(matchTest[1]);
                }
                else if (matchTestIf) {
                    switch (matchTestIf[1]) {
                        case 'true':
                            this.onTrueMonkey = parseInt(matchTestIf[2]);
                            break;
                        case 'false':
                            this.onFalseMonkey = parseInt(matchTestIf[2]);
                            break;
                    }
                }
            }
        }
    }
    get InspectionCount() {
        return this.inspectionCount;
    }
    Catch(_item) {
        this.items.push(_item);
    }
    InspectAndThrow(_monkeyMap, _part) {
        while (this.items.length) {
            // Inspect
            this.items[0] = this.inspectOperation(this.items[0]);
            ++this.inspectionCount;
            // Get Bored
            if (_part === Day_1.Part.Part01) {
                this.items[0] = Math.floor(this.items[0] / 3);
            }
            else {
                this.items[0] = this.items[0] % Monkey.GetModulo(_monkeyMap);
            }
            // Throw
            const item = this.items.shift();
            const targetMonkey = this.GetTargetMonkey(item);
            _monkeyMap.get(targetMonkey).Catch(item);
        }
    }
    GetTargetMonkey(_item) {
        const testRemainder = _item % this.divisibleBy;
        return testRemainder == 0 ? this.onTrueMonkey : this.onFalseMonkey;
    }
    static GetModulo(_monkeyMap) {
        let modulo = 1;
        for (const monkey of _monkeyMap.values()) {
            modulo *= monkey.divisibleBy;
        }
        return modulo;
    }
}
Monkey.startingItems = '  Starting items: ';
Monkey.regexNumber = new RegExp(/(\d+)/);
Monkey.regexOperation = new RegExp(/\s+Operation: new = (.+) (.) (.+)/);
Monkey.regexTest = new RegExp(/\s+Test: divisible by (\d+)/);
Monkey.regexTestIf = new RegExp(/\s+If (\w+): throw to monkey (\d+)/);
class Day11 extends Day_1.Day {
    Run(_part) {
        const monkeyMap = new Map();
        for (let i = 0; i < this.inputArray.length; i += 7) {
            const matchMonkey = Day11.regexMonkey.exec(this.inputArray[i]);
            if (matchMonkey) {
                monkeyMap.set(parseInt(matchMonkey[1]), new Monkey(this.inputArray.slice(i + 1, i + 6)));
            }
        }
        const maxRounds = _part === Day_1.Part.Part01 ? 20 : 10000;
        for (let round = 1; round <= maxRounds; ++round) {
            for (const monkey of monkeyMap.values()) {
                monkey.InspectAndThrow(monkeyMap, _part);
            }
        }
        const inspectionCounts = [];
        for (const [monkeyNum, monkey] of monkeyMap) {
            console.log(`Monkey ${monkeyNum} inspected items ${monkey.InspectionCount} times.`);
            inspectionCounts.push(monkey.InspectionCount);
        }
        inspectionCounts.sort((a, b) => a > b ? -1 : 1);
        console.log(`Monkey Business: ${inspectionCounts[0] * inspectionCounts[1]}`);
    }
}
exports.Day11 = Day11;
Day11.regexMonkey = new RegExp(/Monkey (\d+):/);
//# sourceMappingURL=Day11.js.map