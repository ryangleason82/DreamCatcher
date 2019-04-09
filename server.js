const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
//console.log("Do we get here");

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
	//console.log("how bout here");
	//console.log(process.env.NODE_ENV);
	// Set static folder
	app.use(express.static(path.join(__dirname, "build")));
	app.get("/*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
	//console.log("probably not here");
}

const port = process.env.POR || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//%PUBLIC_URL%/favcon.ico should be in public/index.html
