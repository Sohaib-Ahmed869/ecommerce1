const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id : {
        type: "String",
        required: true
    },
    order: {
        type: "Array",
        required: true
    },
    total: {
        type: "Number",
        required: true
    },
    status: {
        type: "String",
        required: true
    },
    payment_method: {
        type: "String",
        required: true
    },
    address : {
        type: "String",
        required: true
    },
    created_at: {
        type: "Date",
        default: Date.now
    }

});


if(mongoose.models.Order) {
    module.exports = mongoose.model("Order");
}
else {
    module.exports = mongoose.model("Order", OrderSchema);
}

// Path: src/app/Models/Order.js
