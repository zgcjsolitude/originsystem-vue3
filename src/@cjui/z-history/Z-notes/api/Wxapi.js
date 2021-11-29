export default {
  // 监控微信浏览器
  isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  // 获取url参数
  getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    if (r != null) return decodeURIComponent(r[2]);
    return '';
  },
  // 获取openid
  getWeixinOpenID() {
    return new Promise((resolve, reject) => {
      if (!this.isWeiXin()) return reject();

      alert("location获取到:" + window.location.href);
      alert("openid获取到:" + sessionStorage.openid);
      if (sessionStorage.openid) return resolve();

      alert("code获取到:" + this.getUrlParam('code'));
      if (this.getUrlParam('code')) {
        Wsapi.HM_Return_OpenID({ code: this.getUrlParam('code') }).then(({
          data
        }) => {
          if (data.code.toString() == "200") {
            sessionStorage.openid = data.openid;
            alert(JSON.stringify(data))
            resolve();
          } else {
            Message.error(data.msg);
            reject();
          }
        }).catch((err) => {
          Message.error('获取openid请求异常');
          reject(err);
        })

      } else {
        Wsapi.HM_Return_AppID().then(({ data }) => {
          if (data.code.toString() == '200') {
            let APPID = data.msg;
            alert("APPID获取到:" + APPID);
            let local = window.location.href;
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=" + escape(local) + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
          } else {
            Message.error(data.msg);
            reject();
          }
        }).catch((err) => {
          Message.error('获取APPID请求异常');
          reject(err);
        })
      }

    });
  },
  //立即支付事件
  payEvent() {
    let obj = {
      danhao: this.zhangdanhao,
      openid: sessionStorage.openid,
    };
    Wxapi.HM_Return_PayParameters(obj)
      .then(({ data }) => {
        alert("支付所需参数:" + JSON.stringify(data));
        if (data.appId && data.appId != "") {
          this.callpay(data);
        } else {
        }
      })
      .catch(() => {
        this.$message.error("调支付失败异常....");
      });
  },
  //调起支付
  callpay(params) {
    try {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.jsApiCall(params),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.jsApiCall(params));
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.jsApiCall(params)
          );
        }
      } else {
        this.jsApiCall(params);
      }
    } catch (e) {
      this.$message.error("支付异常!");
    }
    window.event.returnValue = false;
    return false;
  },
  //开始支付
  jsApiCall(params) {
    try {
      WeixinJSBridge.invoke("getBrandWCPayRequest", params, (res) => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          let url = window.location.href.split("#");
          window.location.href = url[0] + "dingdanList";
          this.$message.success("微信支付成功!");
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
          this.$message.error("用户取消支付!");
        } else {
          this.$message.error(
            "支付失败!",
            +res.err_code + res.err_desc + res.err_msg
          );
        }
      });
    } catch (e) {
      this.$message.error("支付异常!");
    }
  },
}