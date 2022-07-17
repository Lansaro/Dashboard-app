const JSON = require('../models/JSON.model');

const createJSON = (req, res) => {
    JSON
        .create(req.body)
        .then((newJSON) => {res.json(newJSON)})
        .catch((err) => res.status(400).json(err));
}

const getAllJSON = (req, res) => {
    JSON
        .find({},{'json':0})
        .then((allJSON) => {(res.json(allJSON))})
        .catch((err) => res.status(400).json(err));
}

const getOneJSON = (req, res) => {
    JSON
        .findOne({_id: req.params.id})
        .then((JSON) => {res.json(JSON)})
        .catch((err) => res.status(400).json(err));
}

const deleteJSON = (req, res) => {
    JSON
        .deleteOne({_id: req.params.id})
        .then((mongooseResponse) => res.json(mongooseResponse))
        .catch((err) => res.status(400).json(err));
}

module.exports = {
    createJSON,
    getAllJSON,
    getOneJSON,
    deleteJSON
}