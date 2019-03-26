var teacherData = {
  name: '',
  job: '',
  partTimeJob: '',
  rewardStandard:'',
  basicStandard:'',
  facultyLoad:'',
  classStandard:'',
  teachingPerf:'',
  adminPerf:'',
  postCoe:'',
  jobPerf:'',
  nonWorkPerf:'',
  reissue:'',
  deduct:'',
  schoolTotal:'',
};
var myhone='';

Page({
  data: teacherData,
  //返回首页
  getBack: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //动态更新用户电话号码
    this.setData({
      dates: options.dates,
      userphone: options.userphone
    })
    //将日期、电话定义为请求参数
    var datesNum = options.dates;
    //console.log(datesNum)
    var phoneNum = options.userphone;
    //console.log(phoneNum)
    var that = this;
    //数据请求
    wx.request({
      url: "https://gzcx.huxinchun.com/payroll/upload",
      //请求参数 
      data: {
        jsonMyphone:phoneNum,
        jsonDate:datesNum
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.name == null){
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '暂无用户数据',
          success: function (res) {
            wx.navigateTo({
              url: '../index/index'
            })
          }
        }) 
      }else{
        //提示信息
        wx.showToast({ title: "成功", icon: 'success', duration: 800, })
      //渲染列表
        that.setData({
          name: res.data.name,
          job: res.data.job,
          partTimeJob: res.data.partTimeJob,
          rewardStandard:res.data.rewardStandard,
          basicStandard:res.data.basicStandard,
          facultyLoad:res.data.facultyLoad,
          classStandard:res.data.classStandard,
          teachingPerf:res.data.teachingPerf,
          adminPerf: res.data.adminPerf,
          postCoe:res.data.postCoe,
          jobPerf:res.data.jobPerf,
          nonWorkPerf:res.data.nonWorkPerf,
          reissue:res.data.reissue,
          deduct:res.data.deduct,
          schoolTotal:res.data.schoolTotal
        })
        }
      },
      fail: function () {
        wx.showToast("获取失败！")
      },
    })
  }

})
