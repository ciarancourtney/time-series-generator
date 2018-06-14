export function objArrayToArray(array: object[]) {
    return array.map(function (obj: any) {
        return Object.keys(obj).sort().map(function (key) {
            return obj[key];
        });
    });
}
