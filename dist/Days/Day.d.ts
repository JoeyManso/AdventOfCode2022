export declare enum Part {
    Part01 = "Part01",
    Part02 = "Part02"
}
export declare abstract class Day {
    constructor();
    abstract Run(_part: Part): void;
    protected inputArray: string[];
}
