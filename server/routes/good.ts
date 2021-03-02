import express, { Express } from "express";
import Good from "../models/Good";
export default (app: Express) => {
  const router = express.Router({
    mergeParams: true,
  });

  router.get("/", async (req, res) => {
    const goods = await Good.find();
    res.send(goods);
  });

  router.post("/", async (req, res) => {
    const good = await Good.create(req.body);
    res.send(good);
  });

  router.get("/:id", async (req, res) => {});

  router.delete("/:id", async (req, res) => {});

  app.use("/api/goods", router);
};
