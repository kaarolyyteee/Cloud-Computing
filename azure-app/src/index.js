import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// find path of file
const __filename = fileURLToPath(import.meta.url);
// take the directory name
const __dirname = path.dirname(__filename);

// environment variables
dotenv.config();

const app = express();
const port = process.env.PORT;

// set the view engine to ejs
app.set("view engine", "ejs");
// change path of views
app.set("views", path.join(__dirname, "/views"));

// home page
app.get("/", (_, res) => {
  res.render("pages/home");
});

// about page
app.get("/about", (_, res) => {
  res.render("pages/about");
});

app.listen(port, () => {
  console.log("Server is running");
});
