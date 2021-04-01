import express, { Express } from "express";
import auth from "../middleware/auth";
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
    const query: { description?: object } = {};
    let keyword = req.query.keyword;
    if (keyword) {
      query.description = { $regex: `.*${keyword}.*` };
    }
    let num = parseInt(pageNum);
    let size = parseInt(pageSize);
    const goods = await Good.find(query)
      .sort({ _id: -1 })
      .skip(size * (num - 1))
      .limit(size);
    res.send(goods);
  });

  router.post("/", auth(), async (req: any, res) => {
    const _good = {
      ...req.body,
      seller: req.user._id,
    };

    const good = await Good.create(_good);
    res.send(good);
  });

  router.get("/:id", async (req, res) => {
    res.send(await Good.findById(req.params.id).populate("seller"));
  });

  router.delete("/:id", auth(), async (req: any, res) => {
    const _id = req.params.id;
    const seller = req.user;
    await Good.deleteOne({
      seller,
      _id,
    });
    res.send({ success: true });
  });

  router.put("/:id", auth(), async (req: any, res) => {
    const _id = req.params.id;
    const seller = req.user;
    const good = await Good.findOneAndUpdate(
      {
        _id,
        seller,
      },
      req.body
    );
    res.send(good);
  });

  app.use("/api/goods", router);
};
