/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0];
    var renderingContext = canvas.getContext("2d");

    var interval = setInterval(function () {
        if (SpriteLibrary.rose.loaded()) {
            renderingContext.save();
            renderingContext.translate(200,200);
            renderingContext.scale(.75,.75);
            SpriteLibrary.rose.draw({
                renderingContext: renderingContext
            });
            renderingContext.restore();

            clearInterval(interval);            
        }
    }, 50);

    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.darkener
            ),
            0, 0
        );
    });
}());
