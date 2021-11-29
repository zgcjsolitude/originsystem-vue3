export default {
    // ======================
    // function.js
    // ======================

    /** await 异步错误处理
     * @param promise 代表 函数
     **/
    awaitTo(promise) {
        return promise.then(data => {
            return [null, data];
        })
            .catch(err => [err]);
    },
}