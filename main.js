// main.js

document.addEventListener("DOMContentLoaded", function() {
	console.log("main.js");

	for (var i = 0; i < 10; i++) {
		createContent("http://lorempixel.com/640/480/nature/" + (i+1));
		createContent("http://lorempixel.com/640/480/abstract/" + (i+1));		
	}
})

http://lorempixel.com/output/abstract-q-c-640-480-3.jpg

function createContent(url)
{
	document.getElementById("content-area").innerHTML += 
		'<div class="col-xs-3">\
			<div class="content-outer">\
				<div class="content-inner">\
					<img src='+url+'/>\
				</div>\
				<div class="content-footer">\
					<h4>placeholder</h4>\
				</div>\
			</div>\
		</div>'
}