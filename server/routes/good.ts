import express, { Express } from "express";
import Good from "../models/Good";
export default (app: Express) => {
  const router = express.Router({
    mergeParams: true,
  });

  // router.get('/import', async(req,res)=>{
  //   const goods = await Good.insertMany(
  //     []
  //   )
  //   res.send(goods)
  // })

  router.get("/", async (req, res) => {
    let { pageNum, pageSize } = req.query;
    if (typeof pageNum !== "string" || typeof pageSize !== "string") {
      pageNum = "1";
      pageSize = "10";
    }
    let num = parseInt(pageNum);
    let size = parseInt(pageSize);
    const goods = await Good.find()
      .sort({ _id: -1 })
      .skip(size * (num - 1))
      .limit(size);
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