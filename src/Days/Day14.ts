import {Day, Part} from "./Day";
import {Point2D} from "../Utils/Point2D";
import {IsWithinInclusive} from "../Utils/Number";

class Cave {
    get SandCount() {
        return this.sandCount;
    }

    AddCoords(_coordCur: Point2D, _coordPrev: Point2D) {
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
                    if ((IsWithinInclusive(x, _coordPrev.X, _coordCur.X) || IsWithinInclusive(x, _coordCur.X, _coordPrev.X))
                    && (IsWithinInclusive(y, _coordPrev.Y, _coordCur.Y) || IsWithinInclusive(y, _coordCur.Y, _coordPrev.Y))) {
                        this.caveGrid[x][y] = Cave.CHAR_ROCK;
                    }
                }
            }
        }
    }

    AddSand(_part: Part): boolean {
        let sandPoint: Point2D = Point2D.Copy(this.sandStart);
        while (true) {
            if (_part === Part.Part01 && sandPoint.Y >= this.gridMax.Y) {
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
                if (_part === Part.Part01) {
                    return true
                }
                // For part 2, return true until sand has reached the starting point
                else {
                    return !sandPoint.Equals(this.sandStart);
                }
            }
        }
    }

    Print(): void {
        for (let y = this.gridMin.Y; y <= this.gridMax.Y; ++y) {
            let caveLine = '';
            for (let x = this.gridMin.X; x <= this.gridMax.X; ++x) {
                caveLine += this.caveGrid[x][y];
            }
            console.log(caveLine);
        }
    }

    private CanVisit(_x: number, _y: number, _part: Part): boolean {
        if (_x < this.caveGrid.length) {
            if (_y < this.caveGrid[_x].length) {
                return this.caveGrid[_x][_y] === Cave.CHAR_AIR;
            }
        }
        if (_part === Part.Part02) {
            return _y < this.gridMax.Y + 2;
        }
        return false;
    }

    private readonly caveGrid: string[][] = [];
    private readonly gridMin: Point2D = new Point2D(1000, 0);
    private readonly gridMax: Point2D = new Point2D(0, 0);
    private readonly sandStart: Point2D = new Point2D(500, 0);
    private static readonly CHAR_ROCK = '#';
    private static readonly CHAR_AIR = '.';
    private static readonly CHAR_SAND = 'o';
    private sandCount: number = 0;
}

export class Day14 extends Day {
    public Run(_part: Part) {
        const cave: Cave = new Cave();
        for (const input of this.inputArray) {
            const coordStrings: string[] = input.split(' -> ');
            let coordPrev: Point2D = null;
            for (const coordString of coordStrings) {
                const coordMatch: RegExpMatchArray = Day14.regexCoord.exec(coordString)
                const coordCur: Point2D = new Point2D(parseInt(coordMatch[1]), parseInt(coordMatch[2]));
                cave.AddCoords(coordCur, coordPrev);
                coordPrev = Point2D.Copy(coordCur);
            }
        }

        while (cave.AddSand(_part)) {
            //cave.Print();
            //console.log();
        }
        console.log(`Total Sand Added: ${cave.SandCount}`);
    }

    private static readonly regexCoord: RegExp = new RegExp(/(\d+),(\d+)/);
}