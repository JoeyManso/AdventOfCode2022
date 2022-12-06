"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day04 = void 0;
const Day_1 = require("./Day");
const Number_1 = require("../Utils/Number");
class ElfSectionsPair {
    constructor(_input) {
        this.elfRange1 = null;
        this.elfRange2 = null;
        const lineMatchArray = ElfSectionsPair.lineRegex.exec(_input);
        this.elfRange1 = [parseInt(lineMatchArray[1]), parseInt(lineMatchArray[2])];
        this.elfRange2 = [parseInt(lineMatchArray[3]), parseInt(lineMatchArray[4])];
    }
    getOverlappingSections() {
        let n1 = 0, n2 = 0;
        if ((0, Number_1.IsWithinInclusive)(this.elfRange1[0], this.elfRange2[0], this.elfRange2[1])) {
            n1 = this.elfRange1[0];
        }
        else if ((0, Number_1.IsWithinInclusive)(this.elfRange2[0], this.elfRange1[0], this.elfRange1[1])) {
            n1 = this.elfRange2[0];
        }
        if ((0, Number_1.IsWithinInclusive)(this.elfRange1[1], this.elfRange2[0], this.elfRange2[1])) {
            n2 = this.elfRange1[1];
        }
        else if ((0, Number_1.IsWithinInclusive)(this.elfRange2[1], this.elfRange1[0], this.elfRange1[1])) {
            n2 = this.elfRange2[1];
        }
        if (n1 || n2) {
            return 1 + (n2 - n1);
        }
        return 0;
    }
    hasFullOverlap() {
        return ((this.elfRange1[0] >= this.elfRange2[0] && this.elfRange1[1] <= this.elfRange2[1])
            || (this.elfRange2[0] >= this.elfRange1[0] && this.elfRange2[1] <= this.elfRange1[1]));
    }
}
ElfSectionsPair.lineRegex = new RegExp(/(\d+)-(\d+),(\d+)-(\d+)/);
class Day04 extends Day_1.Day {
    constructor() {
        super(...arguments);
        this.elfSectionsPairArray = [];
    }
    Run(_part) {
        if (!this.elfSectionsPairArray.length) {
            for (const input of this.inputArray) {
                this.elfSectionsPairArray.push(new ElfSectionsPair(input));
            }
        }
        let fullOverlapCount = 0, anyOverlapCount = 0;
        for (let i = 0; i < this.elfSectionsPairArray.length; ++i) {
            const elfSectionsPair = this.elfSectionsPairArray[i];
            if (elfSectionsPair.getOverlappingSections()) {
                ++anyOverlapCount;
                if (elfSectionsPair.hasFullOverlap()) {
                    //console.log(`Elves at index ${i} fully overlap`);
                    ++fullOverlapCount;
                }
            }
        }
        if (_part === Day_1.Part.Part01) {
            console.log(`Full Overlap Count: ${fullOverlapCount}`);
        }
        else if (_part === Day_1.Part.Part02) {
            console.log(`Overlapping Sections Count: ${anyOverlapCount}`);
        }
    }
}
exports.Day04 = Day04;
//# sourceMappingURL=Day04.js.map