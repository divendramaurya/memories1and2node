import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log("in try getPosts node js");
    res.status(200).json(postMessages);
  } catch (error) {
    console.log("in catch getPosts node js");
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    console.log("in try createPost node js");
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("in catch createPost node js");
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log("id is" + _id);
  const post = req.body;
  console.log("changed post is below");
  console.log(post);

  try {
    console.log("in try updatePost node js");
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      console.log("id wrong hai in update node");
      return res.status(404).send("No post with that id for updating");
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    console.log("updatedPost is below");
    console.log(updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.log("in catch updatePost node js");
    res.json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("in try deletePost node js");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("id wrong hai in delete node");
      return res.status(404).send("No post with that id for deleting");
    }
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted Successfully" });
  } catch (error) {
    console.log("in catch deletePost node js");
    res.json({ message: error });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("in try likePost node js");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("id wrong hai in likePost node");
      return res.status(404).send("No post with that id for likePost");
    }
    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    // console.log("Like updatedPost is below");
    // console.log(updatedPost);

    res.json(updatedPost);
  } catch (error) {
    console.log("in catch likePost node js");
    res.json({ message: error });
  }
};
