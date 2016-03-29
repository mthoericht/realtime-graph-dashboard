
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
		//console.log(data);

		if(data.graph != null && data.graph != undefined)
		{
			//on first init
			if(chartInstance == undefined)
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
							//Config/Style of the graph
							label: "currentGraph",
							fillColor: "rgba(220,50,50,0.2)", //red
							strokeColor: "rgba(220,220,220,1)",
							pointColor: "rgba(220,220,220,1)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(220,220,220,1)",

							//Graph-values
							data: currentGraph.map(function(graphObject)
							{
								return graphObject.data;
							})
						}
					]
				};

				chartInstance = new Chart(ctx).Line(chartData);
			}else	//Update the current graph
			{
				//only value-change
				if(data.graph.length == currentGraph.length)
				{
					for(var i = 0; i < currentGraph.length; i++)
					{
						chartInstance.datasets[0].points[i].value = currentGraph[i].data;
					}

					chartInstance.update();

				}else if(data.graph.length > currentGraph.length) //on new values/data => addData
				{
					for(var a = currentGraph.length; a < data.graph.length; a++)
					{
						chartInstance.addData([data.graph[a].data], data.graph[a].label);
					}
				}

				currentGraph = data.graph;
			}
		}
	});
});