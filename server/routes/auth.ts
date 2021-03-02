import express, { Express } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import assert = require("http-assert");
import errorHandler from "../middleware/errorHandler";

export default (app: Express) => {
  const router = express.Router();

  router.use(errorHandler());
  router.post("/register", async (req, res) => {
    const newUser = await User.create(req.body);
    res.send(newUser);
  });

  router.post("/login", async (req, res) => {
    const { account, password } = req.body;
    const user = await User.findOne({ account }).select("+password");
    console.log(user);
    assert(user, 422, "用户不存在");
    const isValid = require("bcrypt").compareSync(password, user!.password);
    assert(isValid, 422, "密码错误");
    const token = jwt.sign({ id: user!._id }, app.get("secret"));
    res.send({ token });
  });

  app.use("/api/auth", router);
};
