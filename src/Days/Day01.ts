import {Day, Part} from "./Day";

export class Day01 extends Day {
    public Run(_part: Part) {
        if (!this.calorieSums) {
            this.calorieSums = [0];
            for (const inputLine of this.inputArray) {
                const calories: number = Number.parseInt(inputLine);
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
        const sumCount = _part === Part.Part01 ? 1 : 3;
        for (let i = 0; i < sumCount; ++i) {
            calorieSumsMax += this.calorieSums[i];
        }
        console.log(`Most Calories Sum: ${calorieSumsMax}`)
    }

    private calorieSums: number[] = null;
}