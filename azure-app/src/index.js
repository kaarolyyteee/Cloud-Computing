import axios from "axios";
import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

import { router as authorRouter } from "./controller/authorController.js";
import { router as postRouter } from "./controller/postController.js";

// find path of file
const __filename = fileURLToPath(import.meta.url);
// take the directory name
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

// set the view engine to ejs
app.set("view engine", "ejs");
// change path of views
app.set("views", path.join(__dirname, "/views"));
// static files. Like css/image
app.use(express.static(__dirname + "/public"));
//
app.use(express.json());

// backend routes
app.use("/api/v1/author", authorRouter);
app.use("/api/v1/post", postRouter);

// frontend routes
// home page
app.get("/", async (_, res) => {
  try {
    const authors = await axios
      .get("https://blog-webapp.azurewebsites.net/api/v1/author")
      .then((response) => response.data);

    const posts = await axios
      .get("https://blog-webapp.azurewebsites.net/api/v1/post")
      .then((response) => response.data);

    console.log(posts);

    res.render("pages/home", { posts: posts });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// about page
app.get("/about", (_, res) => {
  res.render("pages/about");
});

// other pages return not found
app.all("*", (_, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
