var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var UsersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    d_o_b: String,
    bio: String
});
UsersSchema.plugin(mongoosePaginate);
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;