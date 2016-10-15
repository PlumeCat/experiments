document.addEventListener("DOMContentLoaded", init);
document.addEventListener("mousedown", mousedown);
document.addEventListener("mousemove", mousemove);
document.addEventListener("mouseup", mouseup);

var numPoints = 10;
var K = 1.5;
var M = 0.5;
var F = 0.97;
var G = 0.98;
var D = 32;
var points = [];
var grabbedPoint = null;
var canvas = null;
var context = null;
var mouse = { x : 0, y : 0 }

function init()
{
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	points = [];
	
	for (var i = 0; i < numPoints; i += 1)
	{
		for (var j = 0; j < numPoints; j += 1)
		{
			var p = {
				x : i * 30 + 100,
				y : j * 30 + 50,
				col : "#d0d0d0",
				right : null,
				down : null,
				vx : 0, vy : 0,
				//vx : Math.random() / 1.0,
				//vy : Math.random() / 1.0,
			};
			points.push(p);
		}
	}
	
	for (var i = 0; i < numPoints; i += 1)
	{
		for (var j = 0; j < numPoints; j += 1)
		{
			var p = points[i*numPoints + j];
			if (i < numPoints-1)
			{
				p.right = points[(i+1)*numPoints + j];
			}
			if (j < numPoints-1)
			{
				p.down = points[i*numPoints + j + 1];
			}
		}
	}
	
	window.requestAnimationFrame(draw);
}
function mousemove(event)
{
	var rect = canvas.getBoundingClientRect();
	mouse.x = event.pageX - rect.left;
	mouse.y = event.pageY - rect.top;
}
function mousedown(event)
{
	var rect = canvas.getBoundingClientRect();
	var mx = event.pageX - rect.left;
	var my = event.pageY - rect.top;
	mouse.x = mx;
	mouse.y = my;
	
	for (var i = 0; i < numPoints; i += 1)
	{
		for (var j = 0; j < numPoints; j += 1)
		{
			var p = points[i*numPoints+j];
			var dx = mx - p.x;
			var dy = my - p.y;
			if (dx*dx + dy*dy < 10*10)
			{
				grabbedPoint = p;
				grabbedPoint.col = "#ff0000";
				return;
			}
		}
	}
}
function mouseup()
{
	if (grabbedPoint)
	{
		grabbedPoint.col = "#d0d0d0";
	}
	grabbedPoint = null;
}
function draw()
{
	context.fillStyle = "#d0d0d0";
	context.fillRect(0,0,canvas.width,canvas.height);
	
	// update velocities
	for (var i = 0; i < numPoints; i += 1)
	{
		for (var j = 0; j < numPoints; j += 1)
		{
			var p = points[i*numPoints + j];
			
			// force from right
			if (p.right)
			{
				var dx = p.right.x - p.x;
				var dy = p.right.y - p.y;
				var d = Math.sqrt(dx*dx + dy*dy);
				var a = Math.atan2(dy, dx);
				var ca = Math.cos(a);
				var sa = Math.sin(a);
				var t = (d - D) / D;
				dx = (t < 0) ? 0 : dx * Math.cos(a) * t;
				dy = (t < 0) ? 0 : dy * Math.sin(a) * t;
				//f = -kx
				var fx = K*t * ca / M;
				var fy = K*t * sa / M;
				p.vx += fx;
				p.vy += fy;
				p.right.vx -= fx;
				p.right.vy -= fy;
			}
			// force from below
			if (p.down)
			{
				var dx = p.down.x - p.x;
				var dy = p.down.y - p.y;
				var d = Math.sqrt(dx*dx + dy*dy);
				var a = Math.atan2(dy, dx);
				var ca = Math.cos(a);
				var sa = Math.sin(a);
				var t = (d - D) / D;
				dx = (t < 0) ? 0 : dx * Math.cos(a) * t;
				dy = (t < 0) ? 0 : dy * Math.sin(a) * t;
				//f = -kx
				var fx = K*t * ca / M;
				var fy = K*t * sa / M;
				p.vx += fx;
				p.vy += fy;
				p.down.vx -= fx;
				p.down.vy -= fy;
			}
			
			// gravity
			p.vy += G * M;
		}
	}	
	
	for (var i = 0; i < numPoints; i += 1)
	{
		for (var j = 0; j < numPoints; j += 1)
		{
			var p = points[i*numPoints + j];

			if (p === grabbedPoint) 
			{
				p.vx = 0;
				p.vy = 0;
				p.x = mouse.x;
				p.y = mouse.y;
				continue;
			}
			
			if (j === 0)
			{
				//p.vx = 0;
				p.vy = 0;
				p.y = 50;
				//continue; // pin the top row
			}
			
			p.vx *= F;
			p.vy *= F;
			
			// update position
			p.x += p.vx;
			p.y += p.vy;
		}
	}


	context.beginPath();
	context.moveTo(100, 50);
	context.lineTo(canvas.width - 100, 50);
	context.stroke();
	
	for (var i = 0; i < numPoints; i += 1)
	{
		for (var j = 0; j < numPoints; j += 1)
		{
			var p = points[i*numPoints + j];
			
			context.beginPath();
			context.arc(p.x, p.y, 5, 0, Math.PI*2);
			//context.fillStyle=p.col;
			//context.fill();
			context.stroke();
			
			if (p.right)
			{
				context.beginPath();
				context.moveTo(p.right.x, p.right.y);
				context.lineTo(p.x, p.y);
				context.stroke();
			}
			if (p.down)
			{
				context.beginPath();
				context.moveTo(p.down.x, p.down.y);
				context.lineTo(p.x, p.y);
				context.stroke();
			}
		}
	}
	
	window.requestAnimationFrame(draw);
}