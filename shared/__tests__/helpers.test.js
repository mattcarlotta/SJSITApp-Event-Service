import moment from "moment";
import {
  convertDateToISO,
  createSchedule,
  getCurrentYear,
  getNextYear,
} from "shared/helpers";

describe("Helper Functions", () => {
  it("returns a current date or specified date in UTC -7", () => {
    const selectedDate = convertDateToISO("2019-10-08T03:30:15.000+00:00");

    expect(selectedDate).toEqual("2019-10-07T20:30:15.000-07:00");
  });

  it("returns a structured array with callTimes for scheduling", () => {
    const schedule = createSchedule([moment().format()]);

    expect(schedule).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          employeeIds: expect.any(Array),
          title: expect.any(String),
        }),
      ]),
    );
  });

  it("returns a current year Date", () => {
    const currentYear = getCurrentYear().format("YYYY");

    expect(currentYear).toEqual(expect.any(String));
  });

  it("returns a next year Date", () => {
    const nextYear = getNextYear().format("YYYY");

    expect(nextYear).toEqual(expect.any(String));
  });
});
