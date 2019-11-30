const controller = require("../controllers");

const { lleapController } = controller;

module.exports = app => {
  app.post("/lleap-test", lleapController.lleapTest);
  app.post("/voice", lleapController.voice);
};
