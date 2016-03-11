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

                    {
                        frame: 550,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        leftElbowAngle: -25*Math.PI/180,
                        rightElbowAngle: 45*Math.PI/180,
                    },

                    //arms to heart
                    {
                        frame: 630,
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
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 725,
                        tx: 1000,
                        ty: 300,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -30*Math.PI / 180,
                        leftElbowAngle: 30*Math.PI / 180,
                    },

                    {
                        frame: 750,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 775,
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
                        frame: 820,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "mad",
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 140*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -10*Math.PI/180,
                    },

                    {
                        frame: 1000,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "mad",
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 10*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -10*Math.PI/180,
                    },

                    //cosses arm
                    {
                        frame: 1040,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "mad",
                        rightArmAngle: -5*Math.PI/180,
                        rightElbowAngle: 110*Math.PI/180,
                        leftArmAngle: 10*Math.PI/180,
                        leftElbowAngle: -110*Math.PI/180,
                    },

                    //throws fit 
                    {
                        frame: 1060,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -5*Math.PI/180,
                        rightElbowAngle: 110*Math.PI/180,
                        leftArmAngle: 10*Math.PI/180,
                        leftElbowAngle: -110*Math.PI/180,
                    },

                    {
                        frame: 1080,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 1100,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -60*Math.PI / 180,
                        leftElbowAngle: 60*Math.PI / 180,
                    },

                    {
                        frame: 1120,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 1130,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -60*Math.PI / 180,
                        leftElbowAngle: 60*Math.PI / 180,
                    },

                     {
                        frame: 1140,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 1150,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -60*Math.PI / 180,
                        leftElbowAngle: 60*Math.PI / 180,
                    },
                    

                    {
                        frame: 1160,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 1170,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -60*Math.PI / 180,
                        leftElbowAngle: 60*Math.PI / 180,
                    },
                    

                    {
                        frame: 1180,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },

                    {
                        frame: 1190,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -60*Math.PI / 180,
                        leftElbowAngle: 60*Math.PI / 180,
                    },
                    

                    {
                        frame: 1200,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
                    },
              
                   //enlarged mad olivia
                    {
                        frame: 1220,
                        tx: 1000,
                        ty: 345,
                        sx: .5, 
                        sy: .5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -50*Math.PI / 180,
                        leftElbowAngle: 50*Math.PI / 180,
                    },

                    {
                        frame: 1450,
                        tx: 1000,
                        ty: 500,
                        sx: 1.5, 
                        sy: 1.5,
                        mood: "shocked",
                        rightArmAngle: -140*Math.PI / 180,
                        leftArmAngle: 140*Math.PI / 180,
                        rightElbowAngle: -40*Math.PI / 180,
                        leftElbowAngle: 40*Math.PI / 180,
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
                        frame: 850,
                        tx: 850,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftArmAngle: 5*Math.PI/180,
                        rightArmAngle: -5*Math.PI/180,
                        leftElbowAngle: -55*Math.PI/180,
                        rightElbowAngle: 55*Math.PI/180,
                    },

                    //walk to ben
                    {
                        frame: 870,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 140*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -140*Math.PI/180,
                    },

                    {
                        frame: 890,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: 140*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180,
                        leftElbowAngle: -140*Math.PI/180,
                    },

                    //grab rose

                    {
                        frame: 900,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 45*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                    },

                    //lower arm to take rose

                    {
                        frame: 920,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 25*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180
                    },

                    {
                        frame: 1090,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 25*Math.PI/180,
                        leftArmAngle: 15*Math.PI/180
                    },
                    //throw up rose & catch with right arm
                    {
                        frame: 1100,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 35*Math.PI/180,
                        leftArmAngle: 45*Math.PI/180,
                        rightElbowAngle: -25*Math.PI/180,
                        rightArmAngle: -5*Math.PI/180
                    },

                    {
                        frame: 1130,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 25*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -35*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180,                    
                    },

                    {
                        frame: 1140,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 25*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                    {
                        frame: 1170,
                        tx: 640,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 25*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                    //reach for bens hand
                    {
                        frame: 1180,
                        tx: 630,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 10*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                    //celebrate
                    {
                        frame: 1200,
                        tx: 630,
                        ty: 320,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 10*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                    {
                        frame: 1220,
                        tx: 630,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 10*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                    {
                        frame: 1240,
                        tx: 630,
                        ty: 320,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 10*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                    {
                        frame: 1260,
                        tx: 630,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 10*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                    {
                        frame: 1500,
                        tx: 630,
                        ty: 390,
                        sx: .45, 
                        sy: .45,
                        leftElbowAngle: 10*Math.PI/180,
                        leftArmAngle: 25*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                        rightArmAngle: -10*Math.PI/180
                    },

                   
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
                    },
                    //ben grabs rose
                    {
                        frame: 770,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightArmAngle: -20*Math.PI/180,
                        rightElbowAngle: -10*Math.PI/180
                    },

                    {
                        frame: 800,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightArmAngle: -20*Math.PI/180,
                        rightElbowAngle: -20*Math.PI/180,
                    },

                    {
                        frame: 820,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightArmAngle: -20*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                    },

                    {
                        frame: 900,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightArmAngle: -20*Math.PI/180,
                        rightElbowAngle: -45*Math.PI/180,
                    },
                    //releases rose

                    {
                        frame: 920,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: -5*Math.PI/180,
                    },

                    {
                        frame: 1170,
                        tx: 400,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightArmAngle: -15*Math.PI/180,
                        rightElbowAngle: -5*Math.PI/180,
                    },
                    //reach for jojos hand
                    {
                        frame: 1180,
                        tx: 420,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightElbowAngle: -20*Math.PI/180,
                        rightArmAngle: -20*Math.PI/180
                    },
                    //jump up and down to celebrate
                    {
                        frame: 1200,
                        tx: 420,
                        ty: 250,
                        sx: .65, 
                        sy: .65,
                        rightElbowAngle: -20*Math.PI/180,
                        rightArmAngle: -20*Math.PI/180
                    },

                    {
                        frame: 1220,
                        tx: 420,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightElbowAngle: -20*Math.PI/180,
                        rightArmAngle: -20*Math.PI/180
                    },

                    {
                        frame: 1240,
                        tx: 420,
                        ty: 250,
                        sx: .65, 
                        sy: .65,
                        rightElbowAngle: -20*Math.PI/180,
                        rightArmAngle: -20*Math.PI/180
                    },

                    {
                        frame: 1260,
                        tx: 420,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightElbowAngle: -20*Math.PI/180,
                        rightArmAngle: -20*Math.PI/180
                    },
                    
                    //raise hands & jump
                    // {
                    //     frame: 1220,
                    //     tx: 400,
                    //     ty: 325,
                    //     sx: .65, 
                    //     sy: .65,
                    //     rightArmAngle: -100* Math.PI/180,
                    //     rightElbowAngle: -35*Math.PI/180,
                    // },
                    
                    //keep ben on page
                    {
                        frame: 1500,
                        tx: 420,
                        ty: 325,
                        sx: .65, 
                        sy: .65,
                        rightArmAngle: -20* Math.PI/180,
                        rightElbowAngle: -20*Math.PI/180,
                    },
                ]
            },
//ROSE
            {
                draw: SpriteLibrary.rose.draw,
                keyframes: [
                    {
                        frame: 520,
                        tx: 490,
                        ty: 320,
                        sx: 1, 
                        sy: 1,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 540,
                        tx: 490,
                        ty: 300,
                        sx: 1, 
                        sy: 1,
                    },
                    
                    {
                        frame: 580,
                        tx: 490,
                        ty: 250,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 600,
                        tx: 425,
                        ty: 350,
                        sx: .5, 
                        sy: .5,
                    },
                    //move rose with jojo's arm down
                    {
                        frame: 900,
                        tx: 425,
                        ty: 350,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 920,
                        tx: 450,
                        ty: 370,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1000,
                        tx: 450,
                        ty: 370,
                        sx: .5, 
                        sy: .5,
                    },
                    //move rose up with jojo's arm
                    {
                        frame: 1090,
                        tx: 450,
                        ty: 370,
                        sx: .5, 
                        sy: .5,
                    },
                    
                    {
                        frame: 1110,
                        tx: 485,
                        ty: 100,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1120,
                        tx: 515,
                        ty: 50,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1130,
                        tx: 535,
                        ty: 100,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1140,
                        tx: 595,
                        ty: 360,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1150,
                        tx: 595,
                        ty: 360,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1170,
                        tx: 595,
                        ty: 360,
                        sx: .5, 
                        sy: .5,
                    },

                    
                    //move rose with jumping
                    {
                        frame: 1180,
                        tx: 590,
                        ty: 360,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1200,
                        tx: 585,
                        ty: 290,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1220,
                        tx: 585,
                        ty: 360,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1240,
                        tx: 585,
                        ty: 290,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1260,
                        tx: 585,
                        ty: 360,
                        sx: .5, 
                        sy: .5,
                    },

                    // {
                    //     frame: 1280,
                    //     tx: 580,
                    //     ty: 290,
                    //     sx: .5, 
                    //     sy: .5,
                    // },

                    {
                        frame: 1300,
                        tx: 585,
                        ty: 360,
                        sx: .5, 
                        sy: .5,
                    },

                    {
                        frame: 1500,
                        tx: 585,
                        ty: 360,
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
                    },

                    {
                        frame: 450,
                        tx: 400,
                        ty: 100,
                        text: "this has been an amazing journey",
                        bubbleSize: "large",
                    },

                    {
                        frame: 490,
                        tx: 400,
                        ty: 100,
                        text: "but as you both know",
                        bubbleSize: "medium",
                    },

                    {
                        frame: 520,
                        tx: 400,
                        ty: 100,
                        text: "there is only ONE rose tonight",
                        bubbleSize: "large",
                    },

                    {
                        frame: 560,
                        tx: 400,
                        ty: 100,
                        text: "* pauses for dramatic effect *",
                        bubbleSize: "large",
                    },

                    {
                        frame: 610,
                        tx: 400,
                        ty: 100,
                        text: "Olivia...",
                        bubbleSize: "small"
                    },

                    {
                        frame: 630,
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
                        bubbleSize: "small"
                    },

                    {
                        frame: 700,
                        tx: 400,
                        ty: 100,
                        text: "but I can't give you the rose",
                        bubbleSize: "large"
                    },

                    {
                        frame: 750,
                        tx: 400,
                        ty: 100,
                        text: "I love someone else",
                        bubbleSize: "medium"
                    },

                    {
                        frame: 800,
                        tx: 400,
                        ty: 100,
                        text: "Jojo...",
                        bubbleSize: "small"
                    },

                    {
                        frame: 870,
                        tx: 400,
                        ty: 100,
                        text: "Jojo, will you accept this rose?",
                        bubbleSize: "large"
                    },

                    {
                        frame: 900,
                        tx: 400,
                        ty: 100,
                        text: "Jojo, will you accept this rose?",
                        bubbleSize: "large"
                    },

                ]
            },
//Olivia dialogue
            {
                draw: SpriteLibrary.dialogue.draw,
                keyframes: [ 
                
                    {
                        frame: 630,
                        tx: 900,
                        ty: 100,
                        text: "Yessss! Yes I accept this rose!!",
                        speakerPosition: "right",
                        bubbleSize: "large"
                    },

                    {
                        frame: 690,
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
                        frame: 905,
                        tx: 600,
                        ty: 100,
                        xOffset: 550,
                        text: "Yes, of course I will!",
                        bubbleSize: "medium"
                    },

                    {
                        frame: 925,
                        tx: 600,
                        ty: 100,
                        xOffset: 550,
                        text: "Yes, of course I will!",
                        bubbleSize: "medium"
                    },

                    {
                        frame: 1000,
                        tx: 600,
                        ty: 100,
                        xOffset: 550,
                        text: "I love you Ben!",
                        bubbleSize: "small"
                    },

                    {
                        frame: 1030,
                        tx: 600,
                        ty: 100,
                        xOffset: 550,
                        text: "I love you Ben!",
                        bubbleSize: "small"
                    },
                ]
            },
//ben replies
            {
                draw: SpriteLibrary.dialogue.draw,
                keyframes: [ 

                    {
                        frame: 1040,
                        tx: 400,
                        ty: 100,
                        text: "I love you too Jojo!",
                        bubbleSize: "medium"
                    },

                    {
                        frame: 1090,
                        tx: 400,
                        ty: 100,
                        text: "I love you too Jojo!",
                        bubbleSize: "medium"
                    },

                ]
            },
//olivia
            {
                draw: SpriteLibrary.dialogue.draw,
                keyframes: [ 

                    // {
                    //     frame: 1220,
                    //     tx: 990,
                    //     ty: 90,
                    //     text: "NOOOOOOO!!",
                    //     bubbleSize: "medium",
                    //     speakerPosition: "right",
                    //     RightOffset: 200

                    // },

                    {
                        frame: 1230,
                        tx: 900,
                        ty: 100,
                        text: "Ben is suppose to be mine!!",
                        bubbleSize: "large",
                        speakerPosition: "right",
                        //xRightOffset: 600

                    },

                    {
                        frame: 1260,
                        tx: 900,
                        ty: 100,
                        text: "Ben is suppose to be mine!!",
                        bubbleSize: "large",
                        speakerPosition: "right",
                        //xRightOffset: 600

                    },

                ]
            },

//heart
            {
                draw: heart,
                keyframes: [
                    {
                        frame: 1250,
                        tx: 250,
                        ty: 500,
                        sx: .25, 
                        sy: .25,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 1270,
                        tx: 200,
                        ty: 450,
                        sx: .25, 
                        sy: .25,
                    },

                    {
                        frame: 1290,
                        tx: 250,
                        ty: 400,
                        sx: .35, 
                        sy: .35,
                    },

                    {
                        frame: 1300,
                        tx: 200,
                        ty: 350,
                        sx: .45, 
                        sy: .45,
                    },

                    {
                        frame: 1310,
                        tx: 250,
                        ty: 300,
                        sx: .55, 
                        sy: .55,
                    },

                    {
                        frame: 1320,
                        tx: 200,
                        ty: 250,
                        sx: .65, 
                        sy: .65,
                    },

                    {
                        frame: 1330,
                        tx: 250,
                        ty: 200,
                        sx: .75, 
                        sy: .75,
                    },

                    {
                        frame: 1340,
                        tx: 200,
                        ty: 150,
                        sx: .85, 
                        sy: .85,
                    },

                    {
                        frame: 1350,
                        tx: 250,
                        ty: 100,
                        sx: .95, 
                        sy: .95,
                    },

                    {
                        frame: 1360,
                        tx: 200,
                        ty: 50,
                        sx: 1, 
                        sy: 1,
                    },

                    {
                        frame: 1370,
                        tx: 200,
                        ty: 0,
                        sx: 1, 
                        sy: 1,
                    }
                ]
            },

            {
                draw: heart,
                keyframes: [
                    {
                        frame: 1250,
                        tx: 650,
                        ty: 500,
                        sx: .25, 
                        sy: .25,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 1270,
                        tx: 600,
                        ty: 450,
                        sx: .25, 
                        sy: .25,
                    },

                    {
                        frame: 1290,
                        tx: 650,
                        ty: 400,
                        sx: .35, 
                        sy: .35,
                    },

                    {
                        frame: 1300,
                        tx: 600,
                        ty: 350,
                        sx: .45, 
                        sy: .45,
                    },

                    {
                        frame: 1310,
                        tx: 650,
                        ty: 300,
                        sx: .55, 
                        sy: .55,
                    },

                    {
                        frame: 1320,
                        tx: 600,
                        ty: 250,
                        sx: .65, 
                        sy: .65,
                    },

                    {
                        frame: 1330,
                        tx: 650,
                        ty: 200,
                        sx: .75, 
                        sy: .75,
                    },

                    {
                        frame: 1340,
                        tx: 600,
                        ty: 150,
                        sx: .85, 
                        sy: .85,
                    },

                    {
                        frame: 1350,
                        tx: 650,
                        ty: 100,
                        sx: .95, 
                        sy: .95,
                    },

                    {
                        frame: 1360,
                        tx: 600,
                        ty: 50,
                        sx: 1, 
                        sy: 1,
                    },

                    {
                        frame: 1370,
                        tx: 600,
                        ty: 0,
                        sx: 1, 
                        sy: 1,
                    }
                ]
            },

            {
                draw: heart,
                keyframes: [
                    {
                        frame: 1250,
                        tx: 450,
                        ty: 350,
                        sx: .25, 
                        sy: .25,
                        ease: KeyframeTweener.quadEaseInAndOut
                    },

                    {
                        frame: 1270,
                        tx: 400,
                        ty: 300,
                        sx: .25, 
                        sy: .25,
                    },

                    {
                        frame: 1290,
                        tx: 450,
                        ty: 250,
                        sx: .35, 
                        sy: .35,
                    },

                    {
                        frame: 1300,
                        tx: 400,
                        ty: 200,
                        sx: .45, 
                        sy: .45,
                    },

                    {
                        frame: 1310,
                        tx: 450,
                        ty: 150,
                        sx: .55, 
                        sy: .55,
                    },

                    {
                        frame: 1320,
                        tx: 400,
                        ty: 100,
                        sx: .65, 
                        sy: .65,
                    },

                    {
                        frame: 1330,
                        tx: 450,
                        ty: 50,
                        sx: .75, 
                        sy: .75,
                    },

                    {
                        frame: 1340,
                        tx: 400,
                        ty: 25,
                        sx: .85, 
                        sy: .85,
                    },

                    {
                        frame: 1350,
                        tx: 450,
                        ty: 15,
                        sx: .95, 
                        sy: .95,
                    },

                    {
                        frame: 1360,
                        tx: 400,
                        ty: 5,
                        sx: .95, 
                        sy: .95,
                    },

                    {
                        frame: 1370,
                        tx: 400,
                        ty: 5,
                        sx: .95, 
                        sy: .95,
                    },

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
