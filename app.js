const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

app.get("/createblog", (req, res) => {
  res.render("createBlog");
});

app.post("/createBlog", async (req, res) => {
  const { title, subtitle, description } = req.body;
  console.log(title, subtitle, description);
});
app.listen(3000, function () {
  console.log("Port Running");
});
