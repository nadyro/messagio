var Users = require('../models/users.model');

exports.checkUser = async function (user){
    var user_to_check = Users.findOne({email: user.email});
    return user_to_check;
}