// pages/index/index.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */

   //不刷新一下无法显示，可能是缓存问题
  data: {
    activeKey:0,
    show:0,
    openid:"",
    post:[
      {title:"",
      pic:"",
      id:"",
      }
    ],
    find:[
      {
        title:"",
        pic:"",
        id:""
      }
    ]
  },
  onChange(event){
    this.setData({
      show:event.detail
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
    db.collection('findOthers').get().then(res=>{
      console.log(res.data)
      this.setData({
        find:res.data,
      })
      //这里返回的数据里我需要的有标题和fileIDs，fileIDs无法作为url显示图片，因此需要下载
      wx.cloud.downloadFile({
      fileIDs:'res.data[0].fileIDs[0]',
      success:e=>{
        var re="find[0].pic"
        this.setData({
        [re]:e.tempFilePath
        })
      }
      })//这里大bug，无法下载fileIDs对应的图片，写的时候不知道如何修改data中数组里面的值，用find[0]肯定是不对的
    })
    db.collection('postOthers').get().then(res=>{
      this.setData({
        post:res.data
      })
    })
  },
  
  toFind(){
    wx.reLaunch({
      url: '../findDtl/findDtl',
    })
  },
  toPost(){
    wx.reLaunch({
      url: '../postDtl/postDtl',
    })
  }
})