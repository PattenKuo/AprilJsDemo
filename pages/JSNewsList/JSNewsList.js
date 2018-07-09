// pages/JSNewsList/JSNewsList.js
var interval = require('../../utils/interval.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    JSNewsList: [],   //Store JS News List
    delUrl: '',   //delete-- Server Route
    getUrl: 'https://hn.algolia.com/api/v1/search_by_date?query=javascript' //get-- Server Route
  },

  //request Target JSNewsList
  getJSNewsList: function(){
    var that = this;
    wx.request({
      url: that.data.getUrl,
      method: 'Get',
      header: {
        //dataType:x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        let JSNewsList = that.data.JSNewsList;
        JSNewsList = res.data.hits;
        var temp = [];   //Temporary data storage
        var JSNewsListLength = JSNewsList.length;

        //discard "null" value
        for (var i = 0, j = 0; i < JSNewsListLength; i++){
          if ((null != JSNewsList[i].story_title) || (null != JSNewsList[i].title)) {
            temp[j] = JSNewsList[i];
            j++;
          }else{
            console.log("double null");
          }
        }

        var tempLength = temp.length;

      //select Display_title show in JSNewsList.wxml
        for (var i = 0; i < tempLength; i++){
          //Get Time Interval 
          var MytimeStamp = temp[i].created_at;
          var myInterval = interval.getDateDiff(MytimeStamp);
          temp[i].myInterval = myInterval;

          if (null != temp[i].story_title){ 
            temp[i] = temp[i];
            temp[i].Display_title = temp[i].story_title;
          }else{
            if (null != temp[i].title) {
              temp[i] = temp[i];
              temp[i].Display_title = temp[i].title
            }
          }
        }
      //tap idUrl to target page idUrl
        for (var i = 0; i < tempLength; i++) {
          if (null != temp[i].story_url) {
            temp[i].idUrl = temp[i].story_url;
          }else{
            if (null != temp[i].url){
              temp[i].idUrl = temp[i].url;
            }
            else{
              //Set a default page url if necessary
              temp[i].idUrl = "https://mortoray.com/2018/07/09/i-dont-know-how-to-create-a-website/";
            }
          }
        }

        console.log("temp", temp);
        

        JSNewsList = temp;
        that.setData({
          JSNewsList: JSNewsList
        })
      },
      fail: function(res){
        console.log("Request Failed!")
      },
      complete: function(res){
        console.log("Request Completed!")
      }
    })
  },
  //to delete target item from Server Database
  ToDelte: function (options) {
    var that = this;
    var objectID = options.currentTarget.dataset.newslistObjectid;

    wx.request({
      url: that.data.delUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      method: "POST",
      data: objectID,  //target item objectID,suggest ["deleted":true/false]
      success: function (res) {
        
      },
      fail: function (res) {

      },
      complete: function (res) {

      },
      
    })
  },
  //navigator to url= "../newDtl/newDtl?idUrl={{ item.idUrl }}"
  ToNewDtl: function (options) {
    var idUrl = options.currentTarget.dataset.newslistIdurl;
    wx.navigateTo({
      url: '../newDtl/newDtl?idUrl=' + idUrl,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getJSNewsList();
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