// 事件处理函数

export function formetDate(timestamp){
    let date = new Date(parseInt(timestamp));
    // 返回数据格式 2022-07-01 16:33:03
    let Year = date.getFullYear();// 年
    let Month = date.getMonth() + 1; // 月
    let Day = date.getDate(); // 日

    let Hours = date.getHours(); // 时
    let Minutes = date.getMinutes(); // 分
    let Seconds = date.getSeconds(); // 秒

    var weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
    var week = weekArr[date.getDay()];

    // 给为数字的前面补0
    if( Month >= 1 && Month <= 9 ){
        Month = "0" + Month
    }
    if( Day >= 1 && Day <= 9 ){
        Day = "0" + Day
    }
    if( Hours >= 0 && Hours <= 9 ){
        Hours = "0" + Hours
    }
    if( Minutes >= 0 && Minutes <= 9 ){
        Minutes = "0" + Minutes
    }
    if( Seconds >= 0 && Seconds <= 9 ){
        Seconds = "0" + Seconds
    }
    // 返回数据格式 2022-07-01 16:33:03
    return Year+"-"+Month+"-"+Day+" "+Hours+"-"+Minutes+"-"+ Seconds + " " + week;
}