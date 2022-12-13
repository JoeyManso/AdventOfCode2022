"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day12 = void 0;
const Day_1 = require("./Day");
const Point2D_1 = require("../Utils/Point2D");
class Day12 extends Day_1.Day {
    constructor() {
        super();
        /** Array of Grid index to its height */
        this.gridIndexHeights = [];
        /** Array of Grid index to point */
        this.gridIndexPoints = [];
        /** Array of Grid index to adjacent indices */
        this.gridIndexAdjacencyPoints = [];
        this.idxStart = null;
        this.idxEnd = null;
        for (let y = 0; y < this.inputArray.length; ++y) {
            const inputLine = this.inputArray[y];
            for (let x = 0; x < inputLine.length; ++x) {
                let charCode = null;
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
                this.gridIndexPoints.push(new Point2D_1.Point2D(x, y));
                const adjacentIndices = [];
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
    Run(_part) {
        if (_part === Day_1.Part.Part01) {
            const shortestPath = this.GetShortestPath(this.idxStart, this.idxEnd);
            console.log(`Shortest distance from ${this.gridIndexPoints[this.idxStart].ToString()} to ${this.gridIndexPoints[this.idxEnd].ToString()}: ${shortestPath}`);
        }
        else if (_part === Day_1.Part.Part02) {
            const shortestPaths = [];
            for (let i = 0; i < this.gridIndexHeights.length; ++i) {
                if (this.gridIndexHeights[i] === 0) {
                    const shortestPath = this.GetShortestPath(i, this.idxEnd);
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
    GetShortestPath(_idxStart, _idxEnd) {
        const indicesQueue = [_idxStart];
        const indicesSteps = [];
        indicesSteps.length = this.gridIndexPoints.length;
        while (indicesQueue.length) {
            // Pop current index from the queue
            const idxCur = indicesQueue.shift();
            // Check adjacent cells
            for (const idxAdj of this.gridIndexAdjacencyPoints[idxCur]) {
                // Can only move up 1 height max
                if (this.gridIndexHeights[idxAdj] - this.gridIndexHeights[idxCur] <= 1) {
                    // Update number of steps for each adjacent cell if the path is shorter
                    const newSteps = (indicesSteps[idxCur] ? indicesSteps[idxCur] : 0) + 1;
                    if (indicesSteps[idxAdj] === undefined || indicesSteps[idxAdj] > newSteps) {
                        indicesSteps[idxAdj] = newSteps;
                        indicesQueue.push(idxAdj);
                    }
                }
            }
        }
        return indicesSteps[_idxEnd];
    }
}
exports.Day12 = Day12;
//# sourceMappingURL=Day12.js.map