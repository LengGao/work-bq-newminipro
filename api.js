
import config from './config.js';
let e = config.bqUrl;
let bq = config.bqUrl;
let sock = config.sock
let apiurl = {
  default: {
    countSocket: sock,
    newupload: bq + '/img',
    proInit: bq + '/chat/getQuestion',
    quesList: bq + '/chat/foundGroup',
    tabbar: e + "tabbar",
    guanzhu: e + "guanzhu",
    logo: e + "loginlogo",
    pingou_rule: e + "pingourule",
    abouts: e + "abouts",
    foundChat: e + '/chat/foundChat',
    getProblems: e + '/answe/getProblems',
    getCollection: e + '/answe/getCollection',
    getErrorTopicFeedbac: e + '/answe/getErrorTopicFeedback',
    makeCollection: e + '/answe/makeCollection',
    answerEvents: e + '/answe/answerEvents',
    getChapters: e + '/problem/getChapter',
    getChapterInfo: e + '/answe/getChapterInfo',
    requestExamination: e + '/answe/requestExamination',
    examinationQuestions: e + '/answe/examinationQuestions',
    getFacePlatess: e + '/answe/getFacePlatess',
    getExaminationList: e + '/answe/getExaminationList',
    hostcourse: e + '/course/hostcourse',
    freecourse: e + '/course/freecourse',
    getCollectionCourses: e + '/Course/getCourseCollection',
    chapterList: e + '/course/chapterList',
    getMyCourse: e + '/course/getMyCourse',
    getCourse: e + '/Course/getCourse',
    getSubject: e + '/course/getSubject',
    insertCourse: e + '/Course/insertCourseCollection',
    yearstruth: e + '/answe/yearstruth',
    gettruthinfo: e + '/answe/gettruthinfo',
    gettruthquestion: e + '/answe/gettruthquestion',
    answersave: e + '/answe/answersave',
    brushGenerationChallenge: e + '/answe/brushGenerationChallenge',
    generatingChallengesMark: e + '/answe/generatingChallengesMark',
    getChallengesFacePlate: e + '/answe/getChallengesFacePlate',
    recordingBrushProblem: e + '/answe/recordingBrushProblem',
    getRankeEdition: e + '/answe/getRankeEdition',
    MyRankeEdition: e + '/answe/MyRankeEdition',
    MyRankeEditions: e + '/answe/getMyRankeEdition',
    answercard: e + '/answe/answercard',
    coursedetail: e + '/course/coursedetail',
    getPunchClock: e + '/bill/getPunchClock',
    makeDailyPunchCards: e + '/answe/makeDailyPunchCards',
    getDailyPunchFacePlate: e + '/answe/getDailyPunchFacePlate',
    upateDailyPunchCardsInfo: e + '/answe/upateDailyPunchCardsInfo',
    getTodayStatus: e + '/answe/getTodayStatus',
    updateDailyPunchCards: e + '/answe/updateDailyPunchCards',
    submitpaper: e + '/answe/submitpaper',
    getcomment: e + '/comment/getcomment',
    submitcomment: e + '/comment/submitcomment',
    getChallengeResults: e + '/bill/getChallengeResults',
    getProgrammePosters: e + '/bill/getProgrammePosters',
    getclasslive: e + '/course/getclasslive',
    videomember: e + '/video/videomember',
    getrevielive: e + '/video/getrevielive',
    liveplayinfo: e + '/video/liveplayinfo',
    getExamFacePlate: e + '/answe/getExamFacePlate',
    updatePunchRemind: e + '/set/updatePunchRemind',
    generalScoring: e + '/answe/generalScoring',
    getLearningReports: e + '/user/getLearningReports',
    getClassLiveInfo: e + "/video/getclasslive",
    getOrderList: e + '/order/getOrderList',
    upload: e + '/upload',
    userident: e + '//user/updateuserident',
    updateuserident: e + '/user/userident',
    getindexcategory: e + '/indexcategory/getindexcategory',
    getcoursecategory: e + '/indexcategory/getcoursecategory',
    closeOrder: e + '/order/closeOrder',
    getMyAllClassroom: e + '/course/getMyAllClassroom',
    getBehaviorLogList: e + '/answe/getBehaviorLogList',
    wxauth: e + '/order/buy',
    collectionList: e + '/answe/CollectionList',
    examreport: e + '/answe/examreport',
    examinationResultsStatistics: e + '/answe/examinationResultsStatistics',
    wxpay: e + '/order/wxpay',
    getMessagePushList: e + '/push/getMessagePushList',
    saveMessagePushState: e + '/push/saveMessagePushState',
    livemember: e + '/video/livemember',
    learningReport: e + '/bill/learningReport',
    banner: e + '/system/banner',
    ad: e + '/system/ad',
    removeCourse: e + '/Course/removeCourseCollection',
    getLiveStatus: 'https://api.beiqujy.com/edu/Playnotify/getLiveStatus',
    lockAnswerEvents: e + '/answe/lockAnswerEvents',
    getSubscribePower: e + '//getSubscribePower',
    getTimeList: e + '//getTimeList',
    getSubscribeList: e + '//getSubscribeList',
    getSubscribeInfo: e + '//getSubscribeInfo',
    insertSubscribe: e + '//insertSubscribe',
    getMySubscribe: e + '//getMySubscribe',
    updateSubscribeMemberStatus: e + '//updateSubscribeMemberStatus',
    getQrcodeSubscribeInfo: e + '//getQrcodeSubscribeInfo',
    reSubscribeClassroom: e + '//reSubscribeClassroom'
  },
  user: {
    // newLogin: bq + "/login",
    newLogin: bq + '/login/login',
    // login: e + "login",
    bindPhone: bq + "/login/bindphone",
    // login: bq + "/wxauth",  
    login: bq + '/login/wxauth',
    collect: e + "collect",
    comment_list: bq + "index/index/getComment",
    fxcenter: e + "fxcenter",
    myteam: e + "myteam",
    share_qrcode: e + "shareqrcode",
    teamset: e + "teamset",
    withdraw: e + "withdrawlist",
    commission_list: e + "commissionlist",
    user_info: e + "userinfo",
    reward_list: e + "reward",
    bank_info: e + "mybankcard",
    def_card: e + "mydefaultcard",
    my_card: e + "mybankcard",
    add_card: e + "addbankcard",
    card_info: e + "cardinfo",
    delete_card: e + "deletecard",
    user_center: e + "usercenter",
    video: bq + "index/index/getCourseDetail",
    addProblemOrder: bq + "index/course/addProblemOrder",
    vip_list: e + "viplist",
    getHomePanel: e + '/answe/getHomePanel',
    getAllData: e + '/Course/getCourseInfo'
  },
  video: {
    getlivestatus: 'testapi.abacc.cn/getlivestatus',
    listen: e + '/course/listen',
    getvideoinfo: e + '/video/getvideoinfo',
    play: e + '/course/play',
    my_collect: e + "myvideocollect",
    // add_comment: e + "addcomment",
    live_list: e + "livelist",
    my_class: bq + "index/Member/getMyCourseList",
    getMyClassroomList: bq + "index/Member/getMyClassroomList",
    getAuproblems: bq + "index/Index/getAuproblems",
    problemChapter: bq + "index/Index/problemChapter",
    my_pintuan_class: e + "mypintuanclass",
    // category_list: e + "educategory",
    category_list: bq + "index/index/getCategory",
    // class_video: e + "classvideo",
    class_video: bq + "index/index/getCourse",
    pintuan_video: e + "pintuanvideo",
    search: e + "searchvideo",
    share_success: e + "sharesuccess",
    live_comment: e + "livecommentlist",
    more_plate: e + "moreplate",
    category_select: e + "educategoryselect",
    apply_info: e + "liveapplydetail",
    applylive: e + "applylive",
    writeNote: bq + "index/index/writeNote",
  },
  order: {
    video_kaituan: e + "createpintuan",
    video_joinpintuan: e + "joinpintuan",
    video_kaituan_list: e + "createpintuanlist",
    video_joinpintuan_list: e + "joinpintuanlist",
    video_pintuan_detail: e + "videopintuandetail",
    get_pay_data: bq + "api/wxpay/unifiedorder",
    video: bq + "index/Course/addCourseOrder",
    addreward: e + "addreward",
    submit_withdraw: e + "submitwithdraw",
    buylive: e + "buylive",
    order_video: e + "ordervideo",
    ship_detail: e + "shipdetail",
    buy_vip: e + "buyvip"
  }
};

module.exports = apiurl;