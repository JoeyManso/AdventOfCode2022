import {Day, Part} from "./Day";

export class Day03 extends Day {
    public Run(_part: Part) {
        let prioritySum = 0;
        if (_part === Part.Part01) {
            for (const rucksack of this.inputArray) {
                const midpoint: number = rucksack.length / 2;
                const compartment1: string = rucksack.substring(0, midpoint);
                const compartment2: string = rucksack.substring(midpoint, rucksack.length);
                for (const char of compartment1) {
                    if (compartment2.includes(char)) {
                        prioritySum += this.GetCharValue(char);
                        break;
                    }
                }
            }
        }
        else if (_part === Part.Part02) {
            for (let i = 0; i < this.inputArray.length; i+=3) {
                for (const char of this.inputArray[i]) {
                    if (this.inputArray[i+1].includes(char) && this.inputArray[i+2].includes(char)) {
                        prioritySum += this.GetCharValue(char);
                        break;
                    }
                }
            }
        }
        console.log(`Sum of priorities: ${prioritySum}`);
    }

    private GetCharValue(_char: string): number {
        if (_char.toUpperCase() == _char) {
            return 27 + (_char.charCodeAt(0) - 'A'.charCodeAt(0))
        }
        return 1 + (_char.charCodeAt(0) - 'a'.charCodeAt(0));
    }
}