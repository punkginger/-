// pages/myId/myId.js
import Toast from '@vant/weapp/toast/toast';
const db=wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
    nickName:"",
    phone:"",
    stdId:"",
    permission:false,
    openid:""
  },
  reBind(){
    wx.reLaunch({
      url: '../reBind/reBind',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'getOpenId',
      success:res=>{
        this.setData({
          openid:res.result.openid
        })
      }
    })
    Toast('点击电话或学号可重新绑定');
    getInfo:{
      var info=wx.getStorageSync('user')
      if(info){
        this.setData({
          avatarUrl:info.avatarUrl,
          nickName:info.nickName,
        })
      }
    }
    //console.log(info)  测试本地储存
    /* var id=wx.getStorageSync('id') */     //失败的尝试，试图将id存储在本地并读取，未果
    db.collection("user").where({
      _openid:this.data.openid
    }).get({
      success:res=>{
      this.setData({
        stdId:res.data[0].stdId,
        phone:res.data[0].phone,
        permission:res.data[0].permission
      })
      }
    })
  },
  myFind(){
    wx.reLaunch({
      url: '../myFind/myFind',
    })
  },
  myPost(){
    wx.reLaunch({
      url: '../myPost/myPost',
    })
  },
  myMsg(){
    wx.reLaunch({
      url: '../myMsg/myMsg',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})