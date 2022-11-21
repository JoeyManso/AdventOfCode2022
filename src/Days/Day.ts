const path = require('path');
const fs = require('fs');

export enum Part
{
    Part01 = 'Part01',
    Part02 = 'Part02',
}

export abstract class Day {
    public constructor() {
        const filepath: string = `${path.resolve('..\\input')}\\${this.constructor.name}.txt`;
        if (!fs.existsSync(filepath)) {
            throw new Error(`"${JSON.stringify(filepath)}" does not exist`);
        }
        this.inputArray = Buffer.from(fs.readFileSync(filepath)).toString().split('\r\n');
    }

    public abstract Run(_part: Part): void;

    protected inputArray: string[] = null;
}
