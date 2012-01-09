/**
 * @author loginwashere
 * 
 */
$(document).ready(function() {
	/*
	 * This element contain foto image
	 */
	var foto      = $("#myfoto");
	
	/*
	 * This element contain element, that contain foto image
	 */
	var container = $(".container");

	/*
	 *  Object represents coordinates of upper left corner for parts of image
	 *  Image consists of nine fotos, joined horizontaly
	 *  Latter these comments will be inserted in background-position css property
	 *  
	 */
	var positions = {
		topLeft      : '-200px 0', // coordinates of part of foto with same name
		topCenter    : '-400px 0',
		topRight     : '-600px 0',
		centerLeft   : '-800px 0',
		centerCenter : '0 0',
		centerRight  : '-1200px 0',
		bottomLeft   : '-1400px 0',
		bottomCenter : '-1600px 0',
		bottomRight  : '-1800px 0',
		initial      : '-1000px 0',
		fun          : '-2000px 0'
	};

	/*
	 * Set initial image
	 */
	foto.css('background-position', positions.initial);
	
	/*
	 * Change image, when it was clicked
	 */
	foto.click(function() {
		foto.css('background-position', positions.fun);
	});

	/*
	 * Calculate coordinates of bordrs of given element
	 */
	function findBorders(element) {
		var position = element.offset();
		element.border = new Object();
		element.border.left = position.left;
		element.border.right = element.border.left + element.width();
		element.border.top = position.top;
		element.border.bottom = element.border.top + element.height();
	}

	/*
	 * Register body element for mousemove event
	 */
	$("body").mousemove(function(e) {
		// Calculate coordinates of borders of foto and container elements
		findBorders(foto);
		findBorders(container);
		
		// Check if mouse is inside container
		if (e.pageX > container.border.left 
		 && e.pageX < container.border.right
		 && e.pageY > container.border.top
		 && e.pageY < container.border.bottom) {
			// Check if mouse is in TOP LEFT part of container
			if (e.pageX < foto.border.left 
			 && e.pageY < foto.border.top) {
				foto.css('background-position', positions.topLeft);
			// Check if mouse is in TOP RIGHT part of container
			} else if (e.pageX > foto.border.right 
					&& e.pageY < foto.border.top) {
				foto.css('background-position', positions.topRight);
			// Check if mouse is in TOP CENTER part of container
			} else if (e.pageX < foto.border.right
					&& e.pageX > foto.border.left 
					&& e.pageY < foto.border.top) {
				foto.css('background-position', positions.topCenter);
			// Check if mouse is in CENTER LEFT part of container
			} else if (e.pageX < foto.border.left
					&& e.pageY < foto.border.bottom
					&& e.pageY > foto.border.top) {
				foto.css('background-position', positions.centerLeft);
			// Check if mouse is in CENTER CENTER part of container
			} else if (e.pageX < foto.border.right
					&& e.pageX > foto.border.left
					&& e.pageY < foto.border.bottom
					&& e.pageY > foto.border.top) {
				foto.css('background-position', positions.centerCenter);
			// Check if mouse is in CENTER RIGHT part of container
			} else if (e.pageX > foto.border.right
					&& e.pageY < foto.border.bottom
					&& e.pageY > foto.border.top) {
				foto.css('background-position', positions.centerRight);
			// Check if mouse is in top BOTTOM LEFT of container
			} else if (e.pageX < foto.border.left
					&& e.pageY > foto.border.bottom) {
				foto.css('background-position', positions.bottomLeft);
			// Check if mouse is in BOTTOM CENTER part of container
			} else if (e.pageX < foto.border.right
					&& e.pageX > foto.border.left
					&& e.pageY > foto.border.bottom) {
				foto.css('background-position', positions.bottomCenter);
			// Check if mouse is in BOTTOM RIGHT part of container
			} else if (e.pageX > foto.border.right
					&& e.pageY > foto.border.bottom) {
				foto.css('background-position', positions.bottomRight);
			}
		// If mouse is not inside container then show initial image
		} else {
			foto.css('background-position', positions.initial);
		}
	});
});