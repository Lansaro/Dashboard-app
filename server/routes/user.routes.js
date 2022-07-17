const { createNewUser, login } = require('../controllers/user.controller');

module.exports = (app) => {
    app.post('/api/register', createNewUser);
    app.post('/api/login', login);
};