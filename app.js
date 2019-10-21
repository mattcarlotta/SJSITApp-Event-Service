import "middlewares";
import { scheduleJob } from "node-schedule";
import { initiatedLogger } from "loggers";
import { pollNHLAPI } from "libs";

//= ===========================================================//
// CREATE POLLING SERVICES                                     //
//= ===========================================================//

// scheduleJob("*/5 * * * * *", async () => {
//   console.log(initiatedLogger());
//
//   await pollNHLAPI();
// });

scheduleJob("59 7 20 * *", async () => {
  console.log(initiatedLogger());

  await pollNHLAPI();
});
