const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const mongoose = require('mongoose')
const path = require('path');
const fileUpload = require('express-fileupload');
const Emitter = require('events');
require('dotenv').config()


app.use(fileUpload());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));;


const server = http.createServer(app);


const eventEmitter = new Emitter()
app.set('eventEmitter',eventEmitter);

var MongoURL = process.env.MONGO_URL

//Database
mongoose.connect(MongoURL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
)
const connection = mongoose.connection;
connection.once('open', ()=> {
	console.log('Database connection successfully!')
})


// SOCKET 

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});


io.on("connection", (socket) => {
	console.log('User connected',socket.id);

	socket.on("join_room", (data) => {
		socket.join(data);
		console.log('data', data)
	})

	socket.on("send_message", (data) => {
		console.log(data)
		socket.to(data.room).emit('receive_message',data)
	})
	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id)
	});
});


eventEmitter.on('list_data',(data)=>{
	io.emit('list_data',data)
})



//Routes
require('./routes/api')(app)

// SERVER RUNNING

app.get('/', (req, res) => {
  res.send('Socket.io and react js')
})


var port = 3001;

server.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
});








