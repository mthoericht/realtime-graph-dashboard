var express = require('express')
,   app = express()
,   server = require('http').createServer(app)
,   io = require('socket.io').listen(server)
,   config = require('./config.json');

// Webserver
// listen to the port (in this example 8080)
server.listen(config.port);

var currentGraph;


app.configure(function()
{
	//static files
	app.use(express.static(__dirname + '/public/frontend'));
	app.use(express.static(__dirname + '/public/backend'));
});


// on request the root-path
app.get('/', function (req, res)
{
	// redirecting to client.html
	res.sendfile(__dirname + '/public/frontend/client.html');
});


// especially the backend-path
app.get('/backend', function (req, res)
{
	// redirecting to backend.html
	res.sendfile(__dirname + '/public/backend/backend.html');
});


// Websocket-Connection-listener
io.sockets.on('connection', function (socket)
{
	//if currentgraph is undefined set the default-graph

	// the client is connected
	socket.emit('graph', { time: new Date(), graph: currentGraph });

	//on graph-update
	socket.on('graph', function (data)
	{
		currentGraph = data.graph;

		// the function to send the graph to all clients
		io.sockets.emit('graph', { time: new Date(), graph: currentGraph });
	});
});


console.log('The server is started! Please open this URL: http://127.0.0.1:' + config.port + '/');