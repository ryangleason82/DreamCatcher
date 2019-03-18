const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
	let errors = {};
	data.text = !isEmpty(data.text) ? data.text : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
		errors.text = "Post must be between 10 and 1000 characters";
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = "Text field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
