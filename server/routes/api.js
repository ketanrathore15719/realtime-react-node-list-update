const userController = require('../controller/userController')

function initRoutes(app) {
	app.get('/user', userController().index)
	app.post('/user/create', userController().create)
	app.get('/user/:id',userController().getUser)
	app.post('/user/update/:id',userController().update)
}

module.exports = initRoutes