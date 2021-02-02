const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stdId:""
  },
  idBlur(){
    db.collection('postCard').where({
      stdId:this.data.stdId
    }).count().then(res => {
      console.log(res.total)
      if(res.total){
        wx.showToast({
          title: '有符合的校园卡',
        })      //这里本来想实现跳转实时通讯，但是实时通讯没有做出来
      }
      else{
        wx.showToast({
          title: '没有符合的校园卡',
        })
        db.collection('postCard').add({
          data:{
            stdId:this.data.stdId,
            time:db.serverDate()
          }
        })
      }
    })

    
  },
  back(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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