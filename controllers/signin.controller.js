var signinService = require('../services/signin.service');

exports.getUserByEmail = async function (request, response) {
    var user = {
        email: request.body.email,
        password: request.body.password
    }
    try {
        console.log(request.body);
        var user_to_check = await signinService.checkUser(user);
        console.log(user_to_check);
        var exists = false;
        if (user_to_check.password === user.password) {
            exists = true;
            request.mySession.user_session = user_to_check;
        }
        console.log(request.mySession);
        return (response.status(200).json({
            status: 200,
            data: user_to_check,
            session: request.mySession,
            exists: exists,
            message: "Successfuly retrieve user by email"
        }));
    }
    catch (e) {
        throw Error(e);
    }
}

exports.getSession = async function(request, response) {
    return request;
    /*if (request.mySession)
        return (request.mySession);
    else
        return (null);*/
}