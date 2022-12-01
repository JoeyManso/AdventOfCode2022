"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = exports.Part = void 0;
const path = require('path');
const fs = require('fs');
var Part;
(function (Part) {
    Part["Part01"] = "Part01";
    Part["Part02"] = "Part02";
})(Part = exports.Part || (exports.Part = {}));
class Day {
    constructor() {
        this.inputArray = null;
        const filepath = `${path.resolve('..\\input')}\\${this.constructor.name}.txt`;
        if (!fs.existsSync(filepath)) {
            throw new Error(`"${JSON.stringify(filepath)}" does not exist`);
        }
        this.inputArray = Buffer.from(fs.readFileSync(filepath)).toString().split('\r\n');
    }
}
exports.Day = Day;
//# sourceMappingURL=Day.js.map