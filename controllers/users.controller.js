var UsersService = require('../services/users.service');

exports.getUsers = async function (request, response, next){
    var page;
    var limit;

    if (request.query.page)
        page = request.query.page;
    else
        page = 1;
    if (request.query.limit)
        limit = request.query.limit;
    else
        limit = 5;
    try {
        var users = await UsersService.getUsers({}, page, limit);
        return (response.status(200).json({
            status: 200,
            data: users,
            message: "Successfully fetched Users"
        }))
    }
    catch (e){
        console.log(e);
        throw Error(e);
    }
}

exports.createUsers = async function (request, response, next){
    var user = {
        last_name: request.body.last_name,
        first_name: request.body.first_name,
        email: request.body.email,
        d_o_b: request.body.d_o_b
    }
    try {
        var createdUser = await UsersService.createUsers(user);
        console.log("User creation");
        return (response.status(201).json({
            status: 201,
            data: createdUser,
            message: "Successfully created user"
        }));
    }
    catch (e){
        return response.status(400).json({ status: 400, message: e.message });
    }
}