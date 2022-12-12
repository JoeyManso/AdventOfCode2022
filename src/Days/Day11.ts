import {Day, Part} from "./Day";

class Monkey {
    constructor(_inputArray: string[]) {
        for (const input of _inputArray) {
            if (input.startsWith(Monkey.startingItems)) {
                let startingItemsStr = input.substring(Monkey.startingItems.length);
                while (startingItemsStr.length) {
                    const startingItemsMatch: RegExpMatchArray = Monkey.regexNumber.exec(startingItemsStr)
                    if (startingItemsMatch) {
                        this.items.push(parseInt(startingItemsMatch[1]));
                        startingItemsStr = startingItemsStr.substring(startingItemsMatch.index + startingItemsMatch.length);
                    }
                }
            }
            else {
                const matchOperation: RegExpMatchArray = Monkey.regexOperation.exec(input);
                const matchTest: RegExpMatchArray = Monkey.regexTest.exec(input);
                const matchTestIf: RegExpMatchArray = Monkey.regexTestIf.exec(input);
                if (matchOperation) {
                    this.inspectOperation = (_item: number): number => {
                        const operandA: number = matchOperation[1] === 'old' ? _item : parseInt(matchOperation[1]);
                        const operandB: number = matchOperation[3] === 'old' ? _item : parseInt(matchOperation[3]);
                        switch (matchOperation[2]) {
                            case '+':
                                return operandA + operandB;
                            case '*':
                                return operandA * operandB;
                            default:
                                throw new Error(`Unhandled operand ${matchOperation[2]}`);
                        }
                    }
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
                            this.onFalseMonkey = parseInt(matchTestIf[2])
                            break;
                    }
                }
            }
        }
    }

    get InspectionCount() {
        return this.inspectionCount;
    }

    Catch(_item: number): void {
        this.items.push(_item);
    }

    InspectAndThrow(_monkeyMap: Map<number, Monkey>, _part: Part): void {
        while (this.items.length) {
            // Inspect
            this.items[0] = this.inspectOperation(this.items[0]);
            ++this.inspectionCount;
            // Get Bored
            if (_part === Part.Part01) {
                this.items[0] = Math.floor(this.items[0] / 3);
            }
            else {
                this.items[0] = this.items[0] % Monkey.GetModulo(_monkeyMap);
            }
            // Throw
            const item: number = this.items.shift();
            const targetMonkey: number = this.GetTargetMonkey(item);
            _monkeyMap.get(targetMonkey).Catch(item);
        }
    }

    private GetTargetMonkey(_item: number): number {
        const testRemainder = _item % this.divisibleBy;
        return testRemainder == 0 ? this.onTrueMonkey : this.onFalseMonkey;
    }

    private static GetModulo(_monkeyMap: Map<number, Monkey>): number {
        let modulo = 1;
        for (const monkey of _monkeyMap.values()) {
            modulo *= monkey.divisibleBy;
        }
        return modulo;
    }

    private inspectionCount: number = 0;
    private readonly items: number[] = [];
    private readonly inspectOperation: (_item: number) => number = null;
    private readonly divisibleBy: number;
    private readonly onTrueMonkey: number;
    private readonly onFalseMonkey: number;
    private static startingItems = '  Starting items: ';
    private static regexNumber: RegExp = new RegExp(/(\d+)/);
    private static regexOperation: RegExp = new RegExp(/\s+Operation: new = (.+) (.) (.+)/)
    private static regexTest: RegExp = new RegExp(/\s+Test: divisible by (\d+)/)
    private static regexTestIf: RegExp = new RegExp(/\s+If (\w+): throw to monkey (\d+)/)
}

export class Day11 extends Day {
    public Run(_part: Part) {
        const monkeyMap: Map<number, Monkey> = new Map<number, Monkey>();
        for (let i = 0; i < this.inputArray.length; i+=7) {
            const matchMonkey: RegExpMatchArray = Day11.regexMonkey.exec(this.inputArray[i]);
            if (matchMonkey) {
                monkeyMap.set(parseInt(matchMonkey[1]), new Monkey(this.inputArray.slice(i + 1, i + 6)));
            }
        }

        const maxRounds = _part === Part.Part01 ? 20 : 10000;
        for (let round = 1; round <= maxRounds; ++round) {
            for (const monkey of monkeyMap.values()) {
                monkey.InspectAndThrow(monkeyMap, _part);
            }
        }

        const inspectionCounts: number[] = [];
        for (const [monkeyNum, monkey] of monkeyMap) {
            console.log(`Monkey ${monkeyNum} inspected items ${monkey.InspectionCount} times.`)
            inspectionCounts.push(monkey.InspectionCount);
        }
        inspectionCounts.sort((a, b) => a > b ? -1 : 1);
        console.log(`Monkey Business: ${inspectionCounts[0] * inspectionCounts[1]}`);
    }

    private static regexMonkey: RegExp = new RegExp(/Monkey (\d+):/)
}