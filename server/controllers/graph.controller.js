const Graph = require('../models/graph.model');

const createGraph = (req, res) => {
    Graph
        .create(req.body)
        .then((newGraph) => {res.json(newGraph)})
        .catch((err) => res.status(400).json(err));
}

const getAllGraphs = (req, res) => {
    Graph
        .find()
        .then((allGraphs) => {res.json(allGraphs)})
        .catch((err) => res.status(400).json(err));
}

const getOneGraph = (req, res) => {
    Graph
        .findOne({_id: req.params.id})
        .then((oneGraph) => {res.json(oneGraph)})
        .catch((err) => res.status(400).json(err));
}

const updateGraph = (req, res) => {
    Graph
        .findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then((updatedGraph) => {res.json(updatedGraph)})
        .catch((err) => res.status(400).json(err));
}

const deleteGraph = (req, res) => {
    Graph
        .deleteOne({_id: req.params.id})
        .then((mongooseResponse) => res.json(mongooseResponse))
        .catch((err) => res.status(400).json(err));
}

module.exports = {
    createGraph,
    getAllGraphs,
    getOneGraph,
    updateGraph,
    deleteGraph
}