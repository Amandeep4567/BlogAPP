const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express and MongoDb",
    };
    let perPage = 6;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    // const data = await Post.find();
    // res.render("index", { locals, data });
    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//       body: "This is the body text",
//     },
//     {
//       title: "The Art of Productivity",
//       body: "Discover effective strategies and tips to boost your productivity and achieve your goals.",
//     },
//     {
//       title: "Exploring Culinary Delights",
//       body: "Embark on a journey through the world of gastronomy as we explore unique and delicious recipes from diverse cuisines.",
//     },
//     {
//       title: "Mastering the Coding Craft",
//       body: "Unlock the secrets of coding mastery with in-depth tutorials, coding challenges, and best practices for aspiring developers.",
//     },
//     {
//       title: "Navigating the Digital Nomad Lifestyle",
//       body: "Learn how to embrace the freedom of remote work and become a successful digital nomad, balancing work and adventure.",
//     },
//     {
//       title: "Mindful Living in a Hectic World",
//       body: "Explore mindfulness techniques and practices to bring peace and balance to your life, even in the midst of a busy schedule.",
//     },
//     {
//       title: "Behind the Lens: Photography Unveiled",
//       body: "Dive into the world of photography, from essential techniques to creative approaches, and capture breathtaking moments with your camera.",
//     },
//     {
//       title: "Financial Fitness 101",
//       body: "Get practical advice on managing your finances, building a budget, and making smart investment decisions for a secure financial future.",
//     },
//     {
//       title: "The Power of Storytelling",
//       body: "Discover the art of storytelling and how it can be a compelling force in various aspects of life, from personal anecdotes to business narratives.",
//     },
//     {
//       title: "Fitness Fusion: Blending Workouts for Results",
//       body: "Explore innovative workout routines that combine different fitness disciplines for a holistic approach to health and well-being.",
//     },
//     {
//       title: "Tech Trends: Shaping the Future",
//       body: "Stay ahead of the curve with insights into the latest technological trends and their impact on industries and society as a whole.",
//     },
//   ]);
// }
// insertPostData();

module.exports = router;
