import config from '../../config.js';

function a(a, t, e, r, o) {
    var d = r, n = {}, s = wx.getStorageSync("tabbar_module"), i = !1, c = 0;
    -1 != s.indexOf(o) && (i = !0, c = s.indexOf(o));
    var u = {};
    u.list = a, u.tabbar_show = i, u.current_key = c, n[t] = u;
     d.setData({
        // bindData: n
        bindData:{
          tabBar: {
            tabbar_show: true,
            current_key: c,
            list:[
                {
                act_img: config.imgUrl + "home-1.png",
                img: config.imgUrl + "home.png",
                  moduleselect: "home",
                  name: "我的课程",
                  sequence: "1",
                  url: "/pages/index/index",
                },
                {
                  act_img: config.imgUrl +"shop-1.png",
                  img: config.imgUrl +"shop.png",
                  moduleselect: "shoponline",
                  name: "课程",
                  sequence: "2",
                  // url: "/pages/mall/mall",
                  url: "/pages/secondary/secondary",
                },
                {
                  act_img: config.imgUrl +"tiku-1.png",
                  img: config.imgUrl +"tiku.png",
                  moduleselect: "tiku",
                  name: "题库",
                  sequence: "3",
                  // url: "/pages/tiku/tiku",
                  url: "/pages/tikuList/tikuList",
                },
                {
                  act_img: config.imgUrl +"user-1.png",
                  img: config.imgUrl +"user.png",
                  moduleselect: "usercenter",
                  name: "我的",
                  sequence: "4",
                  url: "/pages/personal-center/personal-center",
                },
            ]
          }
        } 
    });
}

function t(a, t, o, d, n) {
  a(e.data, t, o, d, n);
  return;
    r.request({
        url: e.default.tabbar,
        method: "POST",
        data: {},
        success: function(e) {
            if (wx.hideLoading(), 0 == e.errcode) {
                wx.setStorageSync("tabbar", e.data);
                var r = [];
                for (var s in e.data) r.push(e.data[s].moduleselect);
                wx.setStorageSync("tabbar_module", r), a(e.data, t, o, d, n);
            } else 2 == e.code && wx.showModal({
                title: "提示",
                content: e.msg,
                showCancel: !1
            });
        }
    });
}

var e = require("../../api.js"), r = getApp();
module.exports = {
    tabbar: function() {
      let arg =  arguments[3];
      let moduleselect = ['home', 'shoponline','usercenter'];
      let current_key = 0;
      moduleselect.forEach((val,index) => {
        console.log(index,val)
        if (arg == val){
          current_key = index;
        }
      })
      arguments[2].setData({
        // bindData: n
        bindData: {
          tabBar: {
            tabbar_show: true,
            current_key,
            list: [
              {
                act_img: '../../images/12.png',
                img: '../../images/11.png',
                moduleselect: "home",
                name: "我的课程",
                sequence: "1",
                url: "/pages/index/index",
              },
              {
                act_img: '../../images/14.png',
                img:'../../images/13.png',
                moduleselect: "shoponline",
                name: "首页",
                sequence: "2",
                url: "/pages/secondary/secondary",
              },
              {
                act_img: '../../images/16.png',
                img: '../../images/15.png',
                moduleselect: "usercenter",
                name: "个人中心",
                sequence: "3",
                url: "/pages/personal-center/personal-center",
              }
            ]
          }
        }
      });

        // t(a, arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "tabdata", arguments[1], arguments[2], arguments[3]);
    }
};