const mongoose = require('mongoose');

const uuidSchema = new mongoose.Schema({
    uuid:String,
    status:Number
}, {collection:"uuid"})

const Uuid = mongoose.model('Uuid', uuidSchema);

module.exports = Uuid;