// pages/findCard/findCard.js
import Toast from '@vant/weapp/toast/toast';
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stdId:"",
    openid:""
  },
  reBind(){
    wx.reLaunch({
      url: '../reBind/reBind',
    })
  },
  findCard(){
    db.collection('findCard').where({
      stdId:this.data.stdId
    }).count().then(res => {
      console.log(res.total)
      if(res.total){
        wx.showToast({
          title: '有符合的校园卡号',    //胎死腹中的即时通讯
        })
      }
      else{
        db.collection('findCard').add({
          data:{
            cardId:this.data.stdId,
            time:db.serverDate()
          }
        })
      }
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
    Toast('若卡号无误请点击发布按钮发布寻卡启示，若卡号错误请点击重绑按钮重新绑定卡号');
    /* var info = wx.getStorageSync('user'); */
    /* var id = wx.getStorageSync('id'); */
    db.collection("user").where({
      _openid:this.data.openid
    }).get({
    success:res=>{
      this.setData({
        stdId:res.data[0].stdId
      });
    }
  });
  },

})