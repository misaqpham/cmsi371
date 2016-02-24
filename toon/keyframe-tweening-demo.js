/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.

        //taken from MDN canvas tutorial
        heart = function (parameters) {
            var renderingContext = parameters.renderingContext;
            renderingContext.fillStyle = "red";
            renderingContext.beginPath();
            renderingContext.moveTo(75,40);
            renderingContext.bezierCurveTo(75,37,70,25,50,25);
            renderingContext.bezierCurveTo(20,25,20,62.5,20,62.5);
            renderingContext.bezierCurveTo(20,80,40,102,75,120);
            renderingContext.bezierCurveTo(110,102,130,80,130,62.5);
            renderingContext.bezierCurveTo(130,62.5,130,25,100,25);
            renderingContext.bezierCurveTo(85,25,75,37,75,40);
            renderingContext.fill();
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
                        tx: 1100,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        ease: KeyframeTweener.linear,
                        rightElbowAngle: Math.PI/180 * 90,
                        //mood: "mad"
                    },

                    {
                        frame: 50,
                        tx: 1050,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        rightElbowAngle: Math.PI/180 * 40,
                        //rightArmAngle: Math.PI/180 * 70,
                        //mood: "mad"
                    },
                    
                    {
                        frame: 100,
                        tx: 1025,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 150,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: Math.PI/180 * 70,

                    },

                    {
                        frame: 500,
                        tx: 950,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                    }
                ]
            },
//JOJO
            {
                draw: SpriteLibrary.jojo.draw,
                keyframes: [
                    {
                        frame: 0,
                        tx: 1000,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        rightArmAngle: Math.PI/180 * 70,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 50,
                        tx: 950,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        rightArmAngle: Math.PI/180 * 20,
                    },
                    
                    {
                        frame: 100,
                        tx: 900,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                    },

                    {
                        frame: 150,
                        tx: 850,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                    },

                    {
                        frame: 500,
                        tx: 825,
                        ty: 390,
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
                        ease: KeyframeTweener.linear,
                        //headTilt: "left"
                    },

                    {
                        frame: 50,
                        tx: 300,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        //headTilt: "straight"
                    },
                    
                    {
                        frame: 100,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        //headTilt: "right"
                    },

                    {
                        frame: 150,
                        tx: 500,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                    },

                    {
                        frame: 550,
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

            {
                draw: heart,
                keyframes: [
                    {
                        frame: 150,
                        tx: 500,
                        ty: 350,
                        sx: .75, 
                        sy: .75,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 250,
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
