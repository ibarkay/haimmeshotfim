const mongoose = require("mongoose");
const validator = require("validator");

const commentSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	poemID: {
		type: String,
		unique: true,
		// required: true,
	},
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
