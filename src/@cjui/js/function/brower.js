
export default {
    // ======================
    // browser.js
    // ======================

    /** 编码 操作
   * @param data 代表 编码对象
   **/
    // encodeURI 编码字符串
    hex_escape(data) {
        let datalist = data;

        if (typeof datalist != 'object') return escape(datalist);

        if (Array.isArray(datalist)) {
            for (let i = 0; i < datalist.length; i++) {
                for (let a in datalist[i]) {
                    datalist[i][a] = escape(datalist[i][a])
                }
            }
        } else {
            for (let a in datalist) {
                datalist[a] = escape(datalist[a])
            }
        }

        return datalist;
    },
    // encodeURI 解码字符串
    hex_unescape(data) {
        let datalist = data;

        if (typeof datalist != 'object') return unescape(datalist);

        if (Array.isArray(datalist)) {
            for (let i = 0; i < datalist.length; i++) {
                for (let a in datalist[i]) {
                    datalist[i][a] = unescape(datalist[i][a])
                }
            }
        } else {
            for (let a in datalist) {
                datalist[a] = unescape(datalist[a])
            }
        }

        return datalist;
    },
    // encodeURI 编码字符串
    hex_encodeURI(data) {
        let datalist = data;

        if (typeof datalist != 'object') return encodeURI(datalist);

        if (Array.isArray(datalist)) {
            for (let i = 0; i < datalist.length; i++) {
                for (let a in datalist[i]) {
                    datalist[i][a] = encodeURI(datalist[i][a])
                }
            }
        } else {
            for (let a in datalist) {
                datalist[a] = encodeURI(datalist[a])
            }
        }

        return datalist;
    },
    // encodeURI 解码字符串
    hex_decodeURI(data) {
        let datalist = data;

        if (typeof datalist != 'object') return decodeURI(datalist);

        if (Array.isArray(datalist)) {
            for (let i = 0; i < datalist.length; i++) {
                for (let a in datalist[i]) {
                    datalist[i][a] = decodeURI(datalist[i][a])
                }
            }
        } else {
            for (let a in datalist) {
                datalist[a] = decodeURI(datalist[a])
            }
        }

        return datalist;
    },
    // encodeURIComponent 编码字符串
    hex_encodeURIComponent(data) {
        let datalist = data;

        if (typeof datalist != 'object') return encodeURIComponent(datalist);

        if (Array.isArray(datalist)) {
            for (let i = 0; i < datalist.length; i++) {
                for (let a in datalist[i]) {
                    datalist[i][a] = encodeURIComponent(datalist[i][a])
                }
            }
        } else {
            for (let a in datalist) {
                datalist[a] = encodeURIComponent(datalist[a])
            }
        }

        return datalist;
    },
    // encodeURIComponent 解码字符串
    hex_decodeURIComponent(data) {
        let datalist = data;

        if (typeof datalist != 'object') return decodeURIComponent(datalist);

        if (Array.isArray(datalist)) {
            for (let i = 0; i < datalist.length; i++) {
                for (let a in datalist[i]) {
                    datalist[i][a] = decodeURIComponent(datalist[i][a])
                }
            }
        } else {
            for (let a in datalist) {
                datalist[a] = decodeURIComponent(datalist[a])
            }
        }

        return datalist;
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