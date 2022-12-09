"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day09 = void 0;
const Day_1 = require("./Day");
const Point2D_1 = require("../Utils/Point2D");
const Vector2D_1 = require("../Utils/Vector2D");
class Day09 extends Day_1.Day {
    Run(_part) {
        const points = [];
        while (points.length < (_part === Day_1.Part.Part01 ? 2 : 10)) {
            points.push(new Point2D_1.Point2D(0, 0));
        }
        const tailVisitedPoints = [Point2D_1.Point2D.Copy(points[points.length - 1])];
        for (const input of this.inputArray) {
            const matchArrayMotion = Day09.regexMotion.exec(input);
            const motionDist = parseInt(matchArrayMotion[2]);
            let motionVectorHead = null;
            switch (matchArrayMotion[1]) {
                case 'U':
                    motionVectorHead = new Vector2D_1.Vector2D(0, -1);
                    break;
                case 'D':
                    motionVectorHead = new Vector2D_1.Vector2D(0, 1);
                    break;
                case 'L':
                    motionVectorHead = new Vector2D_1.Vector2D(-1, 0);
                    break;
                case 'R':
                    motionVectorHead = new Vector2D_1.Vector2D(1, 0);
                    break;
            }
            for (let i = 0; i < motionDist; ++i) {
                const pointHead = points[0];
                pointHead.Add(motionVectorHead);
                for (let j = 1; j < points.length; ++j) {
                    const pointPrev = points[j - 1];
                    const pointCur = points[j];
                    const motionVector = Vector2D_1.Vector2D.GetDelta(pointCur, pointPrev);
                    if (Math.abs(motionVector.X) > 1 || Math.abs(motionVector.Y) > 1) {
                        if (motionVector.x > 1) {
                            motionVector.x = 1;
                        }
                        else if (motionVector.x < -1) {
                            motionVector.x = -1;
                        }
                        if (motionVector.y > 1) {
                            motionVector.y = 1;
                        }
                        else if (motionVector.y < -1) {
                            motionVector.y = -1;
                        }
                        pointCur.Add(motionVector);
                    }
                }
                const pointTail = points[points.length - 1];
                if (!tailVisitedPoints.find((_visitedPoint) => { return _visitedPoint.Equals(pointTail); })) {
                    tailVisitedPoints.push(Point2D_1.Point2D.Copy(pointTail));
                }
            }
            // console.log(input);
            // for (let i = 0; i < points.length; ++i) {
            //     console.log(`P${i}: ${points[i].ToString()}`);
            // }
            // console.log();
        }
        console.log(`Total Points Visited: ${tailVisitedPoints.length}`);
    }
}
exports.Day09 = Day09;
Day09.regexMotion = new RegExp(/([UDLR]) (\d+)/);
//# sourceMappingURL=Day09.js.map