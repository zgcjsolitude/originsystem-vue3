
export default {
    // ======================
    // date.js
    // ======================
    /** 获得格式化日期
     * @param format 代表 返回的日期格式
     * @param day  代表 时间推移天数
     * @param date  代表 需要格式化的日期对象(不传则默认当前时间)
     **/
    dateFormat(format = 'yyyy-MM-dd', day = 0, date = new Date()) {
        try {
            // 时间推移 ========
            if (day != 0) {
                let s = Date.parse(date);
                s += 86400000 * day;
                date = new Date(s);
            }
            // 格式匹配 ========
            let h = date.getHours();
            if (h > 11) h -= 12;
            const opt = {
                "y+": date.getFullYear().toString(), // 年
                "M+": (date.getMonth() + 1).toString(), // 月
                "d+": date.getDate().toString(), // 日
                "H+": date.getHours().toString(), // 二十四小时制
                "h+": h.toString(), // 十二小时制
                "m+": date.getMinutes().toString(), // 分
                "s+": date.getSeconds().toString() // 秒
            };
            // ================

            let ret;
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(format);
                if (ret) {
                    if (k == 'W') {
                        format = format.replace(ret[1], week[opt[k]]);
                    } else {
                        format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
                    }
                }
            }
            return format;
        } catch (err) {
            return err;
        }
    },
    /** 日期格式转换，缺陷：第二格式必须与参数三完全匹配，即 23:55:6 格式为 HH:mm:s 不同于 23:55:16
     * @param format 代表 转换后的日期格式 
     * @param date  代表 需要格式化的日期
     * @param oldformat  代表 需格式化日期的原始格式
     **/
    changeDateFormat(format, date, oldformat) {
        // 格式匹配 ========
        const opt = {
            "y+": 0, // 年
            "M+": 0, // 月
            "d+": 0, // 日
            "H+": 0, // 二十四小时制
            "h+": 0, // 十二小时制
            "m+": 0, // 分
            "s+": 0 // 秒
        };
        // ================
        let retNew, retOld, retNum;
        for (let k in opt) {
            retNew = new RegExp("(" + k + ")").exec(format);
            if (retNew) {
                if (retNew[1] == 'HH' || retNew[1] == 'H') {
                    retOld = new RegExp("(H+)").exec(oldformat);
                    if (!retOld) retOld = new RegExp("(h+)").exec(oldformat);
                    if (retOld) {
                        retNum = date.substr(retOld.index, retOld[1].length);
                        retNum = Number(retNum).toString();
                        format = format.replace(retNew[1], (retNew[1].length == 1) ? retNum : (retNum.padStart(retNew[1].length, "0")));
                    } else {
                        format = format.replace(retNew[1], ('0').padStart(retNew[1].length, "0"));
                    }

                } else if (retNew[1] == 'hh' || retNew[1] == 'h') {
                    retOld = new RegExp("(h+)").exec(oldformat);
                    if (!retOld) retOld = new RegExp("(H+)").exec(oldformat);
                    if (retOld) {
                        retNum = date.substr(retOld.index, retOld[1].length);
                        if ((Number(retNum)) > 11) {
                            retNum = (Number(retNum) - 12).toString();
                        } else {
                            retNum = Number(retNum).toString();
                        }
                        format = format.replace(retNew[1], (retNew[1].length == 1) ? retNum : (retNum.padStart(retNew[1].length, "0")));
                    } else {
                        format = format.replace(retNew[1], ('0').padStart(retNew[1].length, "0"));
                    }

                } else {
                    retOld = new RegExp("(" + k + ")").exec(oldformat);
                    if (retOld) {
                        retNum = date.substr(retOld.index, retOld[1].length);
                        retNum = Number(retNum).toString();
                        format = format.replace(retNew[1], (retNew[1].length == 1) ? retNum : (retNum.padStart(retNew[1].length, "0")));
                    } else {
                        format = format.replace(retNew[1], ('0').padStart(retNew[1].length, "0"));
                    }
                }

            }
        }
        return format;
    },
    /** 秒数转为时间
     * @param time 代表 秒数
     * @param format 代表 转换后的格式
     **/
    countToTime(time, format = 'HH:mm:ss') {
        // 格式匹配 ========
        const opt = {
            "H+": Math.floor(time / 3600).toString(),  // 时
            "m+": Math.floor((time % 3600) / 60).toString(), // 分
            "s+": ((time % 3600) % 60).toString() // 秒
        };
        // ================

        let ret;
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(format);
            if (ret) {
                format = format.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
            }
        }
        return format;
    },
    /** 获取延后时间，跳过周末，时间 9:00 ~ 12:00 2:00 ~ 6:00
     * @param time 代表 参考时间 
     * @param step 代表 跳过时间 单位分钟 
     **/
    getWorkTime(time = new Date(), step = 180) {
        try {
            // ================
            let dateParse = Date.parse(time);
            let dateStart = new Date(dateParse);
            const dateMsg = {
                y: dateStart.getFullYear(),
                M: (dateStart.getMonth() + 1),
                d: dateStart.getDate(),
                H: dateStart.getHours(),
                m: dateStart.getMinutes(),
                s: dateStart.getSeconds(),
                w: dateStart.getDay()
            };
            // ================

            // 跳过时间超过3小时分段递归处理
            let newStep = 0;
            if (step > 180) {
                newStep = step - 180;
                step = 180;
            }

            // 判断是否超出年范围
            if (dateMsg.y < 1900 || dateMsg.y > 2049) return '时间超出测量年范围';

            let dateNew;
            // 判断处于周末
            if (dateMsg.w === 0 || dateMsg.w === 6) {
                let dayNumber = (dateMsg.w + 6) / 6;
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";

                dateNew = Date.parse(dateOld) + dayNumber * 24 * 60 * 60 * 1000 + step * 60 * 1000;
            }
            // 判断不处于周末当天时间范围
            else if (dateMsg.H < 8) {
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";

                dateNew = Date.parse(dateOld) + step * 60 * 1000;

            } else if (dateMsg.H >= 8 && dateMsg.H < 12) {
                let dateTarget = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 12:00:00";
                let isNewStep = dateParse + step * 60 * 1000 - Date.parse(dateTarget);
                let dateOld;
                if (isNewStep > 0) {
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 14:00:00";
                } else {
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 12:00:00";
                }

                dateNew = Date.parse(dateOld) + isNewStep;

            } else if (dateMsg.H >= 12 && dateMsg.H < 14) {
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 14:00:00";

                dateNew = Date.parse(dateOld) + step * 60 * 1000;

            } else if (dateMsg.H >= 14 && dateMsg.H < 18) {
                let dateTarget = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 18:00:00";
                let isNewStep = dateParse + step * 60 * 1000 - Date.parse(dateTarget);
                let dateOld, dayNumber;
                if (isNewStep > 0) {
                    dayNumber = 1;
                    if (dateMsg.w === 5) dayNumber = 3;
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";
                } else {
                    dayNumber = 0;
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 18:00:00";
                }

                dateNew = Date.parse(dateOld) + dayNumber * 24 * 60 * 60 * 1000 + isNewStep;

            } else if (dateMsg.H >= 18) {
                let dayNumber = 1;
                if (dateMsg.w === 5) dayNumber = 3;
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";

                dateNew = Date.parse(dateOld) + dayNumber * 24 * 60 * 60 * 1000 + step * 60 * 1000;
            }

            let dateEnd = this.dateFormat('yyyy-MM-dd HH:mm:ss', 0, new Date(dateNew));
            if (newStep === 0) {
                return dateEnd
            } else {
                return getWorkTime(dateEnd, newStep);
            }


        } catch (err) {
            return err;
        }
    },
    /** 获取工作时间延后时间，跳过周末和休息时间，工作时间 8:00 ~ 12:00 2:00 ~ 6:00
     * @param time   代表 参考时间 
     * @param step   代表 跳过时间 单位分钟
     **/
    getWorkTime(time = new Date(), step = 180) {
        try {
            // ================
            let dateParse = Date.parse(time);
            let dateStart = new Date(dateParse);
            const dateMsg = {
                y: dateStart.getFullYear(),
                M: (dateStart.getMonth() + 1),
                d: dateStart.getDate(),
                H: dateStart.getHours(),
                m: dateStart.getMinutes(),
                s: dateStart.getSeconds(),
                w: dateStart.getDay()
            };
            // ================

            // 跳过时间超过3小时分段递归处理
            let newStep = 0;
            if (step > 180) {
                newStep = step - 180;
                step = 180;
            }

            // 判断是否超出年范围
            if (dateMsg.y < 1900 || dateMsg.y > 2049) return '时间超出测量年范围';

            let dateNew;
            // 判断处于周末
            if (dateMsg.w === 0 || dateMsg.w === 6) {
                let dayNumber = (dateMsg.w + 6) / 6;
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";

                dateNew = Date.parse(dateOld) + dayNumber * 24 * 60 * 60 * 1000 + step * 60 * 1000;
            }
            // 判断不处于周末当天时间范围
            else if (dateMsg.H < 8) {
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";

                dateNew = Date.parse(dateOld) + step * 60 * 1000;

            } else if (dateMsg.H >= 8 && dateMsg.H < 12) {
                let dateTarget = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 12:00:00";
                let isNewStep = dateParse + step * 60 * 1000 - Date.parse(dateTarget);
                let dateOld;
                if (isNewStep > 0) {
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 14:00:00";
                } else {
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 12:00:00";
                }

                dateNew = Date.parse(dateOld) + isNewStep;

            } else if (dateMsg.H >= 12 && dateMsg.H < 14) {
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 14:00:00";

                dateNew = Date.parse(dateOld) + step * 60 * 1000;

            } else if (dateMsg.H >= 14 && dateMsg.H < 18) {
                let dateTarget = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 18:00:00";
                let isNewStep = dateParse + step * 60 * 1000 - Date.parse(dateTarget);
                let dateOld, dayNumber;
                if (isNewStep > 0) {
                    dayNumber = 1;
                    if (dateMsg.w = 5) dayNumber = 3;
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";
                } else {
                    dayNumber = 0;
                    dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 18:00:00";
                }

                dateNew = Date.parse(dateOld) + dayNumber * 24 * 60 * 60 * 1000 + isNewStep;

            } else if (dateMsg.H >= 18) {
                let dayNumber = 1;
                if (dateMsg.w = 5) dayNumber = 3;
                let dateOld = dateMsg.y + '-' + dateMsg.M + '-' + dateMsg.d + " 08:00:00";

                dateNew = Date.parse(dateOld) + dayNumber * 24 * 60 * 60 * 1000 + step * 60 * 1000;
            }

            let dateEnd = dateFormat('yyyy-MM-dd HH:mm:ss', 0, new Date(dateNew));
            if (newStep === 0) {
                return dateEnd
            } else {
                return getWorkTime(dateEnd, newStep);
            }

        } catch (err) {
            return err;
        }
    }
}