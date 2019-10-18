import moment from "moment";

/**
 * Helper function to convert a Date to an ISO Date.
 *
 * @function convertDateToISO
 * @returns {Date}
 */
const convertDateToISO = date => moment(date)
  .utcOffset(-7)
  .toISOString(true);

/**
 * Helper function to generate a schedule based upon calltimes.
 *
 * @function createSchedule
 * @param callTimes - an array of dates
 * @returns {object}
 */
const createSchedule = callTimes => callTimes.map(time => ({
  _id: time,
  title: moment(time).format("hh:mm a"),
  employeeIds: [],
}));

/**
 * Helper function to get a Date of current year.
 *
 * @function getCurrentYear
 * @returns {Date}
 */
const getCurrentYear = () => moment().startOf("year");

/**
 * Helper function to get a start month Date 2 months from now.
 *
 * @function getStartOfNextMonth
 * @returns {Date}
 */
const getEndOfNextMonth = () => moment()
  .add(2, "months")
  .endOf("month");

/**
 * Helper function to get a Date of current year.
 *
 * @function getNextYear
 * @returns {Date}
 */
const getNextYear = () => moment()
  .add(1, "year")
  .endOf("year");

/**
 * Helper function to get a start month Date 2 months from now.
 *
 * @function getStartOfNextMonth
 * @returns {Date}
 */
const getStartOfNextMonth = () => moment()
  .add(2, "months")
  .startOf("month");

export {
  convertDateToISO,
  createSchedule,
  getCurrentYear,
  getEndOfNextMonth,
  getNextYear,
  getStartOfNextMonth,
};
