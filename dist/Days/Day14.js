"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day14 = void 0;
const Day_1 = require("./Day");
const Point2D_1 = require("../Utils/Point2D");
const Number_1 = require("../Utils/Number");
class Cave {
    constructor() {
        this.caveGrid = [];
        this.gridMin = new Point2D_1.Point2D(1000, 0);
        this.gridMax = new Point2D_1.Point2D(0, 0);
        this.sandStart = new Point2D_1.Point2D(500, 0);
        this.sandCount = 0;
    }
    get SandCount() {
        return this.sandCount;
    }
    AddCoords(_coordCur, _coordPrev) {
        // Track min/max of the grid
        this.gridMin.X = Math.min(this.gridMin.X, _coordCur.X);
        this.gridMin.Y = Math.min(this.gridMin.Y, _coordCur.Y);
        this.gridMax.X = Math.max(this.gridMax.X, _coordCur.X);
        this.gridMax.Y = Math.max(this.gridMax.Y, _coordCur.Y);
        // Expand Grid with air characters if necessary
        for (let x = 0; x <= this.gridMax.X; ++x) {
            if (this.caveGrid.length <= x) {
                this.caveGrid.push([]);
            }
            for (let y = 0; y <= this.gridMax.Y; ++y) {
                if (this.caveGrid[x].length <= y) {
                    this.caveGrid[x].push(Cave.CHAR_AIR);
                }
                // Draw rocks
                if (_coordPrev) {
                    if (((0, Number_1.IsWithinInclusive)(x, _coordPrev.X, _coordCur.X) || (0, Number_1.IsWithinInclusive)(x, _coordCur.X, _coordPrev.X))
                        && ((0, Number_1.IsWithinInclusive)(y, _coordPrev.Y, _coordCur.Y) || (0, Number_1.IsWithinInclusive)(y, _coordCur.Y, _coordPrev.Y))) {
                        this.caveGrid[x][y] = Cave.CHAR_ROCK;
                    }
                }
            }
        }
    }
    AddSand(_part) {
        let sandPoint = Point2D_1.Point2D.Copy(this.sandStart);
        while (true) {
            if (_part === Day_1.Part.Part01 && sandPoint.Y >= this.gridMax.Y) {
                return false;
            }
            // Fall down
            if (this.CanVisit(sandPoint.X, sandPoint.Y + 1, _part)) {
                ++sandPoint.Y;
            }
            // Fall left
            else if (this.CanVisit(sandPoint.X - 1, sandPoint.Y + 1, _part)) {
                --sandPoint.X;
                ++sandPoint.Y;
            }
            // Fall right
            else if (this.CanVisit(sandPoint.X + 1, sandPoint.Y + 1, _part)) {
                ++sandPoint.X;
                ++sandPoint.Y;
            }
            // At rest
            else {
                // Expand the Grid if necessary
                for (let x = this.caveGrid.length; x <= sandPoint.X; ++x) {
                    this.caveGrid.push([]);
                }
                for (let y = this.caveGrid[sandPoint.X].length; y <= sandPoint.Y; ++y) {
                    this.caveGrid[sandPoint.X].push(Cave.CHAR_AIR);
                }
                // Add sand to the grid and increment count
                this.caveGrid[sandPoint.X][sandPoint.Y] = Cave.CHAR_SAND;
                ++this.sandCount;
                // For part 1, return true while sand is within bounds
                if (_part === Day_1.Part.Part01) {
                    return true;
                }
                // For part 2, return true until sand has reached the starting point
                else {
                    return !sandPoint.Equals(this.sandStart);
                }
            }
        }
    }
    Print() {
        for (let y = this.gridMin.Y; y <= this.gridMax.Y; ++y) {
            let caveLine = '';
            for (let x = this.gridMin.X; x <= this.gridMax.X; ++x) {
                caveLine += this.caveGrid[x][y];
            }
            console.log(caveLine);
        }
    }
    CanVisit(_x, _y, _part) {
        if (_x < this.caveGrid.length) {
            if (_y < this.caveGrid[_x].length) {
                return this.caveGrid[_x][_y] === Cave.CHAR_AIR;
            }
        }
        if (_part === Day_1.Part.Part02) {
            return _y < this.gridMax.Y + 2;
        }
        return false;
    }
}
Cave.CHAR_ROCK = '#';
Cave.CHAR_AIR = '.';
Cave.CHAR_SAND = 'o';
class Day14 extends Day_1.Day {
    Run(_part) {
        const cave = new Cave();
        for (const input of this.inputArray) {
            const coordStrings = input.split(' -> ');
            let coordPrev = null;
            for (const coordString of coordStrings) {
                const coordMatch = Day14.regexCoord.exec(coordString);
                const coordCur = new Point2D_1.Point2D(parseInt(coordMatch[1]), parseInt(coordMatch[2]));
                cave.AddCoords(coordCur, coordPrev);
                coordPrev = Point2D_1.Point2D.Copy(coordCur);
            }
        }
        while (cave.AddSand(_part)) {
            //cave.Print();
            //console.log();
        }
        console.log(`Total Sand Added: ${cave.SandCount}`);
    }
}
exports.Day14 = Day14;
Day14.regexCoord = new RegExp(/(\d+),(\d+)/);
//# sourceMappingURL=Day14.js.map