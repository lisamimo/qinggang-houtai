export default {
  countDayMount(livetime, leavetime) {
    var leaveYear = Number(leavetime.split("-")[0]);
    var leaveTimeMonth = Number(leavetime.split("-")[1]);
    var leaveDay = Number(leavetime.split("-")[2]);
    var leaveDate = new Date(leaveYear, leaveTimeMonth, leaveDay);
    var leaveTime = leaveDate.getTime();
    var startYear = Number(livetime.split("-")[0]);
    var startTimeMonth = Number(livetime.split("-")[1]);
    var startDay = Number(livetime.split("-")[2]);
    var startDate = new Date(startYear, startTimeMonth, startDay);
    var livetime = startDate.getTime();
    //计算入住的天数
    var day = parseInt((leaveTime - livetime) / (1000 * 60 * 60 * 24));

    return day
  }
}