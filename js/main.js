/**
 * @author loginwashere
 * 
 */

/*
 * This element contain foto image
 */
var photo = {
     element: null,
     border: {
         left: null,
         right: null,
         top: null,
         bottom: null
     },
    setBackground: function(value) {
        this.element.css('background-position', value);
    }
 };
/*
 * This element contain element, that contain foto image
 */
var container = {
    element: null,
    border: {
        left: null,
        right: null,
        top: null,
        bottom: null
    }
};
/*
 *  Object represents coordinates of upper left corner for parts of image
 *  Image consists of nine fotos, joined horizontaly
 *  Latter these comments will be inserted in background-position css property
 *
 */
var step = -200;
var positions = {
    topLeft: 1*step + 'px 0', // coordinates of part of foto with same name
    topCenter: 2*step + 'px 0',
    topRight: 3*step + 'px 0',
    centerLeft: 4*step + 'px 0',
    centerCenter: 0*step + ' 0',
    centerRight: 6*step + 'px 0',
    bottomLeft: 7*step + 'px 0',
    bottomCenter: 8*step + 'px 0',
    bottomRight: 9*step + 'px 0',
    initial: 5*step + 'px 0',
    fun: 10*step + 'px 0'
};
var condition = {
    insideContainer: function(x, y, border) {
        return x > border.left
            && x < border.right
            && y > border.top
            && y < border.bottom;
    },
    topLeft: function(x, y, border) {
        return x < border.left
            && y < border.top;
    },
    top: function(x, y, border) {
        return x < border.right
            && x > border.left
            && y < border.top;
    },
    topRight: function(x, y, border) {
        return x > border.right
            && y < border.top;
    },
    centerLeft: function(x, y, border) {
        return x < border.left
            && y < border.bottom
            && y > border.top;
    },
    center: function(x, y, border) {
        return x < border.right
            && x > border.left
            && y < border.bottom
            && y > border.top;
    },
    centerRight: function(x, y, border) {
        return x > border.right
            && y < border.bottom
            && y > border.top;
    },
    bottomLeft: function(x, y, border) {
        return x < border.left
            && y > border.bottom;
    },
    bottom: function(x, y, border) {
        return x < border.right
            && x > border.left
            && y > border.bottom;
    },
    bottomRight: function(x, y, border) {
        return x > border.right
            && y > border.bottom;
    }
};
/*
 * Calculate coordinates of bordes of given element
 */
function findBorders(element) {
    var position = element.element.offset();
    element.border.left = position.left;
    element.border.right = element.border.left + element.element.width();
    element.border.top = position.top;
    element.border.bottom = element.border.top + element.element.height();
}
function changePhoto(x, y, photo) {
    switch (true) {
        case condition.topLeft(x, y, photo.border):
            photo.setBackground(positions.topLeft);
            break;
        case condition.topRight(x, y, photo.border):
            photo.setBackground(positions.topRight);
            break;
        case condition.top(x, y, photo.border):
            photo.setBackground(positions.topCenter);
            break;
        case condition.centerLeft(x, y, photo.border):
            photo.setBackground(positions.centerLeft);
            break;
        case condition.center(x, y, photo.border):
            photo.setBackground(positions.centerCenter);
            break;
        case condition.centerRight(x, y, photo.border):
            photo.setBackground(positions.centerRight);
            break;
        case condition.bottomLeft(x, y, photo.border):
            photo.setBackground(positions.bottomLeft);
            break;
        case condition.bottom(x, y, photo.border):
            photo.setBackground(positions.bottomCenter);
            break;
        case condition.bottomRight(x, y, photo.border):
            photo.setBackground(positions.bottomRight);
            break;
    }
}
$(document).ready(function() {
	container.element = $(".container");
    photo.element = $("#myfoto");
	/*
	 * Set initial image
	 */
    photo.setBackground(positions.initial);
	/*
	 * Change image, when it was clicked
	 */
    photo.element.click(function(event) {
        photo.setBackground(positions.fun);
        event.preventDefault();
	});
	/*
	 * Register body element for mousemove event
	 */
	container.element.mousemove(function(event) {
		// Calculate coordinates of borders of foto and container elements
		findBorders(photo);
		findBorders(container);
        var x = event.pageX,
            y = event.pageY;
		// Check if mouse is inside container
		if (condition.insideContainer(x, y, container.border)) {
            changePhoto(x, y, photo);
		}
	});
    container.element.mouseleave(function(event){
        // If mouse is not inside container then show initial image
        photo.setBackground(positions.initial);
    });
});