// pages/reBind/reBind.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stdId:"",
    phone:"",
    id:"",
    openid:""
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
    var info=wx.getStorageSync('user');
    db.collection("user").where({
      _openid:this.data.openid
    }).get({
      success:res=>{
        this.setData({
          id:res.data[0]._id
        })
      }
    })
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