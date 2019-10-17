// const test = {
//   _id: "5da8dc4ff312e85db7e32adb",
//   eventType: "Game",
//   location: "SAP Center at San Jose",
//   scheduledIds: [],
//   callTimes: [
//     "2019-11-01T17:30:00-07:00",
//     "2019-11-01T17:45:00-07:00",
//     "2019-11-01T18:00:00-07:00",
//     "2019-11-01T18:15:00-07:00",
//     "2019-11-01T19:00:00-07:00",
//   ],
//   uniform: "Sharks Teal Jersey",
//   sentEmailReminders: false,
//   eventDate: "2019-11-02T02:30:00.000Z",
//   opponent: "Winnipeg Jets",
//   schedule: [
//     { employeeIds: [], _id: "2019-11-01T17:30:00-07:00", title: "05:30 pm" },
//     { employeeIds: [], _id: "2019-11-01T17:45:00-07:00", title: "05:45 pm" },
//     { employeeIds: [], _id: "2019-11-01T18:00:00-07:00", title: "06:00 pm" },
//     { employeeIds: [], _id: "2019-11-01T18:15:00-07:00", title: "06:15 pm" },
//     { employeeIds: [], _id: "2019-11-01T19:00:00-07:00", title: "07:00 pm" },
//   ],
//   seasonId: "20192020",
//   team: "San Jose Sharks",
//   employeeResponses: [],
//   __v: 0,
// };

const data = {
  dates: [
    {
      date: "2019-11-01",
      totalItems: 1,
      totalEvents: 0,
      totalGames: 1,
      totalMatches: 0,
      games: [
        {
          gamePk: 2019020203,
          link: "/api/v1/game/2019020203/feed/live",
          gameType: "R",
          season: "20192020",
          gameDate: "2019-11-02T02:30:00Z",
          status: {
            abstractGameState: "Preview",
            codedGameState: "1",
            detailedState: "Scheduled",
            statusCode: "1",
            startTimeTBD: false,
          },
          teams: {
            away: {
              leagueRecord: {
                wins: 4,
                losses: 4,
                ot: 0,
                type: "league",
              },
              score: 0,
              team: {
                id: 52,
                name: "Winnipeg Jets",
                link: "/api/v1/teams/52",
              },
            },
            home: {
              leagueRecord: {
                wins: 3,
                losses: 4,
                ot: 0,
                type: "league",
              },
              score: 0,
              team: {
                id: 28,
                name: "San Jose Sharks",
                link: "/api/v1/teams/28",
              },
            },
          },
          venue: {
            name: "SAP Center at San Jose",
            link: "/api/v1/venues/null",
          },
          content: {
            link: "/api/v1/game/2019020203/content",
          },
        },
      ],
      events: [],
      matches: [],
    },
    {
      date: "2019-11-14",
      totalItems: 1,
      totalEvents: 0,
      totalGames: 1,
      totalMatches: 0,
      games: [
        {
          gamePk: 2019020292,
          link: "/api/v1/game/2019020292/feed/live",
          gameType: "R",
          season: "20192020",
          gameDate: "2019-11-15T03:00:00Z",
          status: {
            abstractGameState: "Preview",
            codedGameState: "1",
            detailedState: "Scheduled",
            statusCode: "1",
            startTimeTBD: false,
          },
          teams: {
            away: {
              leagueRecord: {
                wins: 2,
                losses: 4,
                ot: 0,
                type: "league",
              },
              score: 0,
              team: {
                id: 28,
                name: "San Jose Sharks",
                link: "/api/v1/teams/28",
              },
            },
            home: {
              leagueRecord: {
                wins: 4,
                losses: 2,
                ot: 0,
                type: "league",
              },
              score: 0,
              team: {
                id: 24,
                name: "Anaheim Ducks",
                link: "/api/v1/teams/24",
              },
            },
          },
          venue: {
            id: 5046,
            name: "Honda Center",
            link: "/api/v1/venues/5046",
          },
          content: {
            link: "/api/v1/game/2019020292/content",
          },
        },
      ],
      events: [],
      matches: [],
    },
  ],
};

export default data;
