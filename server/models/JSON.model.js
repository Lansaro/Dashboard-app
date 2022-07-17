const mongoose = require('mongoose');

const JSONSchema = new mongoose.Schema({
    tableName: {
        type: String,
        required: [true, 'Table name is required']
    },
    headers: Array,
    json: Object
}, { timestamps: true })

module.exports = mongoose.model('JSON', JSONSchema);