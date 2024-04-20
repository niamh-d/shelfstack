var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var usersRouter = require("./routes/users");
var shelvesRouter = require("./routes/shelves");
var itemsRouter = require("./routes/items");
var authRouter = require("./routes/auth");
var favoritesRouter = require("./routes/favorites");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/shelves", shelvesRouter);
app.use("/api/items", itemsRouter);
app.use("/api/auth", authRouter);
app.use("/api/favorites", favoritesRouter);

module.exports = app;
