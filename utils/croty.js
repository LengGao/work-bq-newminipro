import cryptoJS from './common.util'
let uuid = wx.getStorageSync("user_info").uuid
let key = 'c9ddd89b513f3385'
class crypto {
    constructor(data){
        this.enc(data) //加密方法
        this.dec(data) //解密方法
    }
    enc(e){
        cryptoJS.decrypt(e,key,uuid)
    }
    dec(e){
        cryptoJS.decrypt(e,key,uuid)
    }
}
