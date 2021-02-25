const mongoose = require('mongoose');

const CdiSchema = mongoose.Schema({
    date: Date,
    tax: Number
}, {
    versionKey: false
});

CdiSchema.index({ date: -1 });

module.exports = mongoose.model('Cdi', CdiSchema);
