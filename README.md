Looking photo with jQuery
---------------------------

This jQuery plugin watches for mouse movement.

When mouse moves over green square, it starts change style of inner square (photo)

It creates an illusion, that photo is looking at mouse.

Usage information
-----------------

1.  Create container for photos (it shoult have class .looking-photo-container)
2.  Add elements to this container which will represent photos (in demo this element is <div>). All photo elements are
required to have class .looking-photo-item.
3.  All these elements required to have attribute data-looking_photo_src="path/to/image", that contain path to image.
4.  Also you need propper photo:
    * photo is required to contain 11 square fragments positioned horizontally. Width of fragment is equal to it's height.
    * required order of fragments:
        1.  centerCenter: will be shown on photo hover,
        2.  topLeft: will be shown when mouse is in top left sector of container outside photo,
        3.  topCenter: will be shown when mouse is in top center sector of container outside photo,
        4.  topRight: will be shown when mouse is in top right sector of container outside photo,
        5.  centerLeft: will be shown when mouse is in center left sector of container outside photo,
        6.  initial: will be shown as default photo (at start and when mouse is outside container),
        7.  centerRight: will be shown when mouse is in center right sector of container outside photo,
        8.  bottomLeft: will be shown when mouse is in bottom left sector of container outside photo,
        9.  bottomCenter: will be shown when mouse is in bottom center sector of container outside photo,
        10.  bottomRight: will be shown when mouse is in bottom right sector of container outside photo,
        11.  fun: will be shown after click on photo
5.  If all previous requirements are satisfied - you can use plugin by simply calling $.lookingPhoto(); in document.ready callback.

lookingPhoto is a free jQuery plugin, available under [LGPL License](http://www.gnu.org/copyleft/lgpl.html).