function t(t) {
  return (t = t.toString())[1] ? t : "0" + t;
}

function dateToSubstr(str) {

  var year = str.substr(0, 4);
  var month = str.substr(4, 2);
  var day = str.substr(6, 2);
  var time = str.substr(9);
  return year + "年" + month + "月" + day + "日" + " " + time;
}
function dateToSubstr2(str, startTime, endTime) {

  var year = str.substr(0, 4);
  var month = str.substr(4, 2);
  var day = str.substr(6, 2);
  var time = startTime + "~" + endTime;
  return year + "年" + month + "月" + day + "日" + " " + time;
}

function js_date_time(unixtime) {
  console.log(unixtime * 1000)
  var date = new Date(unixtime * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
}
function setTimes(value){
  var theTime = parseInt(value);//秒
  var theTime1 = 0;//分
  var theTime2 = 0;//时
  if(theTime>60){
      theTime1 = parseInt(theTime/60);
      theTime = parseInt(theTime%60);
      if(theTime1 > 60) {  
          theTime2 = parseInt(theTime1/60);  
          theTime1 = parseInt(theTime1%60);  
      }    
  };
  var theTime_y = parseInt(theTime);
  if(theTime_y<10){
      theTime_y = '0'+theTime_y   
  }
  var results = ""+theTime_y;
  if(theTime1 > 0||theTime1==0) { 
      var theTime1_y = parseInt(theTime1);
      if(theTime1_y<10){
          theTime1_y = '0'+theTime1_y;
      } 
      results = ""+theTime1_y+":"+results;  
  }  
  if(theTime2 > 0||theTime2==0) { 
      var theTime2_y = parseInt(theTime2);
      if(theTime2_y<10){
          theTime2_y = '0'+theTime2_y;    
      } 
      results = ""+theTime2_y+":"+results;  
  }  
  return results;
};
function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '/' + month + '/' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}
module.exports = {
  js_date_time: js_date_time,
  dateToSubstr: dateToSubstr,
  dateToSubstr2: dateToSubstr2,
  setTimes:setTimes,
  getDates: getDates,
  formatTime: function (e) {
    var r = e.getFullYear(), n = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), a = e.getMinutes(), g = e.getSeconds();
    return [r, n, o].map(t).join("/") + " " + [u, a, g].map(t).join(":");
  },
  formatdate: function (e) {
    var r = e.getFullYear(), n = e.getMonth() + 1, o = e.getDate();
    e.getHours(), e.getMinutes(), e.getSeconds();
    return [r, n, o].map(t).join("-");
  },
  objectToUrlParams: function (t) {
    var e = "";
    for (var r in t) e += "&" + r + "=" + t[r];
    return e.substr(1);
  },
  throttle: function (fn, gapTime) {
    console.log('lalalall')
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
    }
    let _lastTime = null
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn()
        _lastTime = _nowTime
      }
    }
  }
};
