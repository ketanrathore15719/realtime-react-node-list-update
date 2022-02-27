const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
	username:{type:String},
	room:{type:String}
})
 
module.exports = mongoose.model('User',userSchema)