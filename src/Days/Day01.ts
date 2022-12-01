import {Day, Part} from "./Day";

class Elf {
    public caloriesArray: number[] = [];

    public GetCaloriesSum(): number {
        let caloriesSum = 0;
        for (const calories of this.caloriesArray) {
            caloriesSum += calories;
        }
        return caloriesSum;
    }
}

export class Day01 extends Day {
    public Run(_part: Part) {
        const elves: Elf[] = [
            new Elf(),
        ];

        if (!this.calorieSums) {
            for (const inputLine of this.inputArray) {
                const calories: number = Number.parseInt(inputLine);
                if (isNaN(calories)) {
                    elves.push(new Elf());
                }
                else {
                    const elf: Elf = elves[elves.length - 1];
                    elf.caloriesArray.push(calories);
                }
            }

            this.calorieSums = [];
            for (const elf of elves) {
                this.calorieSums.push(elf.GetCaloriesSum());
            }
            this.calorieSums.sort((a, b) => a < b ? 1 : -1);
        }

        const sumCount = _part === Part.Part01 ? 1 : 3;
        let calorieSumsMax = 0;
        for (let i = 0; i < sumCount; ++i) {
            calorieSumsMax += this.calorieSums[i];
        }
        console.log(`Most Calories Sum: ${calorieSumsMax}`)
    }

    private calorieSums: number[] = null;
}