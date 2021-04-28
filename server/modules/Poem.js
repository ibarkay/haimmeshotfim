const mongoose = require("mongoose");

const poemSchema = mongoose.Schema({
	authorName: {
		type: String,
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
	},
	poem: {
		type: String,
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
