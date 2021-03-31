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
    const post: any = await Post.findById(req.params.id).populate("author");
    const getReplies = (post) =>
      Post.aggregate([
        { $match: { parent: post?._id } },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "replyTo",
            as: "replyTo",
          },
        },
        { $addFields: { author: { $arrayElemAt: ["$author", 0] } } },
        { $addFields: { replyTo: { $arrayElemAt: ["$replyTo", 0] } } },
      ]);
    const replies = await getReplies(post);
    for (let reply of replies) {
      reply.replies = await getReplies(reply);
    }
    post.replies = replies;
    res.send(post);
  });
  router.post("/", async (req, res) => {
    const post = await Post.create(req.body);
    res.send(post);
  });
  app.use("/api/posts", router);
};
