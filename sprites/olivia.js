(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; 
	
	window.SpriteLibrary.olivia = (function () {

		var ARM_WIDTH = 35;
		var ARM_HEIGHT = 100;
		var FOREARM_HEIGHT = 90; 

		var oliviaImage = new Image();
		var oliviaLoaded = false;
		oliviaImage.addEventListener("load", function() {
			oliviaLoaded = true;
		}, false)
		oliviaImage.src ="../sprites/olivia-bach.png";
		
		var oliviaMadImage = new Image();
		var oliviaMadLoaded = false;
		oliviaMadImage.addEventListener("load", function() {
			oliviaMadLoaded = true;
		}, false)
		oliviaMadImage.src ="../sprites/olivia2-bach.png";

		var oliviaShockImage = new Image();
		var oliviaShockLoaded = false;
		oliviaShockImage.addEventListener("load", function() {
			oliviaShockLoaded = true;
		}, false)
		oliviaShockImage.src ="../sprites/olivia-scream.png";

		var dressImage = new Image();
		var dressLoaded = false;

		dressImage.addEventListener("load", function() {
			dressLoaded = true;
		}, false)
		dressImage.src ="../sprites/olivia-dress.png";

		var BODY_WIDTH = dressImage.width;
		var BODY_HEIGHT = dressImage.height;

		var drawArm = function(renderingContext, armAngle, elbowAngle, armXOffset, armYOffset) {
			renderingContext.save();

			//upper arm
			renderingContext.translate(-BODY_WIDTH / 2 + armXOffset, -BODY_HEIGHT / 2 + armYOffset);
			renderingContext.rotate(armAngle);
			renderingContext.fillStyle = "#EAD3A9";
			renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);
			
			//elbow
			var elbowRadius = ARM_WIDTH / 2;
			renderingContext.beginPath();
			renderingContext.arc(0, ARM_HEIGHT, elbowRadius, 0 , 2 * Math.PI, true);
			renderingContext.fill();

			//forearm
			renderingContext.translate(0, ARM_HEIGHT);
			renderingContext.rotate(elbowAngle);
			renderingContext.fillRect(-elbowRadius, 0, ARM_WIDTH, FOREARM_HEIGHT);
	        
	        //hand
			var handRadius = ARM_WIDTH / 2;
			var handPosition = FOREARM_HEIGHT + handRadius / 2;
			renderingContext.beginPath();
			renderingContext.arc(0, handPosition, handRadius, 0 , 2 * Math.PI, true);		
			renderingContext.fill();

			renderingContext.restore();
		}

		var drawOlivia = function (oliviaSpecification) {
			if (!oliviaLoaded || !oliviaMadLoaded || !oliviaShockLoaded || !dressLoaded) {
				return;
			}

			var renderingContext = oliviaSpecification.renderingContext;
			var mood = oliviaSpecification.mood || "happy" ;
			var leftArmAngle = oliviaSpecification.leftArmAngle || (15*Math.PI/180);
			var rightArmAngle = oliviaSpecification.rightArmAngle || (-15*Math.PI/180);
			var leftElbowAngle = oliviaSpecification.leftElbowAngle || (15*Math.PI/180);
			var rightElbowAngle = oliviaSpecification.rightElbowAngle || (-15*Math.PI/180);

			var dressOffset = 45;
			var imageOffset1 = 30;
			var imageOffset2 = 10;

			var armXOffset = 50;
			var rightArmXOffset = 75;
			var armYOffset = 250;
			
			renderingContext.save();
			if(dressLoaded || oliviaImageLoaded) {
				renderingContext.drawImage(dressImage, -BODY_WIDTH, -oliviaImage.height/2 + dressOffset);
			}
			renderingContext.restore();
			
			drawArm(renderingContext, rightArmAngle, rightElbowAngle, rightArmXOffset, armYOffset);
			drawArm(renderingContext, leftArmAngle, leftElbowAngle, -armXOffset, armYOffset);
			
			renderingContext.save();
			if (mood == "happy" || 0 && oliviaLoaded) {
				renderingContext.save();
				renderingContext.scale(.9, .9);
				renderingContext.drawImage(oliviaImage, -oliviaImage.width, -oliviaImage.height);
				renderingContext.restore();
			} else if (mood == "mad" || 1 && oliviaMadImage) {
				renderingContext.save();
				renderingContext.scale(.8, .8);
				renderingContext.drawImage(oliviaMadImage, -oliviaMadImage.width, -oliviaMadImage.height + imageOffset1);
				renderingContext.restore();
			} else if (mood == "shock" || 2 && oliviaShockImage) {
				renderingContext.save();
				renderingContext.scale(1.2,1.2);
				renderingContext.drawImage(oliviaShockImage, -oliviaShockImage.width - imageOffset2, -oliviaShockImage.height + imageOffset2);
				renderingContext.restore();
			}
			renderingContext.restore();
		}
		return {draw: drawOlivia};
	}());
}());
