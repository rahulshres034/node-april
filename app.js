const express = require("express");
const { blog } = require("./model");
const { where } = require("sequelize");
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

app.get("/single/:id", async (req, res) => {
  const id = req.params.id;
  const singleBlog = await blog.findAll({
    where: {
      id: id,
    },
  });
  console.log(singleBlog);

  res.render("singleBlog", { blog: singleBlog });
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const deleteBlog = await blog.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/");
});

app.get("/editBlog/:id", async (req, res) => {
  const id = req.params.id;
  const singleBlog = await blog.findAll({
    where: {
      id: id,
    },
  });
  console.log(singleBlog);

  res.render("editBlog", { blog: singleBlog });
});

app.post("/editBlog/:id", async (req, res) => {
  const id = req.params.id;
  const { title, subtitle, description } = req.body;

  try {
    await blog.update({ title, subtitle, description }, { where: { id: id } });

    res.redirect("/"); // or redirect to single/:id if you want
  } catch (error) {
    console.error(error);
    res.send("Cannot edit blog");
  }
});

app.listen(3000, function () {
  console.log("Port Running");
});
