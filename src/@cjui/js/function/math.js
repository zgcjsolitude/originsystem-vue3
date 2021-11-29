export default {
    // ======================
    // math.js
    // ======================
  
    /** Math简单运算
       * @param minued 代表 被加减数
       * @param operat 代表 运算符号
       * @param subtrahend 代表 运算加减数
       * @param point 代表 保留小数点
       * @param rate 代表 运算放大倍率
       **/ 
    operationMath(minued, operat = '+', subtrahend, point = 2, rate = 3) {
        minued = Number(minued).toFixed(rate);
        subtrahend = Number(subtrahend).toFixed(rate);

        let rateM = Math.pow(10, rate);

        minued = Number(minued) * rateM;
        subtrahend = Number(subtrahend) * rateM;

        let result;

        if (operat == '+') {
            result = ((minued + subtrahend) / rateM).toFixed(point);
        } else if (operat == '-') {
            result = ((minued - subtrahend) / rateM).toFixed(point);
        } else if (operat == '*') {
            result = ((minued * subtrahend) / rateM).toFixed(point);
        } else if (operat == '/') {
            result = (minued / (subtrahend * rateM)).toFixed(point);
        } else {
            return '请输入正确的运算符';
        }

        return result;
    },
}
