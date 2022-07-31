const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Vote = require("../models/Vote");

// Pusher
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1455869",
  key: "1f914df2577c7dc784d2",
  secret: "4cbfa5c912157225de8b",
  cluster: "eu",
  useTLS: true
});

// @desc 
// @route GET /poll
router.get("/", (req, res) => {
  Vote.find().then(votes => {
    return res.json({sucess: true, votes: votes});
  });
});

router.post("/", (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  }
  new Vote(newVote).save().then(vote => {
    pusher.trigger("os-poll", "os-vote", {
      points: parseInt(vote.points),
      os: vote.os
    });
    return res.json({success: true, message: "Thank you for voting"});
  });
});

module.exports = router;