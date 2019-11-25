function proxyParser(data) {
  const attributeRefs = ["ipAddress", "port", "country", "", "anonymity"];
  const ipList = [];

  const cutStart = data.indexOf("tbody");
  const cutEnd = data.indexOf("tfoot");

  const relevantData = data.slice(cutStart, cutEnd);
  const choppedArr = relevantData.split("<tr>");
  choppedArr.map(row => {
    const rowArr = row.split("</td>");
    const finalData = {};
    return rowArr.forEach((r, idx) => {
      const cut = r.indexOf("<td>");
      if (cut !== -1) {
        const ad = r.slice(cut + 4);
        finalData[attributeRefs[idx]] = ad;
        if (ad === "elite proxy") {
          ipList.push(finalData);
        }
      }
    });
  });
  const finalList = ipList.filter(row => row.country === "US");
  return finalList;
}

const SELECTOR_BASE_DEPART = `#calendarContainer > div.src-components-SearchFlightForm-searchFlightForm__bookCalendar--2fPE- > div > div > span > div > div > div.DateRangePicker_picker.DateRangePicker_picker_1.DateRangePicker_picker__directionLeft.DateRangePicker_picker__directionLeft_2 > div > div > div.DayPicker_focusRegion.DayPicker_focusRegion_1 > div.DayPicker_transitionContainer.DayPicker_transitionContainer_1 > div > div:nth-child(2) > div > table > tbody > `;
const SELECTOR_BASE_RETURN = `#calendarContainer > div.src-components-SearchFlightForm-searchFlightForm__bookCalendar--2fPE- > div > div > span > div > div > div.DateRangePicker_picker.DateRangePicker_picker_1.DateRangePicker_picker__directionLeft.DateRangePicker_picker__directionLeft_2 > div > div > div.DayPicker_focusRegion.DayPicker_focusRegion_1 > div.DayPicker_transitionContainer.DayPicker_transitionContainer_1 > div > div:nth-child(3) > div > table > tbody > `;

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const dayWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

const weeksCount = (year, month_number) => {
  let firstOfMonth = new Date(year, month_number - 1, 1);
  let day = firstOfMonth.getDay() || 6;
  day = day === 1 ? 0 : day;
  if (day) {
    day--;
  }
  let diff = 7 - day;
  let lastOfMonth = new Date(year, month_number, 0);
  let lastDate = lastOfMonth.getDate();
  if (lastOfMonth.getDay() === 1) {
    diff--;
  }
  let result = Math.ceil((lastDate - diff) / 7);
  return result + 1;
};

const daysInMonth = (iMonth, iYear) => {
  return 32 - new Date(iYear, iMonth, 32).getDate();
};

const makeCalendar = (year, month) => {
  const calendar = [];
  const firstDay = new Date(year, month).getDay();
  let day = 1;
  const days = daysInMonth(month, year);
  const weeks = weeksCount(year, month);
  let week = [];
  let dayString = weekdays[firstDay];
  let wk = 1;

  while (days > day - 1) {
    let a = dayWeek[dayString];
    week.push({ day: dayString, num: day, wk, dow: a });
    if (a === 6) {
      calendar.push(week);
      dayString = weekdays[0];
      week = [];
      wk++;
    } else {
      a++;
      dayString = weekdays[a];
    }
    day++;
  }
  calendar.push(week);
  return calendar;
};

const assembleDaySelector = (wk, day, depart) => {
  const base = depart ? SELECTOR_BASE_DEPART : SELECTOR_BASE_RETURN;
  const w = `tr:nth-child(${wk}) > td:nth-child(${day}) > button`;
  return `${base}tr:nth-child(${wk}) > td:nth-child(${day}) > button`;
};

const getCalWeek = (day, calendar) => {
  let wk = 0;
  const flat = calendar.reduce((acc, val) => acc.concat(val), []);
  flat.forEach(d => {
    if (d.num === day) {
      wk = d.wk;
      dy = d.dow;
    }
  });
  return { dy, wk };
};

const getDateSelector = (str, depart) => {
  const date = new Date(str);
  // const m1 = date.getMonth();
  const n = new Date();
  // const m2 = n.getMonth();
  // const isSameMonth = m1 === m2;

  const cal = makeCalendar(date.getFullYear(), date.getMonth());
  const selectedDay = date.getUTCDate();
  const dayAndWeek = getCalWeek(selectedDay + 1, cal);
  const { dy, wk } = dayAndWeek;
  return assembleDaySelector(wk, dy, depart);
};

module.exports = { proxyParser, getDateSelector };
