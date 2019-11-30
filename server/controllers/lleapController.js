const axios = require("axios");

const quarkReq = axios.create({
  baseURL: "https://test.quark.ai",
  timeout: 10000,
  headers: { content_type: "application/json" }
});

module.exports = {
  lleapTest: async (req, res) => {
    console.log("2");
    if (res.err) {
      res.status(501).send(res.err);
    } else {
      const time = new Date();
      console.log("3");
      res.status(201).send({ received: "yes", time: time.getTime() });
    }
  },
  voice: async (req, res) => {
    const d = req.body.data;
    const utterance = d[0].utterance;
    const speech = d[0].speech;
    const convid = d[0].convid;
    if (res.err) {
      res.status(501).send(res.err);
    } else {
      // content_type application/json
      const data = await quarkReq.post("dialogapi/getResponse", {
        utterance,
        speech,
        convid
      });
      const { feedback, actions } = data.data;
      console.log("feedback", feedback);
      console.log("actions", actions);

      res.status(201).send({ actions, feedback });
    }
  }
};

// YEAR	QUARTER	MONTH	DAY_OF_MONTH	DAY_OF_WEEK	OP_UNIQUE_CARRIER	ORIGIN_AIRPORT_ID	ORIGIN_CITY_MARKET_ID	ORIGIN	ORIGIN_STATE_ABR	ORIGIN_WAC	DEST_AIRPORT_ID	DEST_CITY_MARKET_ID	DEST	DEST_STATE_ABR	DEST_WAC	CRS_DEP_TIME	DEP_DELAY_GROUP	DEP_TIME_BLK	CRS_ARR_TIME	CRS_ELAPSED_TIME	DISTANCE	DISTANCE_GROUP	ARR_PRECIP_PROBABLILITY	ARR_PRECIP_INTESITY	ARR_VISIBILITY	DEP_PRECIP_PROBABLILITY	DEP_PRECIP_INTESITY	DEP_VISIBILITY
