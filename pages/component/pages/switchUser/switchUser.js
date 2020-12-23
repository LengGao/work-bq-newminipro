let app = getApp();
var api = require("../../../../api.js")
Page({
    data: {
        mobile:[],
        token:'',
        uid:0,
        local_mobile:[],
        loca_admin:{},
        user_info:{}
    },
    //从输入框获取手机号；
    mobileInput:function(e){
        this.setData({
            mobile: [e.detail.value]
          })
    },
    //切换手机号
    switchMobile:function(e){
        this.setData({
            mobile: [e.currentTarget.dataset.mobile]
          })
          this.switchInput();
    },
    //提交数据；
    switchInput:function(){
        //将当前手机存储到本地；       
        if (this.data.mobile.length==0||this.data.mobile[0].length!=11){
            wx.showToast({
              title: '请输入正确的手机号',
              duration: 3000,           
              mask: true,
              icon:"none"
            })
            return false;
        }
        let has_mobile=0;
        if (typeof(this.data.local_mobile)!="undefined"||!this.data.local_mobile){
            this.data.local_mobile.forEach(e => {
                console.log(e);
                if (e==this.data.mobile[0]){
                    has_mobile=1;
                }
            });
        }
        console.log(has_mobile);
        console.log(this.data.mobile);
        //存储；
        if (has_mobile==0){
            //本地没有该手机号,存入；
            this.data.local_mobile.push.apply(this.data.local_mobile,this.data.mobile);
        }
        //继续存储；
           wx.setStorage({
              data:this.data.local_mobile,
              key: 'local_mobile',
            })
        console.log(this.data.local_admin);
        app.encryption({
            url: api.user.switchUser,
            data: {
                uid:this.data.local_admin.is_uid,
                token:this.data.local_admin.is_token,
                mobile:this.data.mobile[0],
                uuid:this.data.local_admin.is_uuid
            },
            method: 'POST',
            dataType: "json",
            success: function (res) {
             console.log(res);
                if (res.data.code==200){
           
               //存储个人信息后；跳到res个人中心；
               wx.setStorageSync("user_info", {
                  nickname: res.data.data.user_nicename,
                  avatar_url: res.data.data.user_img,
                  uid: res.data.data.uid,
                  uuid: res.data.data.uuid,
                  token: res.data.data.token,
                  mobile:res.data.data.telphone
                });
                //存储不再切换回本用户，1小时内有效；；
                wx.setStorageSync("limit_admin",new Date().getTime());
                wx.reLaunch({
                    url: '/pages/personal-center/personal-center'
                    })
                }else{
                    console.log(res);
                    wx.showToast({
                        title:res.data.message,
                        duration: 3000,           
                        mask: true,
                        icon:"none"
                        })
                        return false;
                }
            },
            fail:function(res){
                wx.showToast({
                    title: "请求失败",
                    duration: 3000,           
                    mask: true,
                    icon:"error"
                    })
                    return false;
            }
          })        
    },
    onLoad: function () {
        let local_admin=wx.getStorageSync('local_admin');//本地存储的管理员信息；
        let local_mobile=wx.getStorageSync('local_mobile')?wx.getStorageSync('local_mobile'):[];//本地存储的手机号
        let user_info=wx.getStorageSync('user_info');
        this.setData({
            local_admin:local_admin,
            local_mobile:local_mobile,
            user_info:user_info
        })
    }
});