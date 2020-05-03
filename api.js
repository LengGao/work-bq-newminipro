
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
    upload_img: e + "upload",
    tabbar: e + "tabbar",
    guanzhu: e + "guanzhu",
    logo: e + "loginlogo",
    pingou_rule: e + "pingourule",
    abouts: e + "abouts",
    foundChat: e +'api/v1/chat/foundChat',
    getProblems:e +'api/v1/answe/getProblems',
    getCollection:e +'api/v1/answe/getCollection',
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
    MyRankeEdition:e +'api/v1/answe/MyRankeEdition'

  },
  index: {
    // banner: e + "index"
    banner: bq + "index/index/getIndexData",
    getMyTimeTableInfo: bq + "index/Member/getMyTimeTableInfo",
    getMyTimeTable: bq + "index/Member/getMyTimeTable",
    getUserSignin: bq + "index/Member/getUserSignin"
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
    vip_list: e + "viplist"
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
  teacher: {
    list: e + "teacherlist",
    detail: e + "teacherdetail"
  },
  paper: {
    subject_list: e + "subjectlist",
    subject_course: bq + "exam/userproblem/userPracticeShow",
    userExamShow: bq + "exam/userproblem/userExamShow",
    chapter_list: e + "coursechapter",
    paper_list: e + "paperlist",
    question_list: bq + "exam/userproblem/startPractice",
    getPracticeProblem: bq + "exam/userproblem/getPracticeProblem",
    doUserPracticeProblemLog: bq + "exam/userproblem/doUserPracticeProblemLog",
    myProblemAnalyse: bq + "exam/userproblem/myProblemAnalyse",
    myExamAnalyse: bq + "exam/userproblem/myExamAnalyse",
    startExam: bq + "exam/userproblem/startExam",
    doUserPaperProblemLog: bq + "exam/userproblem/doUserPaperProblemLog",
    falseCountCollection: bq + "exam/userProblem/falseCountCollection",
    submit_paper: e + "submitpaper",
    subject_dolog: e + "subjectdolog",
    collect_paper: e + "collectpaper",
    my_collect_subject: e + "mycollectsubject",
    my_collect_paper: e + "mycollectpaper",
    my_subject_dolog: e + "mysubjectdolog",
    my_paper_dolog: e + "mypaperdolog",
    my_subject_mistake: e + "mysubjectmistake",
    my_paper_mistake: e + "mypapermistake",
    del_mistake: e + "delmistake",
    exam_report: e + "examreport",
    paper_index: e + "paperindex"
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
  },
  shop: {
    index: e + "shopindex",
    goods_detail: e + "goodsdetail",
    addcart: e + "addshopcart",
    mycart: e + "mycart",
    update_cart: e + "editcart",
    delcart: e + "delcart",
    pay_order_info: e + "shoporderinfo",
    myaddress: e + "myaddress",
    add_address: e + "addaddress",
    address_info: e + "addressinfo",
    del_address: e + "deladdress",
    add_order: e + "addshoporder",
    my_order: bq + "index/Member/getPurchaseHistory",
    order_detail: e + "orderdetail",
    order_refund: e + "orderrefund",
    add_goods_comment: e + "addgoodscomment",
    ordergoods_info: e + "ordergoodsinfo",
    del_order: e + "delshoporder",
    cancel_order: e + "cancelshoporder",
    goods_rec: e + "goodsrec",
    goods_comment: e + "goodscommentlist",
    category_goods: e + "categorygoods",
    search: e + "searchgoods",
    rec_goods: e + "goodsrec",
    confirm_order: e + "confirmorder"
  },
  // course: {
  //   learning: bq + "index/course/learning",
  //   getPlayInfo: bq + "api/video/getPlayInfo",
  //   getLastlesson: bq + "index/course/getLastlesson",
  //   editCourseLessonLearn: bq + "index/course/editCourseLessonLearn",
  //   getProblemStore: bq + "index/index/getProblemStore",
  //   collectProblem: bq + "exam/userproblem/collectProblem",
  //   cancelCollection: bq + "exam/userproblem/cancelCollection",
  //   getCollection: bq + "exam/userproblem/getCollection",
  //   sendCode: bq + "api/send/sendCode",
  //   registerBind: bq + "user/Wxauth/registerBind",
  //   loginBind: bq + "user/Wxauth/loginBind",
  //   getALLFalseCountCollection: bq + "exam/userProblem/getALLFalseCountCollection",
  //   getProblemInfo: bq + "exam/userProblem/getProblemInfo",
  //   getAllCollectionId: bq + "exam/userproblem/getAllCollectionId",
  //   getChapterProblem: bq + "index/Index/getChapterProblem",
  //   userExamInfo: bq + "exam/Userproblem/userExamInfo",
  //   getUserTotalData: bq + "user/Users/getUserTotalData",
  //   uploadImg: bq + "api/Upload/uploadImg",
  //   getClassLiveInfo: bq + "edu/live/getClassLiveInfo",
  //   getLiveVideoDetail: bq + "index/Index/getLiveVideoDetail",
  //   getLastVideo: bq + "index/Course/getLastVideo",
  //   liveVideoLearning: bq + "index/Course/liveVideoLearning",
  //   editLiveVideoLearn: bq + "index/Course/editLiveVideoLearn",
  // }
};

module.exports = apiurl;