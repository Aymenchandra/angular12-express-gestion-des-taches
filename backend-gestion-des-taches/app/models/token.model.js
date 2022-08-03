const mongoose = require("mongoose");

const Token = mongoose.model(
  "token",
  new mongoose.Schema({
    userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
  })
);

module.exports = Token;
