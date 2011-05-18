/**
 * 
 */
$(document).ready(function() {
	/**
	 * My foto block
	 */
	var foto = $("#myfoto");
	var container = $(".container");

	var positions = {
		topLeft : '-200px 0',
		topCenter : '-400px 0',
		topRight : '-600px 0',
		centerLeft : '-800px 0',
		centerCenter : '0 0',
		centerRight : '-1200px 0',
		bottomLeft : '-1400px 0',
		bottomCenter : '-1600px 0',
		bottomRight : '-1800px 0',
		initial : '-1000px 0',
		fun : '-2000px 0'
	};

	foto.click(function() {
				foto.css('background-position', positions.fun);
			});

	function findBorders(element) {
		var position = element.offset();
		element.border = new Object();
		element.border.left = position.left;
		element.border.right = element.border.left + element.width();
		element.border.top = position.top;
		element.border.bottom = element.border.top + element.height();
	}

	foto.css('background-position', positions.initial);

	$("body").mousemove(function(e) {
		findBorders(foto);
		findBorders(container);
		if (e.pageX > container.border.left && e.pageX < container.border.right
				&& e.pageY > container.border.top
				&& e.pageY < container.border.bottom) {
			if (e.pageX < foto.border.left && e.pageY < foto.border.top) {
				foto.css('background-position', positions.topLeft);
			} else if (e.pageX > foto.border.right && e.pageY < foto.border.top) {
				foto.css('background-position', positions.topRight);
			} else if (e.pageX < foto.border.right
					&& e.pageX > foto.border.left && e.pageY < foto.border.top) {
				foto.css('background-position', positions.topCenter);
			} else if (e.pageX < foto.border.left
					&& e.pageY < foto.border.bottom
					&& e.pageY > foto.border.top) {
				foto.css('background-position', positions.centerLeft);
			} else if (e.pageX < foto.border.right
					&& e.pageX > foto.border.left
					&& e.pageY < foto.border.bottom
					&& e.pageY > foto.border.top) {
				foto.css('background-position', positions.centerCenter);
			} else if (e.pageX > foto.border.right
					&& e.pageY < foto.border.bottom
					&& e.pageY > foto.border.top) {
				foto.css('background-position', positions.centerRight);
			} else if (e.pageX < foto.border.left
					&& e.pageY > foto.border.bottom) {
				foto.css('background-position', positions.bottomLeft);
			} else if (e.pageX < foto.border.right
					&& e.pageX > foto.border.left
					&& e.pageY > foto.border.bottom) {
				foto.css('background-position', positions.bottomCenter);
			} else if (e.pageX > foto.border.right
					&& e.pageY > foto.border.bottom) {
				foto.css('background-position', positions.bottomRight);
			}
		} else {
			foto.css('background-position', positions.initial);
		}
	});
});