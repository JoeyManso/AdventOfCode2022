"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdventOfCode = void 0;
var Days = require("./Days/Days");
var Process = require("process");
var Day_1 = require("./Days/Day");
var AdventOfCode;
(function (AdventOfCode) {
    var dayTypes = [];
    if (process.argv.length >= 3) {
        dayTypes = Process.argv[2].split(',');
    }
    else {
        dayTypes = [
            'Day01', 'Day02', 'Day03', 'Day04', 'Day05',
            'Day06', 'Day02', 'Day07', 'Day08', 'Day09',
            'Day10', 'Day11', 'Day12', 'Day13', 'Day14',
            'Day15', 'Day16', 'Day17', 'Day18', 'Day19',
            'Day21', 'Day22', 'Day23', 'Day24', 'Day25',
        ];
    }
    console.log("------------------------ BEGIN ".concat(dayTypes.length, " Day(s) ------------------------ "));
    var startTotal = new Date().getTime();
    var parts = [Day_1.Part.Part01, Day_1.Part.Part02];
    for (var _i = 0, dayTypes_1 = dayTypes; _i < dayTypes_1.length; _i++) {
        var dayType = dayTypes_1[_i];
        console.log("------------ BEGIN \"".concat(dayType, "\" ------------ "));
        // @ts-ignore
        var day = new Days[dayType]();
        for (var _a = 0, parts_1 = parts; _a < parts_1.length; _a++) {
            var part = parts_1[_a];
            console.log("\n".concat(part));
            var startDay = new Date().getTime();
            day.Run(part);
            var elapsedDay = new Date().getTime() - startDay;
            console.log("".concat(elapsedDay.toFixed(3), "ms\n"));
        }
        console.log("------------ END \"".concat(dayType, "\" ------------ "));
    }
    var elapsedTotal = new Date().getTime() - startTotal;
    console.log("".concat(elapsedTotal.toFixed(3), "ms\n"));
    console.log("------------------------ END ".concat(dayTypes.length, " Day(s) ------------------------ "));
})(AdventOfCode = exports.AdventOfCode || (exports.AdventOfCode = {}));
//# sourceMappingURL=index.js.map