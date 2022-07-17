const GraphController = require('../controllers/graph.controller');

module.exports = (app) => {
    app.post('/api/graph', GraphController.createGraph);
    app.get('/api/graph', GraphController.getAllGraphs);
    app.get('/api/graph/:id', GraphController.getOneGraph);
    app.put('/api/graph/:id', GraphController.updateGraph);
    app.delete('/api/graph/:id', GraphController.deleteGraph);
}