const mongoose = require("mongoose");

const poemSchema = mongoose.Schema({
	authorName: {
		type: String,
		required: true,
	},
	authorInfo: {
		type: String,
	},
	category: {
		type: String,
	},

	poemName: {
		type: String,
		unique: true,
		required: true,
	},
	poem: {
		type: String,
		required: true,
	},
	translate: {
		type: String,
	},
	// comments: [
	// 	{
	// 		title: {
	// 			type: String,
	// 			required: true,
	// 			unique: true,
	// 		},
	// 		text: {
	// 			type: String,
	// 			required: true,
	// 		},
	// 	},
	// ],
});

const Poem = mongoose.model("Poem", poemSchema);

module.exports = Poem;
