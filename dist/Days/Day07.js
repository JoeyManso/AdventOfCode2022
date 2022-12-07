"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day07 = void 0;
const Day_1 = require("./Day");
class FileOrDirectory {
    constructor(_name, _size = 0) {
        this.parent = null;
        this.children = [];
        this.name = _name;
        this.size = _size;
    }
    getTotalSize() {
        let totalSize = this.size;
        for (const child of this.children) {
            totalSize += child.getTotalSize();
        }
        return totalSize;
    }
    getDirSizesForFunc(func) {
        const sizes = [];
        if (this.children.length > 0) {
            const totalSize = this.getTotalSize();
            if (func(totalSize)) {
                sizes.push(totalSize);
            }
            for (const child of this.children) {
                sizes.push(...child.getDirSizesForFunc(func));
            }
        }
        return sizes;
    }
    print(_indent = 0) {
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
    findOrAddChild(_name, _size = 0) {
        for (const child of this.children) {
            if (child.name === _name) {
                return child;
            }
        }
        const newChild = new FileOrDirectory(_name, _size);
        newChild.parent = this;
        this.children.push(newChild);
        return newChild;
    }
}
class Day07 extends Day_1.Day {
    Run(_part) {
        let isListing = false;
        let currentDirectory = null;
        for (const input of this.inputArray) {
            if (input.startsWith(Day07.commandChangeDir)) {
                isListing = false;
                const directoryName = input.substring(Day07.commandChangeDir.length);
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
                const matchArrayDir = Day07.regexDir.exec(input);
                const matchArrayFile = Day07.regexFile.exec(input);
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
        if (_part === Day_1.Part.Part01) {
            let sumOfSizes = 0;
            const sizes = rootDirectory.getDirSizesForFunc((_totalSize) => { return _totalSize <= 100000; });
            for (const sizeAtOrUnderMax of sizes) {
                //console.log(sizeAtOrUnderMax);
                sumOfSizes += sizeAtOrUnderMax;
            }
            console.log(`Sum of directory sizes: ${sumOfSizes}`);
        }
        else if (_part === Day_1.Part.Part02) {
            const totalDiscSpace = 70000000;
            const requiredDiscSpace = 30000000;
            const unusedDiscSpace = totalDiscSpace - rootDirectory.getTotalSize();
            const minDirectorySize = requiredDiscSpace - unusedDiscSpace;
            const sizes = rootDirectory.getDirSizesForFunc((_totalSize) => { return _totalSize >= minDirectorySize; });
            sizes.sort((a, b) => a < b ? -1 : 1);
            console.log(`Smallest directory size to delete: ${sizes[0]}`);
        }
    }
}
exports.Day07 = Day07;
Day07.commandChangeDir = '$ cd ';
Day07.commandListDir = '$ ls';
Day07.regexDir = new RegExp(/dir (.+)/);
Day07.regexFile = new RegExp(/(\d+) (.+)/);
//# sourceMappingURL=Day07.js.map