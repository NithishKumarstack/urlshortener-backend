const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  shortId: { type: String, required: true, unique: true },
  redirectUrl: { type: String, required: true },
  visitedHistory: [{ timestamp: { type: Number } }]
});

urlSchema.virtual('visitCount').get(function() {
  return this.visitedHistory.length;
});

module.exports = mongoose.model("url", urlSchema);
