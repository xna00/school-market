import { Express } from "express";
export default (app: Express) => {
  const mongoose = require("mongoose");
  mongoose.set("useCreateIndex", true);
  mongoose.connect("mongodb://127.0.0.1:27017/school-market", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  require("require-all")(__dirname + "/../models");
};
