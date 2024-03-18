const mongoose = require("mongoose");
const { Schema } = mongoose;

const deliverableSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Deliverable = mongoose.model("deliverable", deliverableSchema);
module.exports = Deliverable;
