export default {
    // ======================
    // array.js
    // ======================
    /** 查找数组内指定项，返回查找项，未查找到返回 null
     * @param targetArr 代表 源数组
     * @param queryItem  代表 查找时参考的值(数组为字符串或数字时时传入字符串或数字, 为对象时传入参考的键值对)
     **/
    queryOneArray(targetArr, queryItem) {
        if (!Array.isArray(targetArr)) return '传入的源数组不是数组！';
        if (targetArr.length == 0) return null;

        let index = -1;
        if (typeof targetArr[0] == 'string' || typeof targetArr[0] == 'number') {
            if (typeof queryItem == 'string' || typeof queryItem == 'number') {
                index = targetArr.indexOf(queryItem);
            } else {
                console.error('传入的参考值格式不符！')
                return null;
            }

        } else if (typeof targetArr[0] == 'object') {
            if (typeof queryItem != 'object') return '传入的参考值不是对象！';

            let keyList = Object.keys(queryItem);
            for (let i = 0; i < targetArr.length; i++) {
                let targetItem = targetArr[i];
                let result = true;
                for (let j = 0; j < keyList.length; j++) {
                    let keyName = keyList[j];
                    if (targetItem[keyName] !== queryItem[keyName]) {
                        result = false;
                        break;
                    }
                }
                if (result) {
                    index = i;
                    break;
                }
            }
        }

        return index >= 0 ? targetArr[index] : null
    }, 
    /** 删除数组内指定项(只删除一次)，返回删除后的数组，未查找到返回 false
     * @param targetArr 代表 源数组
     * @param delItem  代表 删除时参考的值(数组为字符串或数字时时传入字符串或数字, 为对象时传入参考的键值对)
     **/
    deleteOneArray(targetArr, delItem) {
        if (typeof targetArr != 'object') return '传入的源对象不是数组！';
        if (targetArr.length == 0) return targetArr;

        let index = -1;
        if (typeof targetArr[0] == 'string' || typeof targetArr[0] == 'number') {
            if (typeof delItem == 'string' || typeof delItem == 'number') {
                index = targetArr.indexOf(delItem);
            } else {
                return targetArr = ['传入的参考值格式不符！'];
            }

        } else if (typeof targetArr[0] == 'object') {
            if (typeof delItem != 'object') return targetArr = ['传入的参考值不是对象！'];

            let keyList = Object.keys(delItem);
            for (let i = 0; i < targetArr.length; i++) {
                let targetItem = targetArr[i];
                let result = true;
                for (let j = 0; j < keyList.length; j++) {
                    let keyName = keyList[j];
                    if (targetItem[keyName] !== delItem[keyName]) {
                        result = false;
                        break;
                    }
                }
                if (result) {
                    index = i;
                    break;
                }
            }
        }

        if (index >= 0) {
            targetArr.splice(index, 1);
        } else {
            targetArr = false;
        }

        return targetArr;
    },
    /** 随机打乱数组，返回打乱后的数组
     * @param array 代表 源数组
     **/
    upsetArr(array) {
        for (let i = 0; i < array.length; i++) {
            let index = parseInt(Math.random() * (array.length - 1));
            let tempValue = array[i];
            array[i] = array[index];
            array[index] = tempValue;
        }
        return array;
    },
    /** 简单数组的去重
     * @param array 代表 源数组
     **/
    unique(array) {
        var n = [];
        for (var i = 0; i < array.length; i++) {
            if (n.indexOf(array[i]) == -1) n.push(array[i]);
        }
        return n;
    },
}