module.exports = {
  lleapTest: async (req, res) => {
    if (res.err) {
      res.status(501).send(res.err);
    } else {
      const time = new Date();
      res.status(201).send({ received: "yes", time: time.getTime() });
    }
  }
};

// YEAR	QUARTER	MONTH	DAY_OF_MONTH	DAY_OF_WEEK	OP_UNIQUE_CARRIER	ORIGIN_AIRPORT_ID	ORIGIN_CITY_MARKET_ID	ORIGIN	ORIGIN_STATE_ABR	ORIGIN_WAC	DEST_AIRPORT_ID	DEST_CITY_MARKET_ID	DEST	DEST_STATE_ABR	DEST_WAC	CRS_DEP_TIME	DEP_DELAY_GROUP	DEP_TIME_BLK	CRS_ARR_TIME	CRS_ELAPSED_TIME	DISTANCE	DISTANCE_GROUP	ARR_PRECIP_PROBABLILITY	ARR_PRECIP_INTESITY	ARR_VISIBILITY	DEP_PRECIP_PROBABLILITY	DEP_PRECIP_INTESITY	DEP_VISIBILITY