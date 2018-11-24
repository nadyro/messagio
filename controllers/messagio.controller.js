var MessagioService = require('../services/messagio.service');

_this = this;

exports.getMessagio = async function (request, response, next) {
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
        var messagios = await MessagioService.getMessagio({}, page, limit);
        messagios.docs.sort(function (sup, inf) {
            return (sup.full_date - inf.full_date);
        });
        return response.status(200).json({
            status: 200,
            data: messagios,
            message: "Successfully retrieved Messagios."
        });
    }
    catch (e) {
        return response.status(400).json({ status: 400, message: e.message });
    }
}

exports.createMessagio = async function (request, response, next) {
    var messagio = {
        title: request.body.title,
        content: request.body.content,
        position: request.body.position,
        status: request.body.status,
        emitter: request.body.emitter,
        receiver: request.body.receiver,
        id_emitter: request.body.id_emitter,
        id_receiver: request.body.id_receiver
    }

    try {
        var createdMessagio = await MessagioService.createMessagio(messagio);
        return response.status(201).json({
            status: 201,
            data: createdMessagio,
            message: "Successfully created Messagios."
        });
    }
    catch (e) {
        return response.status(400).json({ status: 400, message: e.message });
    }
}

exports.getConversation = async function (request, response) {

    var id_emitter = null;
    var id_receiver = null;

    if (request.body.id_emitter)
        id_emitter = request.body.id_emitter;
    if (request.body.id_receiver)
        id_receiver = request.body.id_receiver;
    var messagio = {
        id_emitter: id_emitter,
        id_receiver: id_receiver,
    }
    try {
        var conversation = await MessagioService.getConversation(messagio);
        return (response.status(200).json({
            status: 200,
            data: conversation,
            message: "Successfully retrieved conversation"
        }))
    }
    catch(e){
        throw Error(e);
    }
}

exports.updateMessagio = async function (request, response, next) {

    var title = null;
    var content = null;
    var position = 0;
    var status = null;
    var emitter = null;
    var receiver = null;

    if (!request.body._id)
        return response.status(400).json({ status: 400, message: "No id referenced" });
    var id = request.body._id;

    if (request.body.title)
        title = request.body.title;
    if (request.body.content)
        content = request.body.content;
    if (request.body.position)
        position = request.body.position;
    if (request.body.status)
        status = request.body.status;
    if (request.body.emitter)
        emitter = request.body.emitter;
    if (request.body.receiver)
        receiver = request.body.receiver;
    var messagio = {
        id,
        title: title,
        content: content,
        position: position,
        status: status,
        emitter: emitter,
        receiver: receiver
    }

    try {
        var updatedMessagio = await MessagioService.updateMessagio(messagio);
        return response.status(200).json({
            status: 200,
            data: updatedMessagio,
            message: "Successfully updated Messagios."
        });
    }
    catch (e) {
        return response.status(400).json({ status: 400., message: e.message })
    }
}

exports.deleteMessagio = async function (request, response, next) {
    var id = request.params.id;
    try {
        var deletedMessagio = await MessagioService.deleteMessagio(id);
        return response.status(204).json({
            status: 204,
            data: deletedMessagio,
            message: "Successfully deleted Messagio."
        });
    }
    catch (e) {
        return response.status(400).json({ status: 400., message: e.message })
    }
}