/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d");

    var interval = setInterval(function () {
        if (SpriteLibrary.rose.loaded() && SpriteLibrary.jojo.loaded() && SpriteLibrary.olivia.loaded() && SpriteLibrary.bachelorBen.loaded()) {
            renderingContext.save();
            renderingContext.translate(250, 250);
            renderingContext.scale(.5,.5);
            SpriteLibrary.jojo.draw({
              renderingContext: renderingContext,
              leftElbowAngle: 10*Math.PI/180,
              leftArmAngle: 5*Math.PI/180,
              rightArmAngle: -110*Math.PI/180,
              rightElbowAngle: -45*Math.PI/180,
            });
            renderingContext.restore();

            renderingContext.save();
            renderingContext.translate(190,100);
            renderingContext.scale(.75,.75);
            SpriteLibrary.rose.draw({
              renderingContext: renderingContext
            });
            renderingContext.restore();

            renderingContext.save();
            renderingContext.translate(550, 200);
            renderingContext.scale(.55,.55);
            SpriteLibrary.olivia.draw({
              renderingContext: renderingContext,
              mood: "shocked",
              leftElbowAngle: 20*Math.PI/180,
              leftArmAngle: 110*Math.PI / 180,
              rightElbowAngle: 50*Math.PI/180,
              rightArmAngle: 50*Math.PI / 180,
            });
            renderingContext.restore();

            clearInterval(interval);            
        }
    }, 50);

    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext,
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.spriteEscape
                //NanoshopNeighborhood.jagged
                //NanoshopNeighborhood.averager // Convenience comment for easy switching.
            ),
            0, 0
        );
    });
}());
