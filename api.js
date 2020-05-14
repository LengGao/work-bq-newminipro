
import config from './config.js';

var e = config.bqUrl;

// var bq = 'http://api.datuihome.com/';
var bq = config.bqUrl;
// var bq = 'http://api.beiqujy.com/';
var apiurl = {
  default: {
    newupload:bq +'api/v1/img',
    proInit:bq +'api/v1/chat/getQuestion',
    quesList:bq +'api/v1/chat/foundGroup',
    tabbar: e + "tabbar",
    guanzhu: e + "guanzhu",
    logo: e + "loginlogo",
    pingou_rule: e + "pingourule",
    abouts: e + "abouts",
    foundChat: e +'api/v1/chat/foundChat',
    getProblems:e +'api/v1/answe/getProblems',
    getCollection:e +'api/v1/answe/getCollection',
    getErrorTopicFeedbac:e +'api/v1/answe/getErrorTopicFeedback',
    makeCollection:e +'api/v1/answe/makeCollection',
    answerEvents:e +'api/v1/answe/answerEvents',
    getChapters:e +'api/v1/answe/getChapters',
    getChapterInfo:e +'api/v1/answe/getChapterInfo',
    requestExamination:e +'api/v1/answe/requestExamination',
    examinationQuestions:e +'api/v1/answe/examinationQuestions',
    getFacePlatess:e +'api/v1/answe/getFacePlatess',
    getExaminationList:e +'api/v1/answe/getExaminationList',
    hostcourse:e +'api/v1/course/hostcourse',
    freecourse:e +'api/v1/course/freecourse',
    getCollectionCourses:e +'api/v1/course/getCollectionCourses',
    chapterList:e +'api/v1/course/chapterList',
    getMyCourse:e +'/api/v1/course/getMyCourse',
    getCourse:e +'/api/v1/course/getCourse',
    getSubject:e +'api/v1/course/getSubject',
    insertCourse:e +'api/v1/course/insertCourse',
    yearstruth:e +'api/v1/answe/yearstruth',
    gettruthinfo:e +'api/v1/answe/gettruthinfo',
    gettruthquestion:e +'api/v1/answe/gettruthquestion',
    answersave:e +'api/v1/answe/answersave',
    brushGenerationChallenge:e +'api/v1/answe/brushGenerationChallenge',
    generatingChallengesMark:e +'api/v1/answe/generatingChallengesMark',
    getChallengesFacePlate:e +'api/v1/answe/getChallengesFacePlate',
    recordingBrushProblem:e +'api/v1/answe/recordingBrushProblem',
    getRankeEdition:e +'api/v1/answe/getRankeEdition',
    MyRankeEdition:e +'api/v1/answe/MyRankeEdition',
    MyRankeEditions:e +'api/v1/answe/getMyRankeEdition',
    answercard:e +'api/v1//answe/answercard',
    coursedetail: e + 'api/v1/course/coursedetail',
    getPunchClock: e + 'api/v1/bill/getPunchClock',
    makeDailyPunchCards: e + 'api/v1/answe/makeDailyPunchCards',
    getDailyPunchFacePlate: e +'api/v1/answe/getDailyPunchFacePlate',
    upateDailyPunchCardsInfo: e +'api/v1/answe/upateDailyPunchCardsInfo',
    getTodayStatus: e +'api/v1/answe/getTodayStatus',
    updateDailyPunchCards: e +'api/v1/answe/updateDailyPunchCards',
    submitpaper: e +'api/v1/answe/submitpaper',
    getcomment: e +'api/v1/comment/getcomment',
    submitcomment: e +'api/v1/comment/submitcomment',
    getChallengeResults: e +'api/v1/bill/getChallengeResults',
    getProgrammePosters: e +'api/v1/bill/getProgrammePosters',
    getclasslive: e +'api/v1/course/getclasslive',
    videomember: e +'api/v1//video/videomember',
    getrevielive: e +'api/v1/video/getrevielive',
    liveplayinfo: e +'api/v1/video/liveplayinfo',
    getExamFacePlate: e +'api/v1/answe/getExamFacePlate',
    updatePunchRemind: e +'api/v1/set/updatePunchRemind',
    generalScoring: e +'api/v1/answe/generalScoring',
    getLearningReports: e + 'api/v1/user/getLearningReports',
    getClassLiveInfo: e + "api/v1/video/getclasslive",
    getOrderList: e +'api/v1/order/getOrderList',
    upload: e +'api/v1/upload',
    userident: e +'api/v1//user/updateuserident',
    updateuserident: e+'api/v1/user/userident',
    getindexcategory: e+'api/v1/category/getindexcategory',
    getcoursecategory: e + 'api/v1/category/getcoursecategory',
    closeOrder: e + 'api/v1/order/closeOrder',
    getMyAllClassroom: e +'api/v1/course/getMyAllClassroom',
    getBehaviorLogList: e +'api/v1/answe/getBehaviorLogList',
    wxauth: e +'api/v1/order/buy',
    collectionList: e + 'api/v1/answe/CollectionList',
    examreport: e + 'api/v1/answe/examreport',
    examinationResultsStatistics: e + 'api/v1/answe/examinationResultsStatistics'
  },
  user: {
    newLogin: bq + "api/v1/login",
    // login: e + "login",
    bindPhone: bq + "api/v1/bindphone",
    login: bq + "api/v1/wxauth",
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
    getHomePanel:e +'api/v1/answe/getHomePanel'
   
  },
  video: {
    listen: e +'api/v1/course/listen',
    getvideoinfo: e +'api/v1/video/getvideoinfo',
    play: e +'api/v1/course/play',
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