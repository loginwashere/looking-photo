/**
 * @author Dmitriy Savchenko <login.was.here@gmail.com>
 *
 */
(function ($) {
    var Item = {
        element: null,
        border: {
            left: null,
            right: null,
            top: null,
            bottom: null
        },
        findBorders: function () {
            this.border = this.element.offset();
            this.border.right = this.border.left + this.element.width();
            this.border.bottom = this.border.top + this.element.height();
        }
    };
    var containers = {
        elements: []
    };
    $.fn.lookingPhoto = function () {
        $.each($('.looking-photo-container'), function(containerIndex, containerItem){
            var container = new Container();
            container.element = $(containerItem);
            container.element.bind('mousemove.looking-photo', {'containerIndex': containerIndex}, container.mousemove);
            container.element.bind('mouseleave.looking-photo', {'containerIndex': containerIndex}, container.mouseleave);
            $.each(container.element.find('.looking-photo-item'), function(photoIndex, photoItem){
                var photo = new Photo();
                photo.element = $(photoItem);
                var imagePath = photo.element.data('looking_photo_src');
                var image = new Image();
                image.src = imagePath;
                image.onload = function() {
                    photo.element.css('width', this.height);
                    photo.element.css('height', this.height);
                    photo.positions.init(this.height);
                    photo.setBackgroundImage(imagePath);
                    photo.setBackgroundPosition(photo.positions.list.initial);
                }
                photo.element.bind('click.looking-photo', {'photoIndex': photoIndex, 'containerIndex': containerIndex}, photo.click);
                container.photos.elements[photoIndex] = photo;
            });
            containers.elements[containerIndex] = container;
        });
    };
    function Photo() {
        return $.extend({}, Item, {
            change: function (mouse) {
                switch (true) {
                    case this.condition.topLeft(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.topLeft);
                        break;
                    case this.condition.topRight(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.topRight);
                        break;
                    case this.condition.top(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.topCenter);
                        break;
                    case this.condition.centerLeft(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.centerLeft);
                        break;
                    case this.condition.center(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.centerCenter);
                        break;
                    case this.condition.centerRight(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.centerRight);
                        break;
                    case this.condition.bottomLeft(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.bottomLeft);
                        break;
                    case this.condition.bottom(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.bottomCenter);
                        break;
                    case this.condition.bottomRight(mouse, this.border):
                        this.setBackgroundPosition(this.positions.list.bottomRight);
                        break;
                }
            },
            setBackgroundPosition: function (value) {
                this.element.css('backgroundPosition', value);
            },
            setBackgroundImage: function (value) {
                this.element.css('backgroundImage', 'url(' + value + ')');
            },
            positions: {
                step: -200,
                list: {},
                init: function(step) {
                    var step = step ? -1 * step : this.step;
                    this.list = {
                        topLeft: 1 * step + 'px 0',
                        topCenter: 2 * step + 'px 0',
                        topRight: 3 * step + 'px 0',
                        centerLeft: 4 * step + 'px 0',
                        centerCenter: 0 * step + ' 0',
                        centerRight: 6 * step + 'px 0',
                        bottomLeft: 7 * step + 'px 0',
                        bottomCenter: 8 * step + 'px 0',
                        bottomRight: 9 * step + 'px 0',
                        initial: 5 * step + 'px 0',
                        fun: 10 * step + 'px 0'
                    };
                }
            },
            condition: {
                topLeft: function (mouse, border) {
                    return mouse.x < border.left
                        && mouse.y < border.top;
                },
                top: function (mouse, border) {
                    return mouse.x < border.right
                        && mouse.x > border.left
                        && mouse.y < border.top;
                },
                topRight: function (mouse, border) {
                    return mouse.x > border.right
                        && mouse.y < border.top;
                },
                centerLeft: function (mouse, border) {
                    return mouse.x < border.left
                        && mouse.y < border.bottom
                        && mouse.y > border.top;
                },
                center: function (mouse, border) {
                    return mouse.x < border.right
                        && mouse.x > border.left
                        && mouse.y < border.bottom
                        && mouse.y > border.top;
                },
                centerRight: function (mouse, border) {
                    return mouse.x > border.right
                        && mouse.y < border.bottom
                        && mouse.y > border.top;
                },
                bottomLeft: function (mouse, border) {
                    return mouse.x < border.left
                        && mouse.y > border.bottom;
                },
                bottom: function (mouse, border) {
                    return mouse.x < border.right
                        && mouse.x > border.left
                        && mouse.y > border.bottom;
                },
                bottomRight: function (mouse, border) {
                    return mouse.x > border.right
                        && mouse.y > border.bottom;
                }
            },
            click: function (event) {
                var containerIndex = event.data.containerIndex;
                var container = containers.elements[containerIndex];
                var photoIndex = event.data.photoIndex;
                var photo = container.photos.elements[photoIndex];
                if (!photo.element.hasClass('looking-photo-fun')) {
                    photo.element.addClass('looking-photo-fun');
                }
                photo.setBackgroundPosition(photo.positions.list.fun);
                event.preventDefault();
            }
        });
    }
    function Container() {
        return $.extend({}, Item, {
            photos: {
                elements: []
            },
            condition: {
                insideContainer: function (mouse, border) {
                    return mouse.x > border.left
                        && mouse.x < border.right
                        && mouse.y > border.top
                        && mouse.y < border.bottom;
                }
            },
            mousemove: function (event) {
                var containerIndex = event.data.containerIndex;
                var container = containers.elements[containerIndex];
                $.each(container.photos.elements, function(photoIndex, photoItem){
                    if (!photoItem.element.hasClass('looking-photo-fun')) {
                        photoItem.findBorders();
                        container.findBorders();
                        var mouse = {
                            x: event.pageX,
                            y: event.pageY
                        };
                        if (container.condition.insideContainer(mouse, container.border)) {
                            photoItem.change(mouse);
                        }
                    } else {
                        photoItem.element.removeClass('looking-photo-fun');
                    }
                });
            },
            mouseleave: function (event) {
                var containerIndex = event.data.containerIndex;
                var container = containers.elements[containerIndex];
                $.each(container.photos.elements, function(containerIndex, containerItem){
                    containerItem.setBackgroundPosition(containerItem.positions.list.initial);
                });
            }
        });
    }
})(jQuery);