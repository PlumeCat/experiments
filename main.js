// main.js

document.addEventListener("DOMContentLoaded", function() {
	console.log("main.js");

	var content = [
		"clothsim",
		"network",
		"tree",
	]

	content.forEach(createContent)
})

http://lorempixel.com/output/abstract-q-c-640-480-3.jpg

function createContent(url)
{
	document.getElementById("content-area").innerHTML += 
		'<div class="col-xs-4">\
			<div class="content-outer">\
				<div class="content-inner">\
					<a href="/'+url+'">\
						<img src="thumbs/'+url+'.png"/>\
					</a>\
				</div>\
				<div class="content-footer">\
					<h4>'+url+'</h4>\
				</div>\
			</div>\
		</div>'
}