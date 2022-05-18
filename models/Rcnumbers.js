const mongoose = require('mongoose')


const RcnumberSchema = new mongoose.Schema({
    number: {
        type: Object,
        required: true,
    },
    docName : {
        type: String,
        required: true,
    },
    docDate: {
        type: String,
        required: true,
    },
});

const RcnumberModel = mongoose.model('Rcnumbers', RcnumberSchema);

module.exports = RcnumberModel;