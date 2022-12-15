"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day15 = void 0;
const Day_1 = require("./Day");
const Point2D_1 = require("../Utils/Point2D");
class Day15 extends Day_1.Day {
    constructor() {
        super();
        // Mapping of row index to ranges of known non-beacon points
        this.rowRangesMap = new Map();
        this.knownBeaconPoints = [];
        const regexSensor = new RegExp(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/);
        for (const input of this.inputArray) {
            const matchSensor = regexSensor.exec(input);
            const sensorPoint = new Point2D_1.Point2D(parseInt(matchSensor[1]), parseInt(matchSensor[2]));
            const closestBeaconPoint = new Point2D_1.Point2D(parseInt(matchSensor[3]), parseInt(matchSensor[4]));
            const manhattanDist = Point2D_1.Point2D.GetManhattanDist(sensorPoint, closestBeaconPoint);
            this.knownBeaconPoints.push(closestBeaconPoint);
            const yStart = sensorPoint.Y - manhattanDist;
            const yEnd = sensorPoint.Y + manhattanDist;
            for (let y = yStart; y < yEnd; ++y) {
                // Calculate range in both x dirs
                const rangeDist = y <= sensorPoint.Y ? (y - yStart) : (yEnd - y);
                const rowRange = {
                    minX: sensorPoint.X - rangeDist,
                    maxX: sensorPoint.X + rangeDist,
                };
                // Exclude the nearest beacon from the range
                if (closestBeaconPoint.Y === y) {
                    if (closestBeaconPoint.X === rowRange.minX) {
                        ++rowRange.minX;
                    }
                    else if (closestBeaconPoint.X === rowRange.maxX) {
                        --rowRange.maxX;
                    }
                }
                // Add the range
                this.AddRange(y, rowRange);
            }
        }
    }
    Run(_part) {
        if (_part === Day_1.Part.Part01) {
            const rowMilestone = 2000000;
            console.log(`Non Beacon Count at row ${rowMilestone}: ${this.GetNonBeaconCount(rowMilestone)}`);
        }
        else if (_part === Day_1.Part.Part02) {
            const maxRange = 4000000;
            for (let y = 0; y <= maxRange; ++y) {
                const rowRanges = this.rowRangesMap.get(y);
                let x = 0;
                for (const rowRange of rowRanges) {
                    while (x < rowRange.minX && x <= maxRange) {
                        const testPoint = new Point2D_1.Point2D(x, y);
                        if (!this.knownBeaconPoints.find((_point) => _point.Equals(testPoint))) {
                            console.log(`Distress Beacon: ${testPoint.ToString()}`);
                            console.log(`Tuning Frequency: ${testPoint.X * 4000000 + testPoint.Y}`);
                        }
                        ++x;
                    }
                    x = rowRange.maxX + 1;
                }
            }
        }
    }
    AddRange(_row, _range) {
        const rowRanges = this.rowRangesMap.has(_row) ? this.rowRangesMap.get(_row) : [];
        rowRanges.push(_range);
        rowRanges.sort((a, b) => a.minX < b.minX ? -1 : 1);
        const reducedRanges = [];
        rowRanges.forEach((rowRange) => {
            const lastRange = reducedRanges.length > 0 ? reducedRanges[reducedRanges.length - 1] : null;
            if (!lastRange || rowRange.minX > lastRange.maxX) {
                reducedRanges.push(rowRange);
            }
            else if (rowRange.maxX > lastRange.maxX) {
                lastRange.maxX = rowRange.maxX;
            }
        });
        this.rowRangesMap.set(_row, reducedRanges);
    }
    GetNonBeaconCount(_rowIdx) {
        let nonBeaconCount = 0;
        for (const rowRange of this.rowRangesMap.get(_rowIdx)) {
            nonBeaconCount += (rowRange.maxX - rowRange.minX) + 1;
        }
        return nonBeaconCount;
    }
}
exports.Day15 = Day15;
//# sourceMappingURL=Day15.js.map