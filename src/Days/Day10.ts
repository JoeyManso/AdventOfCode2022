import {Day, Part} from "./Day";
import {IsWithinInclusive} from "../Utils/Number";

export class Day10 extends Day {
    public Run(_part: Part) {
        if (!this.signalStrengthSum) {
            let valueX = 1;
            let nextSignalStrengthMilestone = 20;
            let cycle = 1;
            for (const input of this.inputArray) {
                let deltaCycles = 0, deltaX = 0;
                const matchArrayAddX: RegExpMatchArray = Day10.regexAddX.exec(input);
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

                    let pixelRowIdx: number = this.pixelRows.length - 1;
                    if (this.pixelRows[pixelRowIdx].length === 40) {
                        pixelRowIdx = this.pixelRows.push('') - 1;
                    }
                    const pixelColIdx = this.pixelRows[pixelRowIdx].length;
                    this.pixelRows[pixelRowIdx] += IsWithinInclusive(valueX, pixelColIdx - 1, pixelColIdx + 1) ? '#' : '.';

                    ++cycle;
                    --deltaCycles;
                }
                valueX += deltaX;
            }
        }


        if (_part === Part.Part01) {
            console.log(`Signal Strength Sum: ${this.signalStrengthSum}`);
        }
        else if (_part === Part.Part02) {
            for (const pixelRow of this.pixelRows) {
                console.log(pixelRow);
            }
        }
    }

    private signalStrengthSum = 0;
    private pixelRows: string[] = [''];
    private static instructionNoop = 'noop';
    private static regexAddX: RegExp = new RegExp(/addx (-?\d+)/);
}