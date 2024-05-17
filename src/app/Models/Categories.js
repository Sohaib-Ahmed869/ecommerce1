const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

let Category;

if (mongoose.models.Category) {
  Category = mongoose.model("Category");
} else {
  Category = mongoose.model("Category", CategorySchema);
}

module.exports = Category;
