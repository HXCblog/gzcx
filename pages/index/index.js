//index.js
var util = require('../../utils/date.js');
//获取应用实例
const app = getApp()
 
Page({
  data: {
    userphone:'',
    dates: '',
    motto: '教师工资绩效快捷查询系统',
    notice:'提示:您可以修改日期查询其他月份工资'
  },

  onReady: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间    
    var time = util.formatTime(new Date());    
    // 再通过setData更改Page()里面的data，动态更新页面的数据    
    this.setData({dates: time});

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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

  //页面载入获取手机号
  onLoad: function (options) {
    // 调用函数时，获取本地phoneObj缓存数据，返回值是手机号
    var phonenum = wx.getStorageSync('phoneObj');
   //如果获取手机号为空跳转至登录界面
    if(phonenum == ''){
      wx.showModal({
        title: '链接超时',
        showCancel: false,
        content: '请重新登录',
        success: function (res) { 
          wx.navigateTo({
            url: '../login/login'
          })
        }
      }) 
     
    }else{
      // 再通过setData更改Page()里面userphone，动态更新页面的数据    
      this.setData({ userphone: phonenum });
    } 
  },
  //点击日期组件确定事件  
  bindDateChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  //跳转至帮助界面
  gethelp:function(e){
    wx.navigateTo({
      url: '../help/help'
    })
  }

})
