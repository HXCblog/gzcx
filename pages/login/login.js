//login.js
//获取应用实例
const app = getApp()
var phoneObj = "";

Page({
  data: {
    tokenobj: '',
    phoneObj: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //通过绑定手机号登录
  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    var codeObj = "";
    var that = this;
    //执行Login
    wx.login({
      success: res => {
        //console.log('code转换', res.code); 
        //用code传给服务器调换session_key
        wx.request({
          url: ' ', //后台服务端解密文件接口地址
          data: {
            appid: "",//小程序appid
            secret: "",//小程序secret
            code: res.code,
            encryptedData: telObj,
            iv: ivObj
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          //成功返回数据
          success: function (res) {
            phoneObj = res.data.phoneNumber;
            //console.log("手机号=", phoneObj)
            //存储数据并准备发送给下一页使用
            wx.setStorage({  
              key: "phoneObj",
              data: res.data.phoneNumber,
            })
          }
        })

        //是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          //用户点击拒绝
          wx.showModal({
            title: '提示',
            content: '查询服务需授权获取手机号',
            success: function (res) {
              //模态框选择
              if (res.confirm) {
                //确定 返回登录界面进行重新授权
                wx.navigateTo({
                  url: '../login/login',
                })
              } else {
                //取消 返回登录界面
                wx.navigateTo({
                  url: '../login/login',
                })
              }

            }
          })
        }

        //授权获取手机号成功，则跳转至首页，并传参
        else{
        //如果手机号信息不为空直接跳转
        if (phoneObj !== '') {               
            wx.navigateTo({
              url: '../index/index',
            })
        }
        else{
            //提示信息
            wx.showToast({ title: "登录成功", icon: 'success', duration: 2000, })
            //待获取手机号信息后延时跳转                
            setTimeout(function () {
              wx.navigateTo({
                url: '../index/index',
              })
            }, 2000)
        }
         
        }
      }
    });

  }
})
