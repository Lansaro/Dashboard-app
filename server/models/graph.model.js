const mongoose = require('mongoose');

const GraphSchema = new mongoose.Schema({
    type: String,
    tableId: String,
    xAxis: String,
    yAxis: String,
    y2Axis: String,
    y3Axis: String
}, { timestamps: true })

module.exports = mongoose.model('Graph', GraphSchema);