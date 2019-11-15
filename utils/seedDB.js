import { connectDatabase } from "database";
import { Season } from "models";
import { getCurrentYear, getNextYear } from "shared/helpers";

const { SEED } = process.env;

/**
 * Function to seed the testing Mongo database.
 *
 * @function
 * @async
 * @returns {string} - displays a:  PASS  utils/seedDB.js message to console.
 * @throws {error} - displays a:  FAIL  utils/seedDB.js message to console with the error.
 */

const seedDB = async () => {
  const db = connectDatabase();
  try {
    const currentYear = getCurrentYear();
    const nextYear = getNextYear();

    const newSeason = {
      seasonId: `${currentYear.format("YYYY")}${nextYear.format("YYYY")}`,
      startDate: currentYear.format(),
      endDate: nextYear.format(),
    };

    await Season.create(newSeason);

    await db.close();

    return console.log(
      "\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mseedDB.js",
    );
  } catch (err) {
    return console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );
  } finally {
    if (SEED) {
      process.exit(0);
    }
  }
};

if (SEED) seedDB();

export default seedDB;
