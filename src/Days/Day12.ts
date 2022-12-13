import {Day, Part} from "./Day";
import {Point2D} from "../Utils/Point2D";
export class Day12 extends Day {
    public constructor() {
        super();
        for (let y = 0; y < this.inputArray.length; ++y) {
            const inputLine: string = this.inputArray[y];
            for (let x = 0; x < inputLine.length; ++x) {
                let charCode: string = null;
                switch (inputLine[x]) {
                    case 'S':
                        charCode = 'a';
                        this.idxStart = this.gridIndexPoints.length;
                        break;
                    case 'E':
                        charCode = 'z';
                        this.idxEnd = this.gridIndexPoints.length;
                        break;
                    default:
                        charCode = inputLine[x];
                        break;
                }
                const height = charCode.charCodeAt(0) - 'a'.charCodeAt(0);

                this.gridIndexHeights.push(height);
                this.gridIndexPoints.push(new Point2D(x, y));
                const adjacentIndices: number[] = [];
                if (x > 0) {
                    adjacentIndices.push(y * inputLine.length + (x - 1));
                }
                if (x < inputLine.length - 1) {
                    adjacentIndices.push(y * inputLine.length + (x + 1));
                }
                if (y > 0) {
                    adjacentIndices.push(((y - 1) * inputLine.length) + x);
                }
                if (y < this.inputArray.length - 1) {
                    adjacentIndices.push(((y + 1) * inputLine.length) + x);
                }
                this.gridIndexAdjacencyPoints.push(adjacentIndices);
            }
        }
    }

    public Run(_part: Part) {
        if (_part === Part.Part01) {
            const shortestPath: number = this.GetShortestPath(this.idxStart, this.idxEnd);
            console.log(`Shortest distance from ${this.gridIndexPoints[this.idxStart].ToString()} to ${this.gridIndexPoints[this.idxEnd].ToString()}: ${shortestPath}`);
        }
        else if (_part === Part.Part02) {
            const shortestPaths: number[] = [];
            for (let i = 0; i <this.gridIndexHeights.length; ++i) {
                if (this.gridIndexHeights[i] === 0) {
                    const shortestPath: number = this.GetShortestPath(i, this.idxEnd);
                    if (!isNaN(shortestPath)) {
                        //console.log(`Shortest distance from ${this.gridIndexPoints[i].ToString()} to ${this.gridIndexPoints[this.idxEnd].ToString()}: ${shortestPath}`);
                        shortestPaths.push(shortestPath);
                    }
                }
            }
            shortestPaths.sort((a, b) => a < b ? -1 : 1);
            console.log(`Shortest possible path ${shortestPaths[0]}`);
        }
    }

    private GetShortestPath(_idxStart: number, _idxEnd: number): number {
        const indicesQueue: number[] = [_idxStart];
        const indicesSteps: number[] = [];
        indicesSteps.length = this.gridIndexPoints.length;

        while (indicesQueue.length) {
            // Pop current index from the queue
            const idxCur = indicesQueue.shift();

            // Check adjacent cells
            for (const idxAdj of this.gridIndexAdjacencyPoints[idxCur]) {
                // Can only move up 1 height max
                if (this.gridIndexHeights[idxAdj] - this.gridIndexHeights[idxCur] <= 1) {
                    // Update number of steps for each adjacent cell if the path is shorter
                    const newSteps: number = (indicesSteps[idxCur] ? indicesSteps[idxCur] : 0) + 1;
                    if (indicesSteps[idxAdj] === undefined || indicesSteps[idxAdj] > newSteps) {
                        indicesSteps[idxAdj] = newSteps;
                        indicesQueue.push(idxAdj);
                    }
                }
            }
        }
        return indicesSteps[_idxEnd];
    }

    /** Array of Grid index to its height */
    private readonly gridIndexHeights: number[] = [];

    /** Array of Grid index to point */
    private readonly gridIndexPoints: Point2D[] = [];

    /** Array of Grid index to adjacent indices */
    private readonly gridIndexAdjacencyPoints: number[][] = [];
    private readonly idxStart: number = null;
    private readonly idxEnd: number = null;
}