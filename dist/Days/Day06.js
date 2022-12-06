"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day06 = void 0;
const Day_1 = require("./Day");
class Day06 extends Day_1.Day {
    Run(_part) {
        const uniqueMarkerCharacters = _part === Day_1.Part.Part01 ? 4 : 14;
        const input = this.inputArray[0];
        for (let i = uniqueMarkerCharacters; i < input.length; ++i) {
            const uniqueChars = new Set();
            for (let j = i - uniqueMarkerCharacters; j < i; ++j) {
                uniqueChars.add(input[j]);
            }
            if (uniqueChars.size == uniqueMarkerCharacters) {
                console.log(`Starting Marker Detected at Index ${i}`);
                break;
            }
        }
    }
}
exports.Day06 = Day06;
//# sourceMappingURL=Day06.js.map