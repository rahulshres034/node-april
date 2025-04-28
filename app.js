const express = require("express");
const { blog } = require("./model");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const blogs = await blog.findAll();
  res.render("homepage.ejs", { blogs });
});

app.get("/createblog", (req, res) => {
  res.render("createBlog");
});

app.post("/createBlog", async (req, res) => {
  const { title, subtitle, description } = req.body;
  console.log(title, subtitle, description);
  const createBlog = await blog.create({
    title,
    subtitle,
    description,
  });

  console.log(createBlog);
  res.send("Blog Created");
});

app.listen(3000, function () {
  console.log("Port Running");
});
