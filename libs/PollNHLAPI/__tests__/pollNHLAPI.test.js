import moment from "moment";
import { pollNHLAPI } from "libs";
import { eventLogger, formLogger } from "loggers";
import { Event, Form } from "models";
import data from "../__mocks__/libs.mocks";

const format = "YYYY-MM-DD";

describe("Poll NHL API Service", () => {
  let db;
  beforeAll(() => {
    db = connectDatabase();
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(async () => {
    await db.close();
    mockAxios.restore();
  });

  it("handles polling Events documents", async () => {
    const eventSpy = jest.spyOn(Event, "insertMany");
    const formSpy = jest.spyOn(Form, "create");
    const startMonth = moment()
      .add(1, "month")
      .startOf("month")
      .format(format);
    const endMonth = moment()
      .add(1, "month")
      .endOf("month")
      .format(format);

    mockAxios
      .onGet(`schedule?teamId=28&startDate=${startMonth}&endDate=${endMonth}`)
      .reply(200, data);

    await pollNHLAPI();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(eventSpy).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          eventType: expect.any(String),
          location: expect.any(String),
          callTimes: expect.any(Array),
          eventDate: expect.any(String),
          opponent: expect.any(String),
          schedule: expect.arrayContaining([
            expect.objectContaining({
              _id: expect.any(String),
              employeeIds: expect.any(Array),
              title: expect.any(String),
            }),
          ]),
          seasonId: expect.any(String),
          team: expect.any(String),
        }),
      ]),
    );

    expect(formSpy).toHaveBeenCalledTimes(1);
    expect(formSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        seasonId: expect.any(String),
        startMonth: expect.any(String),
        endMonth: expect.any(String),
        expirationDate: expect.any(String),
        sendEmailNotificationsDate: expect.any(String),
      }),
    );

    expect(console.log).toHaveBeenCalledWith(eventLogger([1]));
    expect(console.log).toHaveBeenCalledWith(formLogger(1));
  });
});
