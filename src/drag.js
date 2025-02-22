import panzoom from "panzoom"

export var imageElement = document.getElementById("dragImage");
var imageWidth, imageHeight;

const imageClamp = document.getElementById("imageClamp");
var contWidth, contHeight;


var instance = panzoom(imageElement, {
    filterKey: function () {
        return true;
    },
    smoothScroll: false,
    initialZoom: 0.4,
    maxZoom: 4,
    minZoom: 0.2
})

new ResizeObserver(() => {
    !imageClamp.classList.contains('hidden') ? applyBounds() : {}
}).observe(imageClamp)

instance.on('panend', applyBounds);
instance.on('zoom', applyBounds);

function applyBounds() {
    imageWidth = imageElement.naturalWidth;
    imageHeight = imageElement.naturalHeight;
    contWidth = imageClamp.offsetWidth;
    contHeight = imageClamp.offsetHeight;

    const transform = instance.getTransform();

    boundsZoom(transform);
    boundsPan(transform);
}

function boundsPan(transform) {
    var x, y;
    // Check bounds
    if (transform.x > 0) {
        x = 0
    } else if (-transform.x + contWidth > imageWidth * transform.scale) {
        x = -imageWidth * transform.scale + contWidth
    } else {
        x = transform.x
    }

    if (transform.y > 0) {
        y = 0
    } else if (-transform.y + contHeight > imageHeight * transform.scale) {
        y = -imageHeight * transform.scale + contHeight
    } else {
        y = transform.y
    }

    instance.smoothMoveTo(x, y);
}

function boundsZoom(transform) {
    if ((imageWidth * transform.scale < contWidth) || (imageHeight * transform.scale < contHeight)) {
        let zoomVal = Math.min((imageWidth * transform.scale) / contWidth, (imageHeight * transform.scale) / contHeight)
        
        instance.zoomTo(contWidth / 2, contHeight / 2, (1 / zoomVal) + 0.01);
    }
}
