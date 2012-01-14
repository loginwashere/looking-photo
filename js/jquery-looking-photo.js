/**
 * @author Dmitriy Savchenko <login.was.here@gmail.com>
 *
 */
(function ($) {
    var Item = (function () {
        return {
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
    })();
    var photo = Object.create(Item, {
        change: {
            value: function (mouse) {
                switch (true) {
                    case this.condition.topLeft(mouse, this.border):
                        this.setBackground(this.positions.topLeft);
                        break;
                    case this.condition.topRight(mouse, this.border):
                        this.setBackground(this.positions.topRight);
                        break;
                    case this.condition.top(mouse, this.border):
                        this.setBackground(this.positions.topCenter);
                        break;
                    case this.condition.centerLeft(mouse, this.border):
                        this.setBackground(this.positions.centerLeft);
                        break;
                    case this.condition.center(mouse, this.border):
                        this.setBackground(this.positions.centerCenter);
                        break;
                    case this.condition.centerRight(mouse, this.border):
                        this.setBackground(this.positions.centerRight);
                        break;
                    case this.condition.bottomLeft(mouse, this.border):
                        this.setBackground(this.positions.bottomLeft);
                        break;
                    case this.condition.bottom(mouse, this.border):
                        this.setBackground(this.positions.bottomCenter);
                        break;
                    case this.condition.bottomRight(mouse, this.border):
                        this.setBackground(this.positions.bottomRight);
                        break;
                }
            }
        },
        setBackground: {
            value: function (value) {
                this.element.css('backgroundPosition', value);
            }
        },
        positions: {
            value: (function () {
                var step = -200;
                return {
                    topLeft: 1 * step + 'px 0', // coordinates of part of foto with same name
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
            })()
        },
        condition: {
            value: {
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
            }
        },
        click: {
            value: function (event) {
                if (!photo.element.hasClass('fun')) {
                    photo.element.addClass('fun');
                }
                photo.setBackground(photo.positions.fun);
                event.preventDefault();
            }
        }
    });
    var container = Object.create(Item, {
        condition: {
            value: {
                insideContainer: function (mouse, border) {
                    return mouse.x > border.left
                        && mouse.x < border.right
                        && mouse.y > border.top
                        && mouse.y < border.bottom;
                }
            }
        },
        mousemove: {
            value: function (event) {
                if (!photo.element.hasClass('fun')) {
                    photo.findBorders();
                    container.findBorders();
                    var mouse = {
                        x: event.pageX,
                        y: event.pageY
                    };
                    if (container.condition.insideContainer(mouse, container.border)) {
                        photo.change(mouse);
                    }
                } else {
                    photo.element.removeClass('fun');
                }
            }
        },
        mouseleave: {
            value: function () {
                photo.setBackground(photo.positions.initial);
            }
        }
    });
    $.fn.lookingPhoto = function () {
        container.element = this;
        photo.element = container.element.find("#myfoto");
        photo.setBackground(photo.positions.initial);
        photo.element.bind('click', photo.click);
        container.element.bind('mousemove', container.mousemove);
        container.element.bind('mouseleave', container.mouseleave);
    };
})(jQuery);