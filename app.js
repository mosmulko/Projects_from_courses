const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const debug = require("debug")("app");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 3000;
const nav = [
  { link: "/books", title: "Books" },
  { link: "/authors", title: "Authors" },
];

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "library" }));

require("./src/config/passport")(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Routers
const bookRouter = require("./src/routes/bookRoutes")(nav);
const adminRouter = require("./src/routes/adminRoutes")(nav);
const authRouter = require("./src/routes/authRoutes")(nav);

app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Library",
    nav,
  });
});

app.listen(port, () => {
  debug(`listening on the port ${chalk.green(port)}`);
});
