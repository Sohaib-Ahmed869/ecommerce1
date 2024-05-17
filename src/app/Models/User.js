const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: {
        type: Array,
        default: []
    },
    phone: {
        type: String,
        required: false
    },
    orders: {
        type: Array,
        default: []
    },
    favourite_categories: {
        type: Array,
        default: []
    },
    favourite_products: {
        type: Array,
        default: []
    },
    blocked: {
        type: Boolean,
        default: false
    },

});

let User;

if (mongoose.models.User) {
  User = mongoose.model('User');
} else {
  User = mongoose.model('User', UserSchema);
}

module.exports = User;