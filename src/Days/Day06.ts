import {Day, Part} from "./Day";

export class Day06 extends Day {
    public Run(_part: Part) {
        const uniqueMarkerCharacters = _part === Part.Part01 ? 4 : 14;
        const input: string = this.inputArray[0];
        for (let i = uniqueMarkerCharacters; i < input.length; ++i) {
            const uniqueChars: Set<string> = new Set<string>();
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