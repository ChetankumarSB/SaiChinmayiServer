const mongoose = require('mongoose')


const RcnumSchema = new mongoose.Schema({
    rcnum: {
        type: String,
        required: true,
    },
});

const RcnumModel = mongoose.model('Rcnums', RcnumSchema);

module.exports = RcnumModel;