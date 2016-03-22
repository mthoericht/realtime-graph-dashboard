
var currentGraph	= [	{label: "7:00", data: 5},
						{label: "8:00", data: 6},
						{label: "9:00", data: 4},
						{label: "10:00", data: 2},
						{label: "11:00", data: 3},
						{label: "12:00", data: 8}];


$(document).ready(function()
{
	var socket = io.connect();

	// on new graph
	socket.on('graph', function (data)
	{

	});

	// send graph
	function send()
	{
		//var text = $('#text').val();

		socket.emit('graph', { graph: currentGraph });
	}

	// bei einem Klick
	$('#send').click(send);
});