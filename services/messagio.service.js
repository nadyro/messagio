var Messagio = require('../models/messagio.model');

_this = this

exports.getMessagio = async function (query, page, limit) {
    var options = {
        page,
        limit,
        sort: {date: -1}
    }

    try {
        var messagios = await Messagio.paginate(query, options);
        return messagios;
    }
    catch (e) {
        throw Error('Error while paginating Messagios');
    }
}

exports.createMessagio = async function (messagio) {
    save_date = new Date();
    var newMessagio = new Messagio({
        title: messagio.title,
        content: messagio.content,
        date: save_date,
        status: messagio.status,
        emitter: messagio.emitter,
        receiver: messagio.receiver
    })

    try {
        var savedMessagio = await newMessagio.save();
        return savedMessagio;
    }
    catch (e){
        throw Error(e);
    }
}

exports.updateMessagio = async function(messagio){
    var id = messagio.id;

    try {
        var oldMessagio = await Messagio.findById(id);
    }
    catch(e){
        throw Error('Error while retrieving Messagio');
    }

    if (!oldMessagio)
        return (false);

        console.log(oldMessagio);
        oldMessagio.title = messagio.title;
        oldMessagio.content = messagio.content;
        oldMessagio.date = format_date(new Date());
        oldMessagio.status = messagio.status;
        oldMessagio.emitter = messagio.emitter;
        oldMessagio.receiver = messagio.receiver;
        console.log(oldMessagio);
        
        try {
            var savedMessagio = await oldMessagio.save();
            return (savedMessagio);
        }
        catch(e){
            throw Error('Error while updating Messagio');
        }
}

exports.deleteMessagio = async function(id) {
    try {
        var deletedMessagio = await Messagio.remove({_id: id});
        if (deletedMessagio.result.n === 0){
            throw Error('Could not delete Messagio');
        }
        return deletedMessagio;
    }
    catch (e){
        throw Error('Error while deleting Messagio');
    }
}