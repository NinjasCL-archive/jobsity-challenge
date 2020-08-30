/**
 * Returns an object with moment.js days
 * @param {current} string with a date to base the calendar.
 */
const makeCalendar = ({ current = moment().format() } = {}) => {
  // https://stackoverflow.com/a/48143904
  // Get first day of the week in the month
  const startDay = moment(current).clone().startOf("month").startOf("week");

  // Get last day of the week in the month
  const endDay = moment(current).clone().endOf("month").endOf("week");

  const date = startDay.clone().subtract(1, "day");
  const daysInWeek = 7;

  const calendar = [];

  while (date.isBefore(endDay, "day")) {
    calendar.push({
      days: Array(daysInWeek)
        .fill(0)
        .map(() => date.add(1, "day").clone()),
    });
  }
  return calendar;
};

export { makeCalendar };
export default makeCalendar;
