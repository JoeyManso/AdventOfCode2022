import { Day, Part } from "./Day";
export declare class Day12 extends Day {
    constructor();
    Run(_part: Part): void;
    private GetShortestPath;
    /** Array of Grid index to its height */
    private readonly gridIndexHeights;
    /** Array of Grid index to point */
    private readonly gridIndexPoints;
    /** Array of Grid index to adjacent indices */
    private readonly gridIndexAdjacencyPoints;
    private readonly idxStart;
    private readonly idxEnd;
}
