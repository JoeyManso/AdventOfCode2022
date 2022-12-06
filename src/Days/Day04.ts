import {Day, Part} from "./Day";
import {IsWithinInclusive} from "../Utils/Number";

class ElfSectionsPair {
    constructor(_input: string) {
        const lineMatchArray: RegExpMatchArray = ElfSectionsPair.lineRegex.exec(_input);
        this.elfRange1 = [parseInt(lineMatchArray[1]), parseInt(lineMatchArray[2])];
        this.elfRange2 = [parseInt(lineMatchArray[3]), parseInt(lineMatchArray[4])];
    }
    elfRange1: number[] = null;
    elfRange2: number[] = null;

    getOverlappingSections(): number {
        let n1 = 0, n2 = 0;
        if (IsWithinInclusive(this.elfRange1[0], this.elfRange2[0], this.elfRange2[1])) {
            n1 = this.elfRange1[0];
        }
        else if (IsWithinInclusive(this.elfRange2[0], this.elfRange1[0], this.elfRange1[1])) {
            n1 = this.elfRange2[0];
        }
        if (IsWithinInclusive(this.elfRange1[1], this.elfRange2[0], this.elfRange2[1])) {
            n2 = this.elfRange1[1];
        }
        else if (IsWithinInclusive(this.elfRange2[1], this.elfRange1[0], this.elfRange1[1])) {
            n2 = this.elfRange2[1];
        }
        if (n1 || n2) {
            return 1 + (n2 - n1);
        }
        return 0;
    }
    hasFullOverlap(): boolean {
        return (
            (this.elfRange1[0] >= this.elfRange2[0] && this.elfRange1[1] <= this.elfRange2[1])
            || (this.elfRange2[0] >= this.elfRange1[0] && this.elfRange2[1] <= this.elfRange1[1])
        )
    }

    private static lineRegex = new RegExp(/(\d+)-(\d+),(\d+)-(\d+)/);
}
export class Day04 extends Day {
    public Run(_part: Part) {
        if (!this.elfSectionsPairArray.length) {
            for (const input of this.inputArray) {
                this.elfSectionsPairArray.push(new ElfSectionsPair(input));
            }
        }

        let fullOverlapCount = 0, anyOverlapCount = 0;
        for (let i = 0; i < this.elfSectionsPairArray.length; ++i) {
            const elfSectionsPair: ElfSectionsPair = this.elfSectionsPairArray[i];
            if (elfSectionsPair.getOverlappingSections()) {
                ++anyOverlapCount;
                if (elfSectionsPair.hasFullOverlap()) {
                    //console.log(`Elves at index ${i} fully overlap`);
                    ++fullOverlapCount;
                }
            }
        }

        if (_part === Part.Part01) {
            console.log(`Full Overlap Count: ${fullOverlapCount}`);
        }
        else if (_part === Part.Part02) {
            console.log(`Overlapping Sections Count: ${anyOverlapCount}`);
        }
    }

    private elfSectionsPairArray: ElfSectionsPair[] = [];
}