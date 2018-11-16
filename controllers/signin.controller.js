var signinService = require('../services/signin.service');

exports.getUserByEmail = async function (request, response){
    console.log(request.body);
    var user = {
        email: request.body.email,
        password: request.body.password
    }
    try{
        var user_to_check = await signinService.checkUser(user);
        var exists = false;
        if (user_to_check.password === user.password)
            exists = true;
        return (response.status(200).json({
            status: 200,
            data: user_to_check,
            exists: exists,
            message: "Successfuly retrieve user by email"
        }));
    }
    catch (e){
        throw Error(e);
    }
}