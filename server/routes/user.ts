import express, { Express } from "express";
import auth from "../middleware/auth";
import User from "../models/User";

export default (app: Express) => {
  const router = express.Router();

  router.get("/me", auth(), async (req: any, res) => {
    res.send(req.user);
  });

  router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).populate("goods");
    res.send(user);
  });
  app.use("/api/users", router);
};
