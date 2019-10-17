import chalk from "chalk";
import "database";

const { log } = console;

log(
  `\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" I ")} ${chalk.rgb(
    50,
    168,
    82,
  )(`Event service is running...`)}`,
);

process.on("exit", () =>
  log(
    `\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" I ")} ${chalk.rgb(
      34,
      155,
      127,
    )(`Event service has been stopped.`)}`,
  ),
);

//catches ctrl+c event
process.on("SIGINT", () =>
  log(
    `${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" I ")} ${chalk.magenta(
      `Event service was manully terminated.`,
    )}`,
  ),
);

//catches "kill pid" (for example: nodemon restart)
// process.on("SIGUSR1", () => {
//   log(
//     `${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" I ")} ${chalk.magenta(
//       `Event service has been restarted.`,
//     )}`,
//   );
//   process.exit();
// });
// //
// process.on("SIGUSR2", () => {
//   `${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" I ")} ${chalk.magenta(
//     `Event service has been restarted.`,
//   )}`;
//   process.exit();
// });

//catches uncaught exceptions
process.on("uncaughtException", e =>
  log(
    `\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" I ")} ${chalk.red(
      `Event service has been stopped due to an error: ${e.stack}.`,
    )}`,
  ),
);
