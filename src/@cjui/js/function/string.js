export default {
    // ======================
    // string.js
    // ======================
    /** 用户信息验证，返回布尔值
     * @param info 代表 要校验的信息
     * @param sign 代表 要校验信息的规则 phone-手机号|email-邮箱|IDcard-身份证
     **/ 
    isInfoReg(info, sign) {
        let infoReg;
        switch (sign) {
            case 'phone':
                infoReg = /^[1][0-9]{10}$/;
                break
            case 'email':
                infoReg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
                break
            case 'IDcard':
                infoReg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
                break
            default:
                return `暂未提供对${sign}的支持`;
        }

        return infoReg.test(info) ? true : false;
    },
    /** 表单校验规则，返回布尔值
     * @param info 代表 要校验的信息
     * @param sign 代表 要校验信息的规则（传入规则数组或者单个规则字符串） noZHCN-不能输入中文|noSpace-首尾端不能输入空格|numStr-必须包含数字和字母
     **/
    isFormatReg(info, array) {
        let result;

        function formatReg(sign) {
            switch (sign) {
                case 'numStr':
                    /(?=.*[\d])?(?=.*[a-zA-Z])(?=.*[\d])/.test(info) ? result = true : result = false;
                    break
                case 'noZHCN':
                    /[\u4E00-\u9FA5]/g.test(info) ? result = false : result = true;
                    break
                case 'noSpace':
                    /^ +| +$/g.test(info) ? result = false : result = true;
                    break
                default:
                    return result = `暂未提供对${sign}的支持`;
            }
        }

        if (typeof array == 'string') {
            formatReg(array);
        } else if (typeof array == 'object') {
            array.forEach(sign => { formatReg(sign) });
        } else {
            return '请传入有效的格式信息';
        }

        return result;
    },
    /** 获取url参数
     * @param name 代表 要获取的参数名
     **/
    getUrlParam(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        if (r != null) return decodeURIComponent(r[2]);
        return '';
    },
    /** 生成随机字符串
     * @param type - [capitalLetter / lowercaseLetter / number] 随机字符串类型
     * @param length - 生成随机字符串长度
     **/
    randomWord(type = ['capitalLetter', 'lowercaseLetter', 'number'], length = 3) {
        const strOpt = {
            'capitalLetter': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            'lowercaseLetter': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
            'number': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        }
        
        let strMap = [];
        type.forEach(key => {
            strMap = [...strMap, ...strOpt[key]]
        });
    
        let str = "";
        for (let i = 0; i < length; i++) {
            let index = Math.round(Math.random() * (strMap.length - 1));
            str += strMap[index];
        }
        
        return str
    }
}