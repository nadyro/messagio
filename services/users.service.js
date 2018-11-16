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
    catch (e) {
        console.log(e);
        throw Error(e);
    }
}

exports.updateUsers = async function (users) {
    var id = users.id;
    try {
        var user_to_update = await Users.findById(id);
        console.log(user_to_update);
    }
    catch (e) {
        throw Error(e);
    }

    if (!user_to_update)
        return (false);
    else {
        user_to_update.first_name = users.first_name;
        user_to_update.last_name = users.last_name;
        user_to_update.email = users.email;
        user_to_update.password = users.password;
        user_to_update.d_o_b = users.d_o_b;
        user_to_update.bio = users.bio;
    }
    console.log(user_to_update);
    try {
        var savedUser = await user_to_update.save();
        return (savedUser);
    }
    catch(e){
        throw Error(e);
    }
}

exports.createUsers = async function (users) {
    var newUser = new Users({
        last_name: users.last_name,
        first_name: users.first_name,
        email: users.email,
        password: users.password,
        d_o_b: users.d_o_b,
        bio: users.bio
    });
    try {
        var savedUsers = await newUser.save();
        return savedUsers;
    }
    catch (e) {
        console.log(e);
        throw Error(e);
    }
}