import moment from "moment";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { eventLogger } from "loggers";
import { Event, Season } from "models";
import { convertDateToISO, createSchedule } from "shared/helpers";
import nhlAPI from "utils/axiosConfig";

export default async () => {
  let events = [];
  try {
    const startMonth = moment()
      .add(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

    const endMonth = moment()
      .add(1, "month")
      .endOf("month")
      .format("YYYY-MM-DD");

    const season = await Season.findOne(
      {
        startDate: { $lte: startMonth },
        endDate: { $gte: startMonth },
      },
      { seasonId: 1 },
    );
    if (!season) throw "Unable to locate a season associated to that month.";

    const res = await nhlAPI.get(
      `schedule?teamId=28&startDate=${startMonth}&endDate=${endMonth}`,
    );

    const data = get(res, ["data"]);
    if (!data) throw "Unable to retrieve next month's game schedule.";

    events = [data].reduce((acc, { dates }) => {
      if (!isEmpty(dates)) {
        dates.forEach(({ games }) => {
          const isHomeGame = games.find(
            ({ teams }) => teams.home.team.name === "San Jose Sharks",
          );
          if (isHomeGame) {
            const { gameDate, venue, season, teams } = isHomeGame;

            const eventDate = convertDateToISO(gameDate);
            const gameTime = moment(gameDate).format("MMMM Do YYYY, hh:mm a");
            const callTimes = [120, 105, 90, 75, 30].map(time =>
              moment(gameTime, "MMMM Do YYYY, hh:mm a")
                .subtract(time, "minutes")
                .format(),
            );

            acc.push({
              eventType: "Game",
              location: venue.name,
              callTimes,
              eventDate,
              opponent: teams.away.team.name,
              team: teams.home.team.name,
              schedule: createSchedule(callTimes),
              seasonId: season,
            });
          }
        });
      }
      return acc;
    }, []);

    await Event.insertMany(events);
  } catch (err) {
    console.log(err.toString());
  } finally {
    console.log(eventLogger(events));
  }
};
