import {Day, Part} from "./Day";

// Credit to https://github.com/tymscar for the majority of this solution

type Room = {
    name: string,
    flow: number,
    adj: string[]
}

type InputRoomMap = {
    [name: string]: Room
}

type CostMap = {
    [name: string]: number
}

type PricesRoomMap = {
    [name: string]: CostMap
}

type Path = {
    curr: string,
    toVisit: string[],
    timeLeft: number,
    finished: boolean,
    steps: string[],
    finalPressure: number
}

const sortPathByPressure = (a: Path, b: Path) => b.finalPressure - a.finalPressure;

const getMostPressureReleaseWithElephant = (destinationRooms: Room[], roomsMovePrices: PricesRoomMap, inputRooms: InputRoomMap) => {
    let mostPressureReleased = -1;
    const paths = getAllPaths(26, destinationRooms, roomsMovePrices, inputRooms);
    for (let humanPath = 0; humanPath < paths.length; humanPath++)
        for (let elephantPath = humanPath + 1; elephantPath < paths.length; elephantPath++)
            if (paths[humanPath].steps.every(s => !paths[elephantPath].steps.includes(s)))
                if (paths[humanPath].finalPressure+paths[elephantPath].finalPressure > mostPressureReleased)
                    mostPressureReleased = paths[humanPath].finalPressure+paths[elephantPath].finalPressure;
    return mostPressureReleased;
};

const getAllPaths = (time: number, destinations: Room[], priceMap: PricesRoomMap, roomsFromName: InputRoomMap) => {
    const paths: Path[] = [{
        curr: 'AA',
        toVisit: destinations.map(r => r.name),
        timeLeft: time,
        finished: false,
        steps: [],
        finalPressure: 0
    }];

    for (let n = 0; n < paths.length; n++) {
        const path = paths[n];
        if (path.timeLeft <= 0 || path.finished){
            path.finished = true;
            continue;
        }

        const currPrices = priceMap[path.curr];
        let madeNewPath = false;
        path.toVisit.forEach(room => {
            if (room !== path.curr && path.timeLeft-currPrices[room] > 1) {
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

const dijkstra = (start: Room, endPositions: Room[], map: InputRoomMap): CostMap => {
    const visited: string[] = [];
    const toVisit: Room[] = [start];
    const lowestCost: CostMap = {
        [start.name]: 0
    };

    let curr;
    while ((curr = toVisit.shift())) {
        if(visited.includes(curr.name))
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

    return endPositions.reduce((map:CostMap, room:Room) => {
        return{
            ...map,
            [room.name]: lowestCost[room.name]
        };
    }, {});
};

export class Day16 extends Day {
    constructor() {
        super();
        const regexValve: RegExp = new RegExp(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)/);
        for (const input of this.inputArray) {
            const matchValve: RegExpMatchArray = regexValve.exec(input);
            this.roomsArray.push({
                name: matchValve[1],
                flow: parseInt(matchValve[2]),
                adj: matchValve[3].split(', '),
            });
        }
    }
    public Run(_part: Part) {
        const inputRooms: InputRoomMap = this.roomsArray.reduce((map, currRoom) => ({
            ...map,
            [currRoom.name]: currRoom
        }), {} as InputRoomMap);

        const startingRooms = [inputRooms['AA'], ...this.roomsArray.filter(room => room.flow != 0)];
        const destinationRooms = this.roomsArray.filter(room => room.flow != 0);
        const roomsMovePrices: PricesRoomMap = startingRooms.reduce((map: PricesRoomMap, room: Room) => {
            return {
                ...map,
                [room.name]: dijkstra(room, destinationRooms.filter(r => r.name != room.name), inputRooms)
            };
        }, {} as PricesRoomMap);

        let mostPossiblePressure = 0;
        if (_part === Part.Part01) {
            mostPossiblePressure = getAllPaths(30, destinationRooms, roomsMovePrices, inputRooms)[0].finalPressure;
        }
        else if (_part === Part.Part02) {
            mostPossiblePressure = getMostPressureReleaseWithElephant(destinationRooms, roomsMovePrices, inputRooms);
        }
        console.log(`Most Possible Pressure: ${mostPossiblePressure}`);
    }

    private roomsArray: Room[] = [];
}