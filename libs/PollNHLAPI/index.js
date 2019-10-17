import moment from "moment";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { eventLogger, formLogger } from "loggers";
import { Event, Form, Season } from "models";
import { convertDateToISO, createSchedule } from "shared/helpers";
import nhlAPI from "utils/axiosConfig";

const format = "YYYY-MM-DD";

export default async () => {
  let events = [];
  let createdForms = 0;
  try {
    // start of next month
    const startMonth = moment()
      .add(1, "month")
      .startOf("month");

    const formattedStartMonth = startMonth.format(format);

    // end of next month
    const endMonth = moment()
      .add(1, "month")
      .endOf("month");

    const formattedEndMonth = endMonth.format(format);

    // locate season that encapulates next month
    const existingSeason = await Season.findOne(
      {
        startDate: { $lte: formattedStartMonth },
        endDate: { $gte: formattedStartMonth },
      },
      { seasonId: 1 },
    );
    if (!existingSeason) throw "Unable to locate a season associated to that month.";

    const { seasonId } = existingSeason;

    // fetch Sharks schedule for next month
    const res = await nhlAPI.get(
      `schedule?teamId=28&startDate=${formattedStartMonth}&endDate=${formattedEndMonth}`,
    );

    const data = get(res, ["data"]);
    if (!data) throw "Unable to retrieve next month's game schedule.";

    // build an array of events
    events = [data].reduce((acc, { dates }) => {
      if (!isEmpty(dates)) {
        dates.forEach(({ games }) => {
          // search through data and check to see if Sharks are at home
          const isHomeGame = games.find(
            ({ teams }) => teams.home.team.name === "San Jose Sharks",
          );

          // if there at home...
          if (isHomeGame) {
            const { gameDate, venue, teams } = isHomeGame;

            // get team and opponent names
            const team = get(teams, ["home", "team", "name"]);
            const opponent = get(teams, ["away", "team", "name"]);

            // convert the supplied API gameDate to Pacfic Standard Time (UTC -7)
            const eventDate = convertDateToISO(gameDate);
            const gameTime = moment(gameDate).format("MMMM Do YYYY, hh:mm a");

            // generate callTimes based upon the gameTime
            const callTimes = [120, 105, 90, 75, 30].map(time => moment(gameTime, "MMMM Do YYYY, hh:mm a")
              .subtract(time, "minutes")
              .format());

            // store results in accumulator
            acc.push({
              eventType: "Game",
              location: venue.name,
              callTimes,
              eventDate,
              opponent,
              schedule: createSchedule(callTimes),
              seasonId,
              team,
            });
          }
        });
      }

      return acc;
    }, []);

    await Event.insertMany(events);

    await Form.create({
      seasonId,
      startMonth: startMonth.format(),
      endMonth: endMonth.format(),
      expirationDate: moment()
        .add(1, "month")
        .startOf("month")
        .add(14, "days")
        .endOf("day")
        .format(),
      sendEmailNotificationsDate: moment()
        .add(1, "month")
        .startOf("month")
        .format(),
    });

    createdForms = 1;
  } catch (err) {
    console.log(err.toString());
  } finally {
    console.log(eventLogger(events));
    console.log(formLogger(createdForms));
  }
};
