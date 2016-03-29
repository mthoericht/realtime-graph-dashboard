var inputFields = [];
var inputParent;

//default-startvalues
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
		//backend => do nothing
	});

	// send graph
	function send()
	{
		//var text = $('#text').val();

		//update all values in the currentGraph-Array
		for(var i = 0; i < inputFields.length; i++)
		{
			currentGraph[i]	= {};
			currentGraph[i].label = inputFields[i].inputLabel.value;
			currentGraph[i].data = inputFields[i].inputValue.value;
		}

		socket.emit('graph', { graph: currentGraph });
	}

	// Send
	$('#send').click(send);

	//new input-field
	$('#add').click(addInputField);

	initInputFields();

	//Send on init
	send();
});


//The number of inputfield depends of the array-size
function initInputFields()
{
	inputParent         = document.getElementById("inputFields");

	for(var i = 0; i < currentGraph.length; i++)
	{
		addInputField();
	}
}


//Simple function to add one Inputfield-line (With label and value)
function addInputField()
{
	inputFields.push(document.createElement('div'));

	var currentIndex = inputFields.length - 1;

	inputFields[currentIndex].appendChild(document.createTextNode("Label: "));

	inputFields[currentIndex].inputLabel = document.createElement('input');
	inputFields[currentIndex].inputLabel.id	= "label" + currentIndex;

	if(currentGraph[currentIndex] != undefined)
	{
		inputFields[currentIndex].inputLabel.value	= currentGraph[currentIndex].label;
	}else
	{
		inputFields[currentIndex].inputLabel.value	= "insert label!";
	}

	inputFields[currentIndex].appendChild(inputFields[currentIndex].inputLabel);
	inputFields[currentIndex].appendChild(document.createTextNode("Value: "));

	inputFields[currentIndex].inputValue = document.createElement('input');
	inputFields[currentIndex].inputValue.id	= "value" + currentIndex;
	inputFields[currentIndex].inputValue.type	= "Number";

	if(currentGraph[currentIndex] != undefined)
	{
		inputFields[currentIndex].inputValue.value	= currentGraph[currentIndex].data;
	}else
	{
		inputFields[currentIndex].inputValue.value	= 0;
	}

	inputFields[inputFields.length - 1].appendChild(inputFields[inputFields.length - 1].inputValue);

	inputParent.appendChild(inputFields[inputFields.length - 1]);
}