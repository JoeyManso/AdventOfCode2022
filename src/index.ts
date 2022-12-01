import * as Days from './Days/Days'
import * as Process from "process";
import {Part} from './Days/Day';

export module AdventOfCode
{
    let dayTypes: string[] = [];
    if (process.argv.length >= 3) {
        dayTypes = Process.argv[2].split(',')
    }
    else {
        dayTypes = [
            'Day01','Day02','Day03','Day04','Day05',
            'Day06','Day02','Day07','Day08','Day09',
            'Day10','Day11','Day12','Day13','Day14',
            'Day15','Day16','Day17','Day18','Day19',
            'Day21','Day22','Day23','Day24','Day25',
        ];
    }

    console.log(`------------------------ BEGIN ${dayTypes.length} Day(s) ------------------------ `)
    const startTotal = new Date().getTime();
    const parts: Part[] = [Part.Part01, Part.Part02]
    for (const dayType of dayTypes) {
        console.log(`------------ BEGIN "${dayType}" ------------ `)
        // @ts-ignore
        const day = new Days[dayType]();
        for (const part of parts) {
            console.log(`\n${part}`);
            const startDay = new Date().getTime();
            day.Run(part);
            const elapsedDay = new Date().getTime() - startDay;
            console.log(`${elapsedDay.toFixed(3)}ms\n`);
        }
        console.log(`------------ END "${dayType}" ------------ `)
    }
    console.log(`------------------------ END ${dayTypes.length} Day(s) ------------------------ `)
    const elapsedTotal = new Date().getTime() - startTotal;
    console.log(`${elapsedTotal.toFixed(3)}ms\n`);
}