var UsersService = require('../services/users.service');

exports.getUsers = async function (request, response, next) {
    var page;
    var limit;

    if (request.query.page)
        page = request.query.page;
    else
        page = 1;
    if (request.query.limit)
        limit = request.query.limit;
    else
        limit = 20;
    try {
        var users = await UsersService.getUsers({}, page, limit);
        return (response.status(200).json({
            status: 200,
            data: users,
            message: "Successfully fetched Users"
        }))
    }
    catch (e) {
        throw Error(e);
    }
}
exports.updateUsers = async function (request, response, next) {
    var id = request.body._id;

    if (!id) {
        return response.status(400).json({ status: 400, message: "No id referenced" });
    }
    var user_to_update = {
        id: id,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        password: request.body.password,
        d_o_b: request.body.d_o_b,
        bio: request.body.bio,
    }
    try {
        var savedUser = await UsersService.updateUsers(user_to_update);
        return (response.status(200).json({
            status: 200,
            data: savedUser,
            message: "Successfully updated user."
        }))
    }
    catch (e) {
        throw Error(e);
    }

}
exports.createUsers = async function (request, response, next) {
    var user = {
        last_name: request.body.last_name,
        first_name: request.body.first_name,
        email: request.body.email,
        password: request.body.password,
        d_o_b: request.body.d_o_b,
        bio: request.body.bio,
    }
    try {
        var createdUser = await UsersService.createUsers(user);
        return (response.status(201).json({
            status: 201,
            data: createdUser,
            message: "Successfully created user"
        }));
    }
    catch (e) {
        return response.status(400).json({ status: 400, message: e.message });
    }
}