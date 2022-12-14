import {Day, Part} from "./Day";
import {IsValidNumber} from "../Utils/Number";
import {AreValuesEqual} from "../Utils/Object";

export class Day13 extends Day {
    constructor() {
        super();
        for (const input of this.inputArray) {
            if (input.length) {
                this.signals.push(JSON.parse(input));
            }
        }
    }
    public Run(_part: Part) {
        if (_part === Part.Part01) {
            let compareSums: number = 0;
            for (let i = 0; i < this.signals.length; i+=2) {
                const pairNum: number = (i / 2) + 1;
                const compareResult: number = Day13.compare(this.signals[i], this.signals[i+1]);
                if (compareResult < 0) {
                    compareSums += pairNum;
                }
            }
            console.log(`Compare Sums: ${compareSums}`);
        }
        else if (_part === Part.Part02) {
            this.signals.push([[2]], [[6]]);
            this.signals.sort(Day13.compare);
            let decoderKey = 1;
            for (let i = 0; i < this.signals.length; i++) {
                const signal: object = this.signals[i];
                if (AreValuesEqual(signal, [[2]]) || AreValuesEqual(signal, [[6]])) {
                    decoderKey *= (i+1);
                }
            }
            console.log(`Decoder Key: ${decoderKey}`);
        }
    }

    /**
     * @return -1 for left < right (correct), 1 for left > right and 0 for equal
     */
    private static compare(_signalLeft: any, _signalRight: any): number {
        if (IsValidNumber(_signalLeft) && IsValidNumber(_signalRight)) {
            return _signalLeft === _signalRight ? 0 : _signalLeft < _signalRight ? -1 : +1;
        } else if (IsValidNumber(_signalLeft)) {
            return Day13.compare([_signalLeft], _signalRight);
        } else if (IsValidNumber(_signalRight)) {
            return this.compare(_signalLeft, [_signalRight]);
        } else {
            const n = Math.min(_signalLeft.length, _signalRight.length);
            for (let i = 0; i < n; i++) {
                const c = Day13.compare(_signalLeft[i], _signalRight[i]);
                if (c !== 0) return c;
            }
            return _signalLeft.length - _signalRight.length;
        }
    }

    private readonly signals: object[] = [];
}