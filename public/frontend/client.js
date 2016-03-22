
var chartInstance;
var chartData;
var currentGraph;

$(document).ready(function()
{
	var ctx    = document.getElementById('barChart').getContext('2d');

	// WebSocket
	var socket = io.connect();

	// on new message
	socket.on('graph', function (data)
	{
		console.log(data);

		if(data.graph != null && data.graph != undefined)
		{
			currentGraph	= data.graph;

			chartData =
			{
				labels: currentGraph.map(function(graphObject)
				{
					return graphObject.label;
				}),
				datasets: [
					{
						label: "currentGraph",
						fillColor: "rgba(220,50,50,0.2)", //red
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: currentGraph.map(function(graphObject)
						{
							return graphObject.data;
						})
					}
				]
			};

			chartInstance = new Chart(ctx).Line(chartData);
		}
	});
});