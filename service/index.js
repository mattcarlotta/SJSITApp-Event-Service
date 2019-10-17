import "middlewares";
import { scheduleJob } from "node-schedule";
import { initiatedLogger } from "loggers";
import { createEvents } from "libs";

//= ===========================================================//
// CREATE POLLING SERVICES                                     //
//= ===========================================================//

scheduleJob("59 7 1 * *", async () => {
  console.log(initiatedLogger());

  await createEvents();
});
