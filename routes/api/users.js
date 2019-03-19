const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/user/test
// @desc    Tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   GET api/user/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ username: req.body.username }).then(user => {
		if (user) {
			errors.username = "Username already exists";
			return res.status(400).json(errors);
		} else {
			//
			const avatar = gravatar.url(req.body.email, {
				s: "200", //Size
				r: "pg", //Rating
				d: "mm" //Default
			});

			const newUser = new User({
				name: req.body.name,
				username: req.body.username,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

// @route   GET api/user/login
// @desc    Login User / Return JWT Token
// @access  Public
router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const username = req.body.username;
	const password = req.body.password;

	// Find user by username
	User.findOne({ username }).then(user => {
		// Check for user
		if (!user) {
			errors.username = "Username not found";
			return res.status(404).json(errors);
		}

		// Check password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User Matched
				const payload = {
					id: user.id,
					name: user.name,
					username: user.username,
					avatar: user.avatar
				};

				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token
						});
					}
				);
			} else {
				errors.password = "Password incorrect";
				return res.status(400).json(errors);
			}
		});
	});
});

// @route   GET api/user/current
// @desc    Return current user
// @access  Private
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			username: req.user.username,
			email: req.user.email
		});
	}
);

module.exports = router;
