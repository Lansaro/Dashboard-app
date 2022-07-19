const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/jwt.config');

module.exports = (app) => {
    app.post('/api/register', userController.createNewUser);
    app.post('/api/login', userController.login);
    app.post('/api/logout', userController.logout);
    app.get('/api/loggedin', authenticate, userController.getLoggedInUser);
};