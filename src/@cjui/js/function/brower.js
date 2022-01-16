export default {
    // ======================
    // browser.js
    // ======================

    /** 编码 操作
   * @param data 代表 编码对象
   **/
    // encode 编码 data - 编码对象 | type - 编码方式
    hex_encode(data, type = 'encodeURIComponent') {
        const encodeMethods = {
            encodeURI: (encodeData) => encodeURI(encodeData),
            encodeURIComponent: (encodeData) => encodeURIComponent(encodeData),
        }

        function replacePer(str) {
            return typeof str === 'string' ? str.replace('%', '$per$') : str;
        }

        if (typeof data !== 'object') {
            return encodeMethods[type](replacePer(data));

        } else if (Array.isArray(data)) {
            data.forEach(el => {
                el = encodeMethods[type](replacePer(el));
            });

        } else {
            for (let key in data) {
                data[key] = encodeMethods[type](replacePer(data[key]));
            }
        }

        return data;
    },

    /** localStorage 操作
   * @param name 代表 存储名
   * @param content 代表 存储内容
   **/
    // 存储localStorage
    setLocalStorage(name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    // 获取localStorage
    getLocalStorage(name) {
        if (!name) return;
        const content = window.localStorage.getItem(name);
        return JSON.parse(content);
    },
    // 删除localStorage
    removeLocalStorage(name) {
        if (!name) return;
        window.localStorage.removeItem(name);
    },
}