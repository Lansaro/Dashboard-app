const JSONController = require('../controllers/JSON.controller');

module.exports = (app) => {
    app.post('/api/JSON', JSONController.createJSON);
    app.get('/api/JSON', JSONController.getAllJSON);
    app.get('/api/JSON/:id', JSONController.getOneJSON);
    app.delete('/api/JSON/:id', JSONController.deleteJSON);
}