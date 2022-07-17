const mongoose = require('mongoose');

const GraphSchema = new mongoose.Schema({
    type: String,
    tableId: String,
    xAxis: String,
    yAxis: String
}, { timestamps: true })

module.exports = mongoose.model('Graph', GraphSchema);