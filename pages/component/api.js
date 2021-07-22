import config from './config.js';
let bq = config.bqUrl;
let sock = config.liaotian;
let sockForCount = config.sockForCount
let apiurl = {
  default: {
    countSocket: sock,
    sockForCount: sockForCount,
    newupload: bq + '/img',
    proInit: bq + '/Information/getQuestion',
    quesList: bq + '/chat/foundGroup',
    tabbar: bq + "tabbar",
    guanzhu: bq + "guanzhu",
    logo: bq + "loginlogo",
    pingou_rule: bq + "pingourule",
    abouts: bq + "abouts",
    foundChat: bq + '/chat/foundChat',
    getProblems: bq + '/answe/getProblems',
    getCollection: bq + '/problem/getProblemCollectionChapter',
    getErrorTopicFeedbac: bq + '/answe/getErrorTopicFeedback',
    makeCollection: bq + '/answe/makeCollection',
    answerEvents: bq + '/answe/answerEvents',
    getChapters: bq + '/problem/getChapter',
    getChapterInfo: bq + '/problem/ChapterPracticeStatistics',
    requestExamination: bq + '/answe/requestExamination',
    examinationQuestions: bq + '/answe/examinationQuestions',
    getFacePlatess: bq + '/answe/getFacePlatess',
    getExaminationList: bq + '/answe/getExaminationList',
    hostcourse: bq + '/course/hostcourse',
    freecourse: bq + '/course/freecourse',

    chapterList: bq + '/course/chapterList',
    getMyCourse: bq + '/course/getMyCourse',
    getCourse: bq + '/Course/getCourse',
    getSubject: bq + '/course/getSubject',
    insertCourse: bq + '/Course/insertCourseCollection',
    yearstruth: bq + '/answe/yearstruth',

    gettruthquestion: bq + '/answe/gettruthquestion',
    answersave: bq + '/answe/answersave',
    brushGenerationChallenge: bq + '/answe/brushGenerationChallenge',
    generatingChallengesMark: bq + '/answe/generatingChallengesMark',
    getChallengesFacePlate: bq + '/answe/getChallengesFacePlate',
    recordingBrushProblem: bq + '/answe/recordingBrushProblem',
    getRankeEdition: bq + '/answe/getRankeEdition',
    MyRankeEdition: bq + '/answe/MyRankeEdition',
    MyRankeEditions: bq + '/answe/getMyRankeEdition',
    answercard: bq + '/answe/answercard',
    coursedetail: bq + '/course/coursedetail',
    getPunchClock: bq + '/bill/getPunchClock',
    makeDailyPunchCards: bq + '/answe/makeDailyPunchCards',
    getDailyPunchFacePlate: bq + '/answe/getDailyPunchFacePlate',
    upateDailyPunchCardsInfo: bq + '/answe/upateDailyPunchCardsInfo',
    getTodayStatus: bq + '/answe/getTodayStatus',
    updateDailyPunchCards: bq + '/answe/updateDailyPunchCards',
    submitpaper: bq + '/answe/submitpaper',
    getcomment: bq + '/comment/getcomment',
    submitcomment: bq + '/comment/submitcomment',
    getChallengeResults: bq + '/bill/getChallengeResults',
    getProgrammePosters: bq + '/bill/getProgrammePosters',
    getclasslive: bq + '/course/getclasslive',
    videomember: bq + '/video/videomember',
    getrevielive: bq + '/video/getrevielive',
    liveplayinfo: bq + '/video/liveplayinfo',
    getExamFacePlate: bq + '/answe/getExamFacePlate',
    updatePunchRemind: bq + '/set/updatePunchRemind',
    generalScoring: bq + '/answe/generalScoring',
    getLearningReports: bq + '/user/getLearningReports',
    getClassLiveInfo: bq + "/video/getclasslive",
    
    getOrderList: bq + '/order/getOrderList',
    upload: bq + '/upload',
    userident: bq + '//user/updateuserident',
    updateuserident: bq + '/user/userident',
    getindexcategory: bq + '/indexcategory/getindexcategory',
    getcoursecategory: bq + '/indexcategory/getcoursecategory',
    closeOrder: bq + '/order/closeOrder',
    getMyAllClassroom: bq + '/User/getMyClassroom',
    getBehaviorLogList: bq + '/problem/getProblemHistory',
    wxauth: bq + '/order/buy',
    collectionList: bq + '/problem/getProblem',
    examreport: bq + '/answe/examreport',
    examinationResultsStatistics: bq + '/answe/examinationResultsStatistics',
    wxpay: bq + '/order/wxpay',
    getMessagePushList: bq + '/push/getMessagePushList',
    saveMessagePushState: bq + '/push/saveMessagePushState',
    livemember: bq + '/video/livemember',
    learningReport: bq + '/bill/learningReport',
    banner: bq + '/system/banner',
    ad: bq + '/system/ad',
    removeCourse: bq + '/Course/removeCourseCollection',
    getLiveStatus: 'https://api.beiqujy.com/edu/Playnotify/getLiveStatus',
    lockAnswerEvents: bq + '/answe/lockAnswerEvents',
    getSubscribePower: bq + '//getSubscribePower',
    getTimeList: bq + '/Reservation/getTimeList',
    getSubscribeList: bq + '/Reservation/getFaceToFaceClasses',
    getSubscribeInfo: bq + '/Reservation/getClassroomInfo',
    insertSubscribe: bq + '/Reservation/appointment',
    getMySubscribe: bq + '/Reservation/reservationList',
    cancelAppointment: bq + '/Reservation/cancelAppointment',
    getClassroomInfoFromQrcode: bq + '/Reservation/getClassroomInfoFromQrcode',
    reSubscribeClassroom: bq + '//reSubscribeClassroom',
    subscribeClassroomSignIn: bq + '/Reservation/signIn',
    getScheduleCode:bq+'arrange/info',
    arrangeUpdateSignIn:bq+'arrange/update',
    getOpenClass:bq+'/PublicClass/getPublicClassList',
    getUserInfo:bq+'/PublicClass/getUserInfo',
    getPublicClassVideoInfo:bq+'/PublicClass/getPublicClassVideoInfo',
    getLiveClassThumbPosterUrl:bq+'/PublicClass/getLiveClassThumbPosterUrl',
    getLiveClassPosterUrl:bq+'/PublicClass/getLiveClassPosterUrl',
  },
  user: {
    newLogin: bq + '/login/login',
    bindPhone: bq + "/login/bindphone",
    login: bq + '/login/wxauth',
    collect: bq + "collect",
    comment_list: bq + "index/index/getComment",
    fxcenter: bq + "fxcenter",
    myteam: bq + "myteam",
    share_qrcode: bq + "shareqrcode",
    teamset: bq + "teamset",
    withdraw: bq + "withdrawlist",
    commission_list: bq + "commissionlist",
    user_info: bq + "userinfo",
    reward_list: bq + "reward",
    bank_info: bq + "mybankcard",
    def_card: bq + "mydefaultcard",
    my_card: bq + "mybankcard",
    add_card: bq + "addbankcard",
    card_info: bq + "cardinfo",
    delete_card: bq + "deletecard",
    user_center: bq + "usercenter",
    video: bq + "index/index/getCourseDetail",
    addProblemOrder: bq + "index/course/addProblemOrder",
    vip_list: bq + "viplist",
    getHomePanel: bq + '/answe/getHomePanel',
    

  },
  video: {
    getlivestatus: 'testapi.abacc.cn/getlivestatus',
    listen: bq + '/course/listen',
    getvideoinfo: bq + '/video/getvideoinfo',
    play: bq + '/video/play',
    my_collect: bq + "myvideocollect",
    live_list: bq + "livelist",
    my_class: bq + "index/Member/getMyCourseList",
    getMyClassroomList: bq + "index/Member/getMyClassroomList",
    getAuproblems: bq + "index/Index/getAuproblems",
    problemChapter: bq + "index/Index/problemChapter",
    my_pintuan_class: bq + "mypintuanclass",
    category_list: bq + "index/index/getCategory",
    class_video: bq + "index/index/getCourse",
    pintuan_video: bq + "pintuanvideo",
    search: bq + "searchvideo",
    share_success: bq + "sharesuccess",
    live_comment: bq + "livecommentlist",
    more_plate: bq + "moreplate",
    category_select: bq + "educategoryselect",
    apply_info: bq + "liveapplydetail",
    applylive: bq + "applylive",
    writeNote: bq + "index/index/writeNote",
    getlastplayinfo: bq + '/video/getlastplayinfo',
    getClassroomVideoDirectory: bq + '/Homepage/getClassroomVideoDirectory',
    classroomVideoRecord: bq + '/VideoStatistics/classroomVideoRecord',
  },
  order: {
    video_kaituan: bq + "createpintuan",
    video_joinpintuan: bq + "joinpintuan",
    video_kaituan_list: bq + "createpintuanlist",
    video_joinpintuan_list: bq + "joinpintuanlist",
    video_pintuan_detail: bq + "videopintuandetail",
    get_pay_data: bq + "api/wxpay/unifiedorder",
    video: bq + "index/Course/addCourseOrder",
    addreward: bq + "addreward",
    submit_withdraw: bq + "submitwithdraw",
    buylive: bq + "buylive",
    order_video: bq + "ordervideo",
    ship_detail: bq + "shipdetail",
    buy_vip: bq + "buyvip"
  },
  test: {
    getCollectionCourses: bq + '/Course/getCourseCollection',
    getAllData: bq + '/Homepage/getHomepageData',
    createPracticeData: bq + '/problem/createPracticeData',
    getProblemDetail: bq + '/problem/getProblem',
    insertCollection: bq + '/problem/insertCollection',
    removeCollection: bq + '/problem/removeCollection',
    submitAnswer: bq + '/problem/submitAnswer',
    getLogAnswer: bq + '/problem/getLogAnswer',
    getErrorProblemCollectionList: bq + '/problem/getErrorProblemCollectionList',
    archivePracticeData: bq + '/problem/archivePracticeData',
    getPracticeDRecordBoard: bq + '/problem/getPracticeDRecordBoard',
    getTestExamList: bq + '/problem/getTestExamList',
    getPunchPanelData: bq + '/problem/getPunchPanelData',
    createPunchData: bq + '/problem/createPunchData',
    getProblemErrorCollectionChapter: bq + '/problem/getProblemErrorCollectionChapter',
    getRealTopicExamConfig: bq + '/problem/getRealTopicExamConfig',
    createRealTopicData: bq + '/problem/createRealTopicData',
    getRealTopicRecordBoard: bq + '/problem/getRealTopicRecordBoard',
    settlementRealTopicResult: bq + '/problem/settlementRealTopicResult',
    getRecordBoard: bq + '/problem/getPunchRecordBoard',
    settlementPunchResult: bq + '/problem/settlementPunchResult',
    sharePunchData: bq + "/Share/sharePunchData",
    createPunchPoster: bq + "/Share/createPunchPoster",
    getChallengeRankList: bq + "/problem/getChallengeRankList",
    createChallengeData: bq + '/problem/createChallengeData',
    getTestExamRecordBoard: bq + '/problem/getTestExamRecordBoard',
    getChallengeRecordBoard: bq + '/problem/getChallengeRecordBoard',
    settlementChallengeResult: bq + '/problem/settlementChallengeResult',
    getTodayChallengeForMyself: bq + "/problem/getTodayChallengeForMyself",
    createChallengePoster: bq + "/Share/createChallengePoster",
    getTestExamConfig: bq + "/problem/getTestExamConfig",
    createTestExamData: bq + "/problem/createTestExamData",
    getErrorProblemList: bq + '/problem/getErrorProblemList',
    getCollectionProblemList: bq + '/problem/getCollectionProblemList',
    settlementTestExamResult: bq + "/problem/settlementTestExamResult",
    getChapter: bq + "/problem/getChapter",
    getSelfDeterminationExamConfig: bq + "/problem/getSelfDeterminationExamConfig",
    createSelfDeterminationData: bq + "/problem/createSelfDeterminationData",
    settlementSelfDeterminationResult: bq + "/problem/settlementSelfDeterminationResult",
    getSelfDeterminationBoard: bq + "/problem/getSelfDeterminationBoard",
  }
};

module.exports = apiurl;