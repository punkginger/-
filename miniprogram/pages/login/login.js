
const app = getApp()
const db=wx.cloud.database()
import Toast from '@vant/weapp/toast/toast';

Page({
 
  data: {
    motto: '请点击“获取头像昵称”以登录',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    id:"",
    stdId:"",
    phone:'',
    openid:""
  },


  // 事件处理函数
  onLoad() {
    wx.cloud.callFunction({
      name:'getOpenId',
      success:res=>{
        this.setData({
          openid:res.result.openid
        })
      }
    })
    
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



  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(e.detail.userInfo)
    Toast('若不输入校园卡号则无法使用寻卡功能');
    db.collection("user").add({
      data:{
        permission:false,
        nickName:app.globalData.userInfo.nickName,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        gender:app.globalData.userInfo.gender,
        stdId:"0",
        phone:"0"
      }
    })
    db.collection("user").where({
      _openid:this.data.openid
    }).get({
      success:res=>{
        this.setData({
          id:res.data[0]._id
        })
      }
    })
     wx.setStorageSync(
      "user",this.data.userInfo
    )
  },
  idBlur(){
    db.collection("user").doc(this.data.id).update({
      data:{
        stdId:this.data.stdId
      }
    })
  },
  phBlur(){
    db.collection("user").doc(this.data.id).update({
      data:{
        phone:this.data.phone
      }
    })
  },

  //点击跳转的事件
  bindViewTap() {
    wx.showLoading({
      title: '数据折寿中...',
      mask:true
    })
    wx.reLaunch({
      url: '../find/find'
    }).then(
      wx.hideLoading()
    )
    /* wx.setStorageSync('id', this.data.id) */    //这样无法存值，怪
    
  },
})
