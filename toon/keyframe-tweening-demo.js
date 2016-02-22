/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = function (parameters) {
            var renderingContext = parameters.renderingContext;
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },

        circle = function (parameters) {
            var renderingContext = parameters.renderingContext;
            renderingContext.strokeStyle = "red";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
//OLIVIA
                draw: SpriteLibrary.olivia.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 900,
                        ty: 355,
                        sx: .45, 
                        sy: .45,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 40,
                        tx: 875,
                        ty: 355,
                        sx: .45, 
                        sy: .45,
                    },
                    
                    {
                        frame: 60,
                        tx: 850,
                        ty: 355,
                        sx: .45, 
                        sy: .45,
                    },

                    {
                        frame: 80,
                        tx: 825,
                        ty: 355,
                        sx: .45, 
                        sy: .45,
                    }
                ]
            },
//JOJO
            {
                draw: SpriteLibrary.jojo.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 800,
                        ty: 400,
                        sx: .45, 
                        sy: .45,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 50,
                        tx: 775,
                        ty: 400,
                        sx: .45, 
                        sy: .45,
                    },
                    
                    {
                        frame: 100,
                        tx: 750,
                        ty: 400,
                        sx: .45, 
                        sy: .45,
                    },

                    {
                        frame: 150,
                        tx: 725,
                        ty: 400,
                        sx: .45, 
                        sy: .45,
                    }
                ]
            },
//BEN
            {
                draw: SpriteLibrary.bachelorBen.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 200,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 50,
                        tx: 300,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                    },
                    
                    {
                        frame: 100,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                    },

                    {
                        frame: 150,
                        tx: 500,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                    }
                ]
            },
//ROSE
            {
                draw: SpriteLibrary.rose.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 500,
                        ty: 350,
                        sx: .75, 
                        sy: .75,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 50,
                        tx: 500,
                        ty: 300,
                        sx: .5, 
                        sy: .5,
                    },
                    
                    {
                        frame: 100,
                        tx: 500,
                        ty: 250,
                        sx: .75, 
                        sy: .75,
                    },

                    {
                        frame: 150,
                        tx: 500,
                        ty: 200,
                        sx: .5, 
                        sy: .5,
                    }
                ]
            },
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());
