"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = exports.Part = void 0;
var path = require('path');
var fs = require('fs');
var Part;
(function (Part) {
    Part["Part01"] = "Part01";
    Part["Part02"] = "Part02";
})(Part = exports.Part || (exports.Part = {}));
var Day = /** @class */ (function () {
    function Day() {
        this.inputArray = null;
        var filepath = "".concat(path.resolve('..\\input'), "\\").concat(this.constructor.name, ".txt");
        if (!fs.existsSync(filepath)) {
            throw new Error("\"".concat(JSON.stringify(filepath), "\" does not exist"));
        }
        this.inputArray = Buffer.from(fs.readFileSync(filepath)).toString().split('\r\n');
    }
    return Day;
}());
exports.Day = Day;
//# sourceMappingURL=Day.js.map