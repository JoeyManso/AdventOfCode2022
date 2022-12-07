import {Day, Part} from "./Day";

class FileOrDirectory {
    constructor(_name: string, _size: number = 0) {
        this.name = _name;
        this.size = _size;
    }

    getTotalSize(): number {
        let totalSize = this.size;
        for (const child of this.children) {
            totalSize += child.getTotalSize();
        }
        return totalSize;
    }

    getDirSizesForFunc(func: (_totalSize: number) => boolean): number[] {
        const sizes: number[] = [];
        if (this.children.length > 0) {
            const totalSize: number = this.getTotalSize();
            if (func(totalSize)) {
                sizes.push(totalSize)
            }
            for (const child of this.children) {
                sizes.push(...child.getDirSizesForFunc(func));
            }
        }
        return sizes;
    }

    print(_indent: number = 0): void {
        let printStr = '';
        for (let i = 0; i < _indent; ++i) {
            printStr += '  ';
        }
        printStr += `${this.name} - ${this.getTotalSize()}`;
        console.log(printStr);
        for (const child of this.children) {
            child.print(_indent + 1);
        }
    }

    findOrAddChild(_name: string, _size: number = 0): FileOrDirectory {
        for (const child of this.children) {
            if (child.name === _name) {
                return child;
            }
        }
        const newChild: FileOrDirectory = new FileOrDirectory(_name, _size);
        newChild.parent = this;
        this.children.push(newChild);
        return newChild;
    }

    readonly name: string;
    parent: FileOrDirectory = null;
    private children: FileOrDirectory[] = [];
    private readonly size: number;
}

export class Day07 extends Day {
    public Run(_part: Part) {
        let isListing = false;
        let currentDirectory: FileOrDirectory = null;
        for (const input of this.inputArray) {
            if (input.startsWith(Day07.commandChangeDir)) {
                isListing = false;
                const directoryName: string = input.substring(Day07.commandChangeDir.length);
                if (currentDirectory) {
                    if (directoryName === '..') {
                        // Move out
                        currentDirectory = currentDirectory.parent;
                    }
                    else {
                        // Move In
                        currentDirectory = currentDirectory.findOrAddChild(directoryName);
                    }
                }
                else {
                    // No current directory yet, create one
                    currentDirectory = new FileOrDirectory(directoryName);
                }
            }
            else if (input.startsWith(Day07.commandListDir)) {
                isListing = true;
            }
            else if (isListing) {
                const matchArrayDir: RegExpMatchArray = Day07.regexDir.exec(input);
                const matchArrayFile: RegExpMatchArray = Day07.regexFile.exec(input);
                if (matchArrayDir) {
                    currentDirectory.findOrAddChild(matchArrayDir[1]);
                }
                else if (matchArrayFile) {
                    currentDirectory.findOrAddChild(matchArrayFile[2], parseInt(matchArrayFile[1]));
                }
            }
        }

        let rootDirectory = currentDirectory;
        while (rootDirectory.parent) {
            rootDirectory = rootDirectory.parent;
        }
        //rootDirectory.print();

        if (_part === Part.Part01) {
            let sumOfSizes = 0;
            const sizes: number[] = rootDirectory.getDirSizesForFunc((_totalSize: number) => {return _totalSize <= 100000});
            for (const sizeAtOrUnderMax of sizes) {
                //console.log(sizeAtOrUnderMax);
                sumOfSizes += sizeAtOrUnderMax;
            }
            console.log(`Sum of directory sizes: ${sumOfSizes}`);
        }
        else if (_part === Part.Part02) {
            const totalDiscSpace = 70000000;
            const requiredDiscSpace = 30000000;
            const unusedDiscSpace = totalDiscSpace - rootDirectory.getTotalSize();
            const minDirectorySize = requiredDiscSpace - unusedDiscSpace;
            const sizes: number[] = rootDirectory.getDirSizesForFunc((_totalSize: number) => {return _totalSize >= minDirectorySize});
            sizes.sort((a, b) => a < b ? -1 : 1);
            console.log(`Smallest directory size to delete: ${sizes[0]}`);
        }
    }
    private static commandChangeDir = '$ cd ';
    private static commandListDir = '$ ls';
    private static regexDir = new RegExp(/dir (.+)/);
    private static regexFile = new RegExp(/(\d+) (.+)/);
}