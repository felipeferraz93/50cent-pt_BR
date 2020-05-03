function formattedMonth(monthIndex) {
  const month = new Array();
  month[0] = '01';
  month[1] = '02';
  month[2] = '03';
  month[3] = '04';
  month[4] = '05';
  month[5] = '06';
  month[6] = '07';
  month[7] = '08';
  month[8] = '09';
  month[9] = '10';
  month[10] = '11';
  month[11] = '12';
  return month[monthIndex];
}

function formattedDay(day) {
  if (day <= 9) {
    const dayString = `0${day}`;
    return dayString;
  }
  return day;
}

function formattedMinutes(minute) {
  if (minute <= 9) {
    const dayString = `0${minute}`;
    return dayString;
  }
  return minute;
}

exports.formattedDay = formattedDay;
exports.formattedMinutes = formattedMinutes;
exports.formattedMonth = formattedMonth;
