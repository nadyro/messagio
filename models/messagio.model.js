var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var MessagioSchema = new mongoose.Schema({
    title: String,
    content: String,
    position: Number,
    date: Date,
    status: String,
    emitter: String,
    receiver: String
});

MessagioSchema.plugin(mongoosePaginate)
const Messagio = mongoose.model('Messagio', MessagioSchema);

module.exports = Messagio;