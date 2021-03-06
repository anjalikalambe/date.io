var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const mongoose = require('mongoose');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const roomsRouter = require("./routes/rooms");

//stop cors error
var cors = require('cors')

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 100);
});

const app = express();
app.use(connectLivereload());
app.use(cors())

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/rooms", roomsRouter);

require('dotenv').config(); // sensitive information

//connect to mongo cluster 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to Mongo Cluster established!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get("env") === "development" ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render("error");
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server starting on port ${PORT}`));

module.exports = app;
