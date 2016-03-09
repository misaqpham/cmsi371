(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; 
	
	window.SpriteLibrary.jojo = (function () {
		var ARM_WIDTH = 35;
		var ARM_HEIGHT = 100;
		var FOREARM_HEIGHT = 90; 

		var jojoImage = new Image();
		var jojoLoaded = false;
		jojoImage.addEventListener("load", function() {
			jojoLoaded = true;
		}, false)
		jojoImage.src ="../../sprites/bachelor-jojo.png";

		var dressImage = new Image();
		var dressLoaded = false;
		dressImage.addEventListener("load", function() {
			dressLoaded = true;
		}, false)
		dressImage.src ="../../sprites/jojo-dress.png";

		var BODY_WIDTH = dressImage.width;
		var BODY_HEIGHT = dressImage.height;

		var drawArm = function (renderingContext, armAngle, elbowAngle, armXOffset, armYOffset) {
			renderingContext.save();

			//draw upper arm
			renderingContext.translate(-BODY_WIDTH / 2 + armXOffset, -BODY_HEIGHT / 2 + armYOffset);
			renderingContext.rotate(armAngle);
			renderingContext.fillStyle = "#D3B39E";
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

		var drawJojo = function (jojoSpecification) {
			if (!jojoLoaded || !dressLoaded) {
				return;
			}

			var renderingContext = jojoSpecification.renderingContext;
			var leftArmAngle = jojoSpecification.leftArmAngle || (15*Math.PI/180);
			var rightArmAngle = jojoSpecification.rightArmAngle || (-15*Math.PI/180);
			var leftElbowAngle = jojoSpecification.leftElbowAngle || (-5*Math.PI/180);
			var rightElbowAngle = jojoSpecification.rightElbowAngle || (5*Math.PI/180);

			var dressOffset = 35;
			var armYOffset = 160;
			var rightArmXOffset = 40;
			var leftArmXOffset = 100;
			
			renderingContext.save();
			if (dressLoaded && jojoLoaded) {
				//draw dress
				renderingContext.save();
				renderingContext.drawImage(dressImage, -BODY_WIDTH - dressOffset, -jojoImage.height/2 + dressOffset*2);
				renderingContext.restore();
				
				//draw arms
				drawArm(renderingContext, rightArmAngle, rightElbowAngle, rightArmXOffset, armYOffset);
				drawArm(renderingContext, leftArmAngle, leftElbowAngle, -leftArmXOffset, armYOffset);
				
				//draw head
				renderingContext.save();
				renderingContext.scale(.9, .9);
				renderingContext.drawImage(jojoImage, -jojoImage.width, -jojoImage.height);
				renderingContext.restore();
			}
			renderingContext.restore();	
		}
		return {draw: drawJojo};
	}());
}());
