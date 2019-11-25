const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

require("./routes/indexRoutes")(app);

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;
console.log(`api listening on port:${PORT}`);
app.listen(PORT);
