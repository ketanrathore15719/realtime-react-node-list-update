const User = require('../models/User')

function userController() {
	return {
		async index(req, res) {
			const user = await User.find().sort({'_id':-1});
			res.send(user)
		},

		async create(req, res) {
			console.log(req.body)
			let {username, room} = req.body;

			const user = new User({username,room});
			var userCreated = await user.save();

			console.log(userCreated)

			const userData = await User.find().sort({'_id':-1});

			const eventEmitter = req.app.get('eventEmitter')
			eventEmitter.emit('list_data',userData)

			console.log(eventEmitter)

			res.send(req.body)
		},

		async getUser(req, res) {

			const user = await User.findOne({_id:req.params.id});
			console.log(user);
			res.send(user);
		},

		async update(req, res) {
			console.log(req.body)
			var {username,room} = req.body;
			console.log(username)
			const user = await User.updateOne({_id:req.params.id},{username,room});
			
			const userData = await User.find().sort({'_id':-1});

			const eventEmitter = req.app.get('eventEmitter')
			eventEmitter.emit('list_data',userData)

			console.log(eventEmitter)

			res.send(user);
		}
	}
}

module.exports = userController