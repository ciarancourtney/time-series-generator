function interpolate(str: string, object: any): any {
    let matches = str.match(/{([^{}]*)}/);
    if (matches && object[matches[1]]) {
        return object[matches[1]];
    } else {
        return str;
    }
}

export function recursiveInterpolate(source: object, valueObj: object) {
    let copy = JSON.parse(JSON.stringify(source));

    function treeWalker(obj: any) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                switch (typeof obj[key]) {
                    case 'object':
                        treeWalker(obj[key]);
                        break;
                    case 'string':
                        var sup = interpolate(obj[key], valueObj);
                        obj[key] = sup;
                }
            }
        }
    }

    treeWalker(copy);
    return copy;
}

export function missingValues(obj: object, values: string[]): string[] {
    let found: any = {};
    values.forEach(value => {
        found[value] = false;
    });

    function treeWalker(obj: any) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                switch (typeof obj[key]) {
                    case 'object':
                        treeWalker(obj[key]);
                        break;
                    case 'string':
                        if (values.indexOf(obj[key]) > -1) {
                            found[obj[key]] = true;
                        }
                }
            }
        }
    }

    treeWalker(obj);
    let missingValues: string[] = [];
    Object.keys(found).forEach(key => {
        if (found[key] === false) {
            // @ts-ignore
            missingValues.push(key);
        }
    });
    return missingValues;
}
