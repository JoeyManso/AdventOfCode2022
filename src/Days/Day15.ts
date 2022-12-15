import {Day, Part} from "./Day";
import {Point2D} from "../Utils/Point2D";

interface IRowRange {
    minX: number,
    maxX: number,
}

export class Day15 extends Day {
    constructor() {
        super();

        const regexSensor: RegExp = new RegExp(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/);
        for (const input of this.inputArray) {
            const matchSensor: RegExpMatchArray = regexSensor.exec(input);
            const sensorPoint: Point2D = new Point2D(parseInt(matchSensor[1]), parseInt(matchSensor[2]));
            const closestBeaconPoint: Point2D = new Point2D(parseInt(matchSensor[3]), parseInt(matchSensor[4]));
            const manhattanDist: number = Point2D.GetManhattanDist(sensorPoint, closestBeaconPoint);
            this.knownBeaconPoints.push(closestBeaconPoint);

            const yStart = sensorPoint.Y - manhattanDist;
            const yEnd = sensorPoint.Y + manhattanDist;
            for (let y = yStart; y < yEnd; ++y) {
                // Calculate range in both x dirs
                const rangeDist: number = y <= sensorPoint.Y ? (y - yStart) : (yEnd - y);
                const rowRange: IRowRange = {
                    minX: sensorPoint.X - rangeDist,
                    maxX: sensorPoint.X + rangeDist,
                };

                // Exclude the nearest beacon from the range
                if (closestBeaconPoint.Y === y) {
                    if (closestBeaconPoint.X === rowRange.minX) {
                        ++rowRange.minX
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

    public Run(_part: Part) {
        if (_part === Part.Part01) {
            const rowMilestone = 2000000;
            console.log(`Non Beacon Count at row ${rowMilestone}: ${this.GetNonBeaconCount(rowMilestone)}`);
        }
        else if (_part === Part.Part02) {
            const maxRange = 4000000;
            for (let y = 0; y <= maxRange; ++y) {
                const rowRanges: IRowRange[] = this.rowRangesMap.get(y);
                let x = 0;
                for (const rowRange of rowRanges) {
                    while (x < rowRange.minX && x <= maxRange) {
                        const testPoint: Point2D = new Point2D(x, y);
                        if (!this.knownBeaconPoints.find((_point: Point2D) => _point.Equals(testPoint))) {
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

    private AddRange(_row: number, _range: IRowRange): void {
        const rowRanges: IRowRange[] = this.rowRangesMap.has(_row) ? this.rowRangesMap.get(_row) : [];
        rowRanges.push(_range);
        rowRanges.sort((a, b) => a.minX < b.minX ? -1 : 1);

        const reducedRanges: IRowRange[] = [];
        rowRanges.forEach((rowRange: IRowRange) => {
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

    private GetNonBeaconCount(_rowIdx: number): number {
        let nonBeaconCount = 0;
        for (const rowRange of this.rowRangesMap.get(_rowIdx)) {
            nonBeaconCount += (rowRange.maxX - rowRange.minX) + 1;
        }
        return nonBeaconCount;
    }

    // Mapping of row index to ranges of known non-beacon points
    private readonly rowRangesMap: Map<number, IRowRange[]> = new Map<number, IRowRange[]>();
    private readonly knownBeaconPoints: Point2D[] = [];
}