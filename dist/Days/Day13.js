"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day13 = void 0;
const Day_1 = require("./Day");
const Number_1 = require("../Utils/Number");
const Object_1 = require("../Utils/Object");
class Day13 extends Day_1.Day {
    constructor() {
        super();
        this.signals = [];
        for (const input of this.inputArray) {
            if (input.length) {
                this.signals.push(JSON.parse(input));
            }
        }
    }
    Run(_part) {
        if (_part === Day_1.Part.Part01) {
            let compareSums = 0;
            for (let i = 0; i < this.signals.length; i += 2) {
                const pairNum = (i / 2) + 1;
                const compareResult = Day13.compare(this.signals[i], this.signals[i + 1]);
                if (compareResult < 0) {
                    compareSums += pairNum;
                }
            }
            console.log(`Compare Sums: ${compareSums}`);
        }
        else if (_part === Day_1.Part.Part02) {
            this.signals.push([[2]], [[6]]);
            this.signals.sort(Day13.compare);
            let decoderKey = 1;
            for (let i = 0; i < this.signals.length; i++) {
                const signal = this.signals[i];
                if ((0, Object_1.AreValuesEqual)(signal, [[2]]) || (0, Object_1.AreValuesEqual)(signal, [[6]])) {
                    decoderKey *= (i + 1);
                }
            }
            console.log(`Decoder Key: ${decoderKey}`);
        }
    }
    /**
     * @return -1 for left < right (correct), 1 for left > right and 0 for equal
     */
    static compare(_signalLeft, _signalRight) {
        if ((0, Number_1.IsValidNumber)(_signalLeft) && (0, Number_1.IsValidNumber)(_signalRight)) {
            return _signalLeft === _signalRight ? 0 : _signalLeft < _signalRight ? -1 : +1;
        }
        else if ((0, Number_1.IsValidNumber)(_signalLeft)) {
            return Day13.compare([_signalLeft], _signalRight);
        }
        else if ((0, Number_1.IsValidNumber)(_signalRight)) {
            return this.compare(_signalLeft, [_signalRight]);
        }
        else {
            const n = Math.min(_signalLeft.length, _signalRight.length);
            for (let i = 0; i < n; i++) {
                const c = Day13.compare(_signalLeft[i], _signalRight[i]);
                if (c !== 0)
                    return c;
            }
            return _signalLeft.length - _signalRight.length;
        }
    }
}
exports.Day13 = Day13;
//# sourceMappingURL=Day13.js.map