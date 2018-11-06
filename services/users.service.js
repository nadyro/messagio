var Users = require('../models/users.model');

exports.getUsers = async function (query, page, limit) {
    var options = {
        page,
        limit,
    }
    try {
        var users = Users.paginate(query, options);
        return users;
    }
    catch (e){
        console.log(e);
        throw Error(e);
    }
}

exports.createUsers = async function (users){
    var newUser = new Users({
        last_name: users.last_name,
        first_name: users.first_name,
        email: users.email,
        d_o_b: users.d_o_b
    });
    try {
        var savedUsers = await newUser.save();
        return savedUsers;
    }
    catch (e){
        console.log(e);
        throw Error(e);
    }
}