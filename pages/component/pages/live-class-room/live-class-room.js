import plv from '../../../../lib/polyv-sdk/index';

Page({
  data: {
    indexTab: 2,
    options: {},
    detail: {},
    videoId: '',
    pptSize: {
      height: 700,
      width: 750
    },
    pptDelayTime: 5000,
    top: 0,
    left: 0,
    screen: {}
  },
  onLoad(options) {
    let user_id=wx.getStorageSync("user_id");
    options.userid=user_id
   
    wx.getSystemInfo({
      success: ({ pixelRatio, windowWidth, windowHeight }) => {
        this.setData({
          pptSize: { width: 750, height: 700 },
          screen: { width: windowWidth, height: windowHeight }
        });
      }
    });
console.log(options)
    // const options = {
    //   channelId: '2066621', // 频道ID
    //   openId: 'ol4IC5QRkLoH_Mb8Q2KzArNUy-FQ', // 用户openId
    //   userName: '我怎么知道', // 用户名
    //   avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/LicZLzFzlO9XJc13ykP5KCuhLmd8fwJkFQKtGRozict9SjOE5RNOg7qjEasUxh9D3aIJ7IthV30PudR7xFRx4mrA/132', // 用户头像
    //   userid: '879bbcba39'
    // }
   plv.init(options)
      .then(({ detail, chat }) => {
        console.log(detail)
        this.setData({
          detail: detail
        });
        // 设置mode为live的videoOption
         this.setLiveOption(detail);

        // 设置mode为vod的videoOption
        // this.setVodOption(detail);
        // 如果当前的mode为vod，切换到直播状态，云课堂和普通直播监听直播开始的方法不同。
        // 1. 普通直播通过轮询api.getOrdinaryLiveStatus(stream)获取当前的状态
        // 2. 云课堂通过chat.on(chat.events.SLICESTART, () => {})监听直播开始，也可以通过播放器的onLiveStatusChange监听开始和结束
        if (detail.isPPT) {
          chat.on(chat.events.SLICESTART, () => {
            // 开始直播
          });
        } else {
          plv.api.getOrdinaryLiveStatus(detail.stream);
        }
      });
  },

  onUnload() {
    plv.destroy();
  },

  playerVodProgress(e) {
    const { currentTime } = e.detail;
    this.setData({
      vodPlayerProgress: currentTime
    });
  },

  setLiveOption(detail) {
    // 只关注直播
    const { userId, channelId } = detail;

    this.setData({
      videoOption: {
        mode: 'live',
        uid: userId,
        cid: channelId,
        isAutoChange: false
      },
    });
   
  },

  playerVodProgress(e) {
    const { currentTime } = e.detail;
    this.setData({
      vodPlayerProgress: currentTime
    });
  },

  setVodOption(detail) {
    const { playbackEnabled, hasPlayback, playbackList } = detail;
    if (playbackEnabled && hasPlayback && playbackList.length) {
      this.setData({
        videoOption: {
          mode: 'vod',
          vodVid: playbackList[0].videoPoolId
        },
        videoId: playbackList[0].videoId
      });
    }
  },

  getOrdinaryLiveStatus(stream) {
    this.statusTimer = setInterval(() => {
      plv.api.getOrdinaryLiveStatus(stream)
        .then(r => {
          const { detail } = this.data;
          const status = r.data.indexOf('end') > -1 ? 'N' : 'Y';
          if (status === detail.status) return;
          this.setData({
            'detail.status': status
          }, () => {
            // const { detail } = this.data;
            // this.updateVideoOption(detail);
          });
        });
    }, 1e3);
  },

  playerLiveStatusChange(e) {
    const status = e.detail.status;
    if (status === 'live') {
      // 开始直播
    }
    if (status === 'end') {
      // 结束直播
    }
  },
  choseTap(e) {
    console.log(e)
    let index = e.currentTarget.dataset.id
     let content=e.currentTarget.dataset.content
    this.setData({
      indexTab: index,
      content:content
    })
  },

  onMove(e) {
    const { x, y } = e.detail;
    this.setData({
      top: y,
      left: x
    });
  }
  
});
