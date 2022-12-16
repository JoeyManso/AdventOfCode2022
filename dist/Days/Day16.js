"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day16 = void 0;
const Day_1 = require("./Day");
const sortPathByPressure = (a, b) => b.finalPressure - a.finalPressure;
const getMostPressureReleaseWithElephant = (destinationRooms, roomsMovePrices, inputRooms) => {
    let mostPressureReleased = -1;
    const paths = getAllPaths(26, destinationRooms, roomsMovePrices, inputRooms);
    for (let humanPath = 0; humanPath < paths.length; humanPath++)
        for (let elephantPath = humanPath + 1; elephantPath < paths.length; elephantPath++)
            if (paths[humanPath].steps.every(s => !paths[elephantPath].steps.includes(s)))
                if (paths[humanPath].finalPressure + paths[elephantPath].finalPressure > mostPressureReleased)
                    mostPressureReleased = paths[humanPath].finalPressure + paths[elephantPath].finalPressure;
    return mostPressureReleased;
};
const getAllPaths = (time, destinations, priceMap, roomsFromName) => {
    const paths = [{
            curr: 'AA',
            toVisit: destinations.map(r => r.name),
            timeLeft: time,
            finished: false,
            steps: [],
            finalPressure: 0
        }];
    for (let n = 0; n < paths.length; n++) {
        const path = paths[n];
        if (path.timeLeft <= 0 || path.finished) {
            path.finished = true;
            continue;
        }
        const currPrices = priceMap[path.curr];
        let madeNewPath = false;
        path.toVisit.forEach(room => {
            if (room !== path.curr && path.timeLeft - currPrices[room] > 1) {
                madeNewPath = true;
                const newTimeAfterVisitAndValveOpen = path.timeLeft - currPrices[room] - 1;
                paths.push({
                    curr: room,
                    toVisit: path.toVisit.filter(v => v != room),
                    timeLeft: newTimeAfterVisitAndValveOpen,
                    finished: false,
                    steps: [...path.steps, room],
                    finalPressure: path.finalPressure + newTimeAfterVisitAndValveOpen * roomsFromName[room].flow
                });
                paths.push({
                    curr: room,
                    toVisit: [],
                    timeLeft: newTimeAfterVisitAndValveOpen,
                    finished: true,
                    steps: [...path.steps, room],
                    finalPressure: path.finalPressure + newTimeAfterVisitAndValveOpen * roomsFromName[room].flow
                });
            }
        });
        if (!madeNewPath)
            path.finished = true;
    }
    return paths.filter(p => p.finished).sort(sortPathByPressure);
};
const dijkstra = (start, endPositions, map) => {
    const visited = [];
    const toVisit = [start];
    const lowestCost = {
        [start.name]: 0
    };
    let curr;
    while ((curr = toVisit.shift())) {
        if (visited.includes(curr.name))
            continue;
        const worthItAdj = curr.adj.filter(neighbour => !visited.includes(neighbour)).map(neighbour => map[neighbour]);
        toVisit.push(...worthItAdj);
        const costToCurr = lowestCost[curr.name];
        worthItAdj.forEach(neighbour => {
            const newCostToNeighbour = costToCurr + 1;
            const costToNeighbour = lowestCost[neighbour.name] === undefined ? newCostToNeighbour : lowestCost[neighbour.name];
            if (newCostToNeighbour <= costToNeighbour) {
                lowestCost[neighbour.name] = newCostToNeighbour;
            }
        });
        visited.push(curr.name);
    }
    return endPositions.reduce((map, room) => {
        return {
            ...map,
            [room.name]: lowestCost[room.name]
        };
    }, {});
};
class Day16 extends Day_1.Day {
    constructor() {
        super();
        this.roomsArray = [];
        const regexValve = new RegExp(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/);
        for (const input of this.inputArray) {
            const matchValve = regexValve.exec(input);
            this.roomsArray.push({
                name: matchValve[1],
                flow: parseInt(matchValve[2]),
                adj: matchValve[3].split(', '),
            });
        }
    }
    Run(_part) {
        const inputRooms = this.roomsArray.reduce((map, currRoom) => ({
            ...map,
            [currRoom.name]: currRoom
        }), {});
        const startingRooms = [inputRooms['AA'], ...this.roomsArray.filter(room => room.flow != 0)];
        const destinationRooms = this.roomsArray.filter(room => room.flow != 0);
        const roomsMovePrices = startingRooms.reduce((map, room) => {
            return {
                ...map,
                [room.name]: dijkstra(room, destinationRooms.filter(r => r.name != room.name), inputRooms)
            };
        }, {});
        let mostPossiblePressure = 0;
        if (_part === Day_1.Part.Part01) {
            mostPossiblePressure = getAllPaths(30, destinationRooms, roomsMovePrices, inputRooms)[0].finalPressure;
        }
        else if (_part === Day_1.Part.Part02) {
            mostPossiblePressure = getMostPressureReleaseWithElephant(destinationRooms, roomsMovePrices, inputRooms);
        }
        console.log(`Most Possible Pressure: ${mostPossiblePressure}`);
    }
}
exports.Day16 = Day16;
//# sourceMappingURL=Day16.js.map