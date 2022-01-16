export default {
    // ======================
    // ajax.js
    // ======================

    /** ajax 封装
   * @param type 代表 请求方式
   * @param url  代表 请求url路径
   * @param data 代表 发送数据
   * @param async 代表 请求是否异步
   * @param success 代表 下载数据成功以后执行的函数
   * @param error   代表 下载数据失败以后执行的函数
   **/
    $ajax({ type = "get", url, data, async = true, success, error }) {

        function querystring(obj) {
            var str = '';
            for (var attr in obj) {
                str += attr + "=" + obj[attr] + "&";
            }
            return str.substring(0, str.length - 1);
        }

        var xhr = null;
        try {
            xhr = new XMLHttpRequest();
        } catch (error) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP")
        }

        if (type == "get" && data) url += "?" + querystring(data);

        xhr.open(type, url, async);

        if (type == "get") {
            xhr.send();
        } else {
            // 设置提交数据格式
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            data ? xhr.send(querystring(data)) : xhr.send();
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    if (success) success(JSON.parse(xhr.responseText));
                } else {
                    if (error) error("Error：" + xhr.status);
                }
            }
        }
    }
}