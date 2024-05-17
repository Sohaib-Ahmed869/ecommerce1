const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
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
    phone: {
        type: String,
        required: true
    },
});

let Admin;

if (mongoose.models.Admin) {
    Admin = mongoose.model('Admin');
    }
else {
    Admin = mongoose.model('Admin', AdminSchema);
}

module.exports = Admin;