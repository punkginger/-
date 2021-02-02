// pages/findDtl/findDtl.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    position:"",
    content:"",
    qq:"",
    openid:"",
    pic:"",
    avatarUrl:"",
    nickName:"",
    fileIDs:""
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
    db.collection('user').where({
      data:{
        _openid:this.data.openid
      }
    }).get({
      success:res=>{
        this.setData({
          avatarUrl:res.data[0].avatarUrl,
          nickName:res.data[0].nickName
        })
      }
    })
    db.collection('findOthers').where({
      data:{
        _openid:this.data.openid
      }
    }).get({
      success:res=>{
        this.setData({
          title:res.data[0].title,
          content:res.data[0].content,
          qq:res.data[0].qq,
          position:res.data[0].position,
          fileIDs:res.data[0].fileIDs
        })          //这里有bug，一个用户可能会发送很多条失物招领/寻物启事，不能用openid检索想要的数据，用id应该是可以的，但是我不知道如何获取id
                    //因为这个界面时点击index里面的一个元素转过来的，或许可以在转过来的时候带一个参数，但是我不知道该怎么写
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