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

        title = function(parameters) {
            var renderingContext = parameters.renderingContext;
            renderingContext.font = "48px zapfino";
            renderingContext.fillStyle = "white";
            renderingContext.fillText("Tonight on the Bachelor: the \"most dramatic\" final rose ceremony...", 10, 50);
        }

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
                {
        //title
                        draw: title,
                        keyframes: [
                            {
                                frame: 0,
                                tx: 100,
                                ty: 50,
                                sx: .5, 
                                sy: .5,
                                ease: KeyframeTweener.linear,
                            },

                            {
                                frame: 75,
                                tx: 75,
                                ty: 50,
                                sx: .5, 
                                sy: .5,
                            }
                        ]
                },

                {
    //olivia
                draw: SpriteLibrary.olivia.draw,
                keyframes: [
                    {
                        frame: 80,
                        tx: 1100,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        ease: KeyframeTweener.linear,
                        leftElbowAngle: -10*Math.PI/180,
                        rightElbowAngle: 10*Math.PI/180,
                    },

                    {
                        frame: 150,
                        tx: 1050,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        leftElbowAngle: -15*Math.PI/180,
                        rightElbowAngle: 15*Math.PI/180,
                    },
                    
                    {
                        frame: 200,
                        tx: 1025,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        leftElbowAngle: -25*Math.PI/180,
                        rightElbowAngle: 25*Math.PI/180,
                    },

                    {
                        frame: 250,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        leftElbowAngle: -25*Math.PI/180,
                        rightElbowAngle: 45*Math.PI/180,
                    },

                    {
                        frame: 450,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        leftElbowAngle: -25*Math.PI/180,
                        rightElbowAngle: 45*Math.PI/180,
                    },

                    // {
                    //     frame: 500,
                    //     tx: 1000,
                    //     ty: 345,
                    //     sx: .5, 
                    //     sy: .5,
                    //     leftElbowAngle: -25*Math.PI/180,
                    //     rightElbowAngle: 45*Math.PI/180,
                    // },

                    // {
                    //     frame: 550,
                    //     tx: 1000,
                    //     ty: 345,
                    //     sx: .5, 
                    //     sy: .5,
                    //     leftElbowAngle: -35*Math.PI/180,
                    //     leftArmAngle: 55*Math.PI / 180,
                    // },

                    //arms to heart
                    {
                        frame: 525,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 140*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -140*Math.PI/180,
                    },

                    //arms to sky
                    {
                        frame: 550,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 575,
                        tx: 1000,
                        ty: 300,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -30*Math.PI / 180,
                        leftElbowAngle: 30*Math.PI / 180,
                    },

                    {
                        frame: 600,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 625,
                        tx: 1000,
                        ty: 300,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -30*Math.PI / 180,
                        leftElbowAngle: 30*Math.PI / 180,
                    },

                    {
                        frame: 650,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 675,
                        tx: 1000,
                        ty: 300,
                        sx: .5, 
                        sy: .5,
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -30*Math.PI / 180,
                        leftElbowAngle: 30*Math.PI / 180,
                    },

                    {
                        frame: 700,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 140*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -140*Math.PI/180,
                    },

                    {
                        frame: 725,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 140*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -10*Math.PI/180,
                    },

                    {
                        frame: 800,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 140*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -10*Math.PI/180,
                    },

                ]
            },
//JOJO
            {
                draw: SpriteLibrary.jojo.draw,
                keyframes: [
                    {
                        frame: 80,
                        tx: 950,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        ease: KeyframeTweener.linear,
                        leftElbowAngle: -10*Math.PI/180,
                        rightElbowAngle: 10*Math.PI/180,
                    },

                    {
                        frame: 150,
                        tx: 925,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: -15*Math.PI/180,
                        rightElbowAngle: 15*Math.PI/180,
                    },


                    {
                        frame: 200,
                        tx: 900,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: -25*Math.PI/180,
                        rightElbowAngle: 25*Math.PI/180,
                    },
                    
                    {
                        frame: 250,
                        tx: 875,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftArmAngle: 10*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180,
                        leftElbowAngle: -35*Math.PI/180,
                        rightElbowAngle: 35*Math.PI/180,
                    },

                    {
                        frame: 300,
                        tx: 850,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftArmAngle: 5*Math.PI/180,
                        rightArmAngle: -5*Math.PI/180,
                        leftElbowAngle: -45*Math.PI/180,
                        rightElbowAngle: 45*Math.PI/180,
                    },

                    {
                        frame: 400,
                        tx: 850,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftArmAngle: 10*Math.PI/180,
                        rightArmAngle: -5*Math.PI/180,
                        leftElbowAngle: -55*Math.PI/180,
                        rightElbowAngle: 55*Math.PI/180,
                    },

                    {
                        frame: 775,
                        tx: 850,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftArmAngle: 5*Math.PI/180,
                        rightArmAngle: -5*Math.PI/180,
                        leftElbowAngle: -55*Math.PI/180,
                        rightElbowAngle: 55*Math.PI/180,
                    }
                ]
            },
//BEN
            {
                draw: SpriteLibrary.bachelorBen.draw,
                keyframes: [
                    {
                        frame: 250,
                        tx: 175,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        ease: KeyframeTweener.quadEaseIn,
                    },

                    {
                        frame: 300,
                        tx: 325,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        headTilt: 2,
            
                    },
                    
                    {
                        frame: 350,
                        tx: 375,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                       
                    },

                    {
                        frame: 400,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                    },

                    {
                        frame: 725,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightElbowAngle: 55*Math.PI/180,
                    },

                    {
                        frame: 800,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                    },
                ]
            },
//ROSE
            {
                draw: SpriteLibrary.rose.draw,
                keyframes: [
                    {
                        frame: 440,
                        tx: 525,
                        ty: 350,
                        sx: .75, 
                        sy: .75,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 450,
                        tx: 525,
                        ty: 300,
                        sx: .75, 
                        sy: .75,
                    },
                    
                    {
                        frame: 500,
                        tx: 525,
                        ty: 250,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 550,
                        tx: 425,
                        ty: 350,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 775,
                        tx: 425,
                        ty: 350,
                        sx: .5, 
                        sy: .5,
                    },
                ]
            },
//dialogue
            {
                draw: SpriteLibrary.dialogue.draw,
                keyframes: [ 
                //Ben talking

                    {
                        frame: 400,
                        tx: 400,
                        ty: 100,
                        ease: KeyframeTweener.linear,
                        text: "Ladies...",
                        bubbleSize: "small"

                        //textPosition: 400
                    },

                    {
                        frame: 425,
                        tx: 400,
                        ty: 100,
                        text: "this has been a difficult decision",
                        bubbleSize: "large",
                        //textPosition: 410
                    },

                    {
                        frame: 450,
                        tx: 400,
                        ty: 100,
                        text: "as there is only ONE rose tonight",
                        bubbleSize: "large",

                    },

                    {
                        frame: 475,
                        tx: 400,
                        ty: 100,
                        text: "* pauses for dramatic effect *",
                        bubbleSize: "large",

                    },

                    {
                        frame: 525,
                        tx: 400,
                        ty: 100,
                        text: "Olivia...",
                        bubbleSize: "small"
                    },

                    {
                        frame: 550,
                        tx: 400,
                        ty: 100,
                        text: "Olivia...",
                        bubbleSize: "small"

                    },
                ]
            },

            {
                draw: SpriteLibrary.dialogue.draw,
                keyframes: [ 
                
                    {
                        frame: 690,
                        tx: 400,
                        ty: 100,
                        text: "I'm sorry...",
                        bubbleSize: "medium"
                    },

                    {
                        frame: 700,
                        tx: 400,
                        ty: 100,
                        text: "but I can't give you this rose",
                        bubbleSize: "large"
                    },

                    {
                        frame: 700,
                        tx: 400,
                        ty: 100,
                        text: "My heart just isn't there",
                        bubbleSize: "large"
                    },

                    {
                        frame: 725,
                        tx: 400,
                        ty: 100,
                        text: "Jojo...",
                        bubbleSize: "small"
                    },

                    {
                        frame: 775,
                        tx: 400,
                        ty: 100,
                        text: "Jojo, will you accept this rose?",
                        bubbleSize: "small"
                    },

                ]
            },
//Olivia dialogue
            {
                draw: SpriteLibrary.dialogue.draw,
                keyframes: [ 
                
                    {
                        frame: 560,
                        tx: 900,
                        ty: 100,
                        text: "Yessss! Yes I accept this rose!!",
                        speakerPosition: "right",
                        bubbleSize: "large"
                    },

                    {
                        frame: 650,
                        tx: 900,
                        ty: 100,
                        text: "Yessss! Yes I accept this rose!!",
                        speakerPosition: "right",
                        bubbleSize: "large"

                    },
                ]
            },
//Jojo dialogue
            {
                draw: SpriteLibrary.dialogue.draw,
                keyframes: [ 
                
                    {
                        frame: 750,
                        tx: 825,
                        ty: 100,
                        text: "Yes?",
                        bubbleSize: "small",
                        speakerPosition: "right"
                    },


                    {
                        frame: 775,
                        tx: 825,
                        ty: 100,
                        text: "Of course I will!",
                        speakerPosition: "right"
                    },
                ]
            },

//heart
            // {
            //     draw: heart,
            //     keyframes: [
            //         {
            //             frame: 150,
            //             tx: 500,
            //             ty: 350,
            //             sx: .75, 
            //             sy: .75,
            //             ease: KeyframeTweener.quadEaseInAndOut
            //         },

            //         {
            //             frame: 250,
            //             tx: 500,
            //             ty: 200,
            //             sx: .5, 
            //             sy: .5,
            //         }
            //     ]
            // },
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
