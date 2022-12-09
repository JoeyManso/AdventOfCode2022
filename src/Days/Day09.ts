import {Day, Part} from "./Day";
import {Point2D} from "../Utils/Point2D";
import {Vector2D} from "../Utils/Vector2D";

export class Day09 extends Day {
    public Run(_part: Part) {
        const points: Point2D[] = [];
        while (points.length < (_part === Part.Part01 ? 2 : 10)) {
            points.push(new Point2D(0, 0));
        }
        const tailVisitedPoints: Point2D[] = [Point2D.Copy(points[points.length - 1])];
        for (const input of this.inputArray) {
            const matchArrayMotion: RegExpMatchArray = Day09.regexMotion.exec(input);
            const motionDist: number = parseInt(matchArrayMotion[2]);
            let motionVectorHead: Vector2D = null;
            switch (matchArrayMotion[1]) {
                case 'U':
                    motionVectorHead = new Vector2D(0, -1);
                    break;
                case 'D':
                    motionVectorHead = new Vector2D(0, 1);
                    break;
                case 'L':
                    motionVectorHead = new Vector2D(-1, 0);
                    break;
                case 'R':
                    motionVectorHead = new Vector2D(1, 0);
                    break;
            }
            for (let i = 0; i < motionDist; ++i) {
                const pointHead: Point2D = points[0];
                pointHead.Add(motionVectorHead);
                for (let j = 1; j < points.length; ++j) {
                    const pointPrev: Point2D = points[j - 1];
                    const pointCur: Point2D = points[j];
                    const motionVector: Vector2D = Vector2D.GetDelta(pointCur, pointPrev);
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

                const pointTail: Point2D = points[points.length - 1];
                if (!tailVisitedPoints.find((_visitedPoint: Point2D) => {return _visitedPoint.Equals(pointTail)})) {
                    tailVisitedPoints.push(Point2D.Copy(pointTail));
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

    private static regexMotion: RegExp = new RegExp(/([UDLR]) (\d+)/);
}