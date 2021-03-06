import Event from "../models/Event";
import Update from "../models/Update";
import Resources from "../models/Resources";
import setup from "../services/SetupService";

const resources: Resources = setup();

exports.handler = async (event: Event) => {
  const { body } = event;
  const ev: Update = JSON.parse(body);

  let results;
  try {
    results = await resources.updatesService.processUpdate(ev);
  } catch (err) {
    console.log("error in lambda while handling event");
    console.log(err);
    return {
      statusCode: 500,
      body: "something went wrong!"
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
};
