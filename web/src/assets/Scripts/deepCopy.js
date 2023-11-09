export default function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // 如果是原始值或null，直接返回
    }

    if (Array.isArray(obj)) {
        // 如果是数组，创建一个新数组并递归复制每个元素
        const newArray = [];
        for (let i = 0; i < obj.length; i++) {
            newArray[i] = deepCopy(obj[i]);
        }
        return newArray;
    }

    if (obj instanceof Object) {
        // 如果是对象，创建一个新对象并递归复制每个属性
        const newObj = {};
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = deepCopy(obj[key]);
            }
        }
        return newObj;
    }
}