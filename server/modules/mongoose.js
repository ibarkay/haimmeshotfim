const mongoose = require("mongoose");

// mongodb://localhost:27017/bankReact

mongoose.connect("mongodb://3.122.232.246:27017/admin", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
