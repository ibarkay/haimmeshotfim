const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./modules/mongoose");
const app = express();
const AWS = require("aws-sdk");

const port = 5000;
// ------module import----------------

const Poem = require("./modules/Poem");
const Comment = require("./modules/Comment");
// -------use's---------------
app.use(cors());
app.use(express.json());
// !-----tests------------------

app.get("/api/translate/:text", async (req, res) => {
	let resp = "";
	const translate = async () => {
		await AWS.config.update({ region: "eu-central-1" });
		const translate = new AWS.Translate();
		const params = {
			SourceLanguageCode: "auto",
			TargetLanguageCode: "es",
			Text: req.params.text,
		};
		resp = await translate.translateText(params);
		console.log(resp);
	};
	await translate();
	res.send(resp);
});

// !-----tests------------------
// -------end-points---------------
app.get("/api/", (req, res) => {
	try {
		res.send("nice. you are connected now.");
	} catch (e) {
		res.status(500).send(e.message);
	}
});
// ?get poems
app.get("/api/poems", async (req, res) => {
	try {
		const resp = await Poem.find({});
		res.send(resp);
	} catch (e) {
		res.status(500).send(e.message);
	}
});
// ?get poem by name
app.get("/api/poems/:name", async (req, res) => {
	try {
		const resp = await Poem.find({ poemName: req.params.name });
		res.send(resp);
	} catch (e) {
		res.status(500).send(e.message);
	}
});
// ?create poem
app.post("/api/poems/new", async (req, res) => {
	try {
		const arr = new Poem({
			authorName: req.body.authorName,
			poemName: req.body.poemName,
			poem: req.body.poem,
			translate: req.body.translate,
		});
		arr
			.save()
			.then(() => {
				res.status(200).send(arr);
			})
			.catch((e) => {
				res.status(500).send(e.message);
			});
	} catch (e) {
		res.status(500).send(e);
	}
});
// ?delete poem
app.delete("/api/poems/:name", async (req, res) => {
	try {
		const resp = await Poem.deleteOne({ poemName: req.params.name });
		if (resp.deletedCount > 0) {
			res.send(`${req.params.name} was deleted from poems`);
		}
		throw new Error("unable to find Poem");
	} catch (e) {
		res.status(500).send(e.message);
	}
});
// ?add comment

app.put("/api/poems/:name", async (req, res) => {
	try {
		const poem = await Poem.findOne({ poemName: req.params.name });
		poem.comments.push({ title: req.body.title, text: req.body.text });
		poem
			.save()
			.then(() => {
				res.send("comment was saved.");
			})
			.catch((e) => {
				res.status(500).send("unable to save comment");
			});
	} catch (e) {
		res.status(500).send(e.message);
	}
});

// ----------listener--------------
app.listen(port, () => {
	console.log("running on http://3.122.232.246:5000");
});
