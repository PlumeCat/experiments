document.addEventListener("DOMContentLoaded", init);

var tickTime = 30;
var branches = [];
var canvas = null;
var context = null;

function init()
{
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.addEventListener("click", click);
	document.addEventListener("keydown", key);

	canvas.width = window.innerWidth * 0.8;
	canvas.height = window.innerHeight * 0.8;
	canvas.style.width = "80%";
	canvas.style.height = "80%"
	
	setTimeout(update, tickTime);
}
function key()
{
	console.log("clear");
	context.fillStyle="#d0d0d0";
	context.fillRect(0, 0, canvas.width, canvas.height);
}
function click(event)
{
	// createBranch(event.xy);
	var rect = canvas.getBoundingClientRect();
	createBranch(event.x-rect.left, event.pageY-rect.top, Math.PI/2, 8, Math.random()*0.5 + 0.2);
	console.log("click");
}

function createBranch(x, y, angle, size, div)
{
	b = { 
		x : x,
		y : y,
		angle : angle,
		size : size,
		age : 0,
		div : div,
		};
	branches.push(b);
}
function updateBranch(b)
{
	context.beginPath();
	context.arc(b.x, b.y, b.size, 0, Math.PI*2);
	context.fillStyle = "brown";
	context.fill();
	//context.stroke();
	
	b.x += Math.cos(b.angle) * b.size;
	b.y -= Math.sin(b.angle) * b.size;
	b.age += 1;
	
	if (b.size > 2 && Math.random() < 0.1)
	{
		createBranch(b.x, b.y, b.angle+(Math.random()-0.5)*0.5, b.size-1, b.div);
	}
	
	if (Math.random() < (1.0 / (b.size+1)) || b.age >= 10)
	{
		context.beginPath();
		context.arc(b.x, b.y, 6, 0, Math.PI*2);
		context.fillStyle = (Math.random() < 0.1) ? "red" : "green";
		context.fill();
		//context.stroke();
	}
	
	if (b.age >= 10)
	{
		// create 1 or 2 smaller branches
		if (b.size > 2)
		{
			createBranch(b.x, b.y, b.angle+b.div, b.size-1, b.div);
			createBranch(b.x, b.y, b.angle-b.div, b.size-1, b.div);
		}
		return true;
	}
	
	return false;
}

function update()
{	
	for (var i = 0; i < branches.length; i += 1)
	{
		var destroy = updateBranch(branches[i]);
		if (destroy)
		{
			branches.splice(i, 1);
			i -= 1;
			console.log("splice");
		}
	}
	setTimeout(update, tickTime);
}