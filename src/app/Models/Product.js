const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    
});

let Product;

if (mongoose.models.Product) {
    Product = mongoose.model("Product");
}

else {
    Product = mongoose.model("Product", ProductSchema);
}

module.exports = Product;