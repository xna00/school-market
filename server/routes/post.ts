import mongoose from "mongoose";
import Post from "./../models/Post";
import express, { Express } from "express";

export default (app: Express) => {
  const router = express.Router();
  router.get("/", async (req, res) => {
    const posts = await Post.find({ parent: null }).populate("author");
    res.send(posts);
  });
  router.get("/:id", async (req, res) => {
    const post: any = await Post.findById(req.params.id);
    const replies = await Post.aggregate([
      { $match: { parent: post?._id } },
      {
        $lookup: {
          from: "posts",
          foreignField: "parent",
          localField: "_id",
          as: "replies",
        },
      },
      {
        $addFields: {
          replies: { $slice: ["$replies", 2] },
        },
      },
    ]);
    post.replies = replies;
    res.send(post);
  });
  router.post("/", async (req, res) => {
    const post = await Post.create(req.body);
    res.send(post);
  });
  app.use("/api/posts", router);
};
