import {Day, Part} from "./Day";

export class Day05 extends Day {
    public Run(_part: Part) {
        this.crateStacksMap = new Map<number, string[]>();
        for (const input of this.inputArray) {
            const commandMatchArray: RegExpMatchArray = Day05.regexCommand.exec(input);
            if (commandMatchArray) {
                let moveCount: number = parseInt(commandMatchArray[1]);
                const stackSrc: string[] = this.crateStacksMap.get(parseInt(commandMatchArray[2]));
                const stackDst: string[] = this.crateStacksMap.get(parseInt(commandMatchArray[3]));

                if (_part === Part.Part01) {
                    while (moveCount > 0) {
                        stackDst.unshift(...stackSrc.splice(0, 1));
                        --moveCount;
                    }
                }
                else if (_part === Part.Part02) {
                    stackDst.unshift(...stackSrc.splice(0, moveCount));
                }
            }
            else {
                let crateId = 1;
                for (let i = 0; i < input.length; i+=4, ++crateId) {
                    if (!this.crateStacksMap.has(crateId)) {
                        this.crateStacksMap.set(crateId, []);
                    }
                    const lineMatchArray: RegExpMatchArray = Day05.regexStack.exec(input.substring(i, i + 4));
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

    private crateStacksMap: Map<number, string[]> = null;
    private static regexStack = new RegExp(/\[([A-Z])]/);
    private static regexCommand = new RegExp(/move (\d+) from (\d+) to (\d+)/);
}