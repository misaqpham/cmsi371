(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR

	var BODY_WIDTH = 140;
	var BODY_HEIGHT = 185;
	
	var ARM_WIDTH = 35;
	var ARM_HEIGHT = 140;
	var FOREARM_HEIGHT = 90;

	var LEG_WIDTH = 45;
	var LEG_HEIGHT = 225;

	var bachelorImage = new Image();
	var bachelorLoaded = false;
	bachelorImage.addEventListener("load", function() {
		bachelorLoaded = true;
	}, false);
	bachelorImage.src ="ben-higgins.png";


	var tuxImage = new Image();
	var tuxLoaded = false;
	tuxImage.addEventListener("load", function() {
		tuxLoaded = true;
	}, false);
	tuxImage.src ="tux.png";


	var drawArm = function(renderingContext, armAngle, armXOffset, armYOffSet) {
		renderingContext.save();
		renderingContext.translate(-BODY_WIDTH / 2 + armXOffset, -tuxImage.height / 2 + armYOffSet);
		renderingContext.rotate(armAngle);
		renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);
		
		renderingContext.fillStyle = "#E2B98F";
		renderingContext.beginPath();
		var fistRadius = ARM_WIDTH / 2;
		renderingContext.arc(0, ARM_HEIGHT + fistRadius, fistRadius, 0 , 2 * Math.PI, true);
		renderingContext.fill();
	
		//renderingContext.fillStyle = "pink";
		//renderingContext.translate(-ARM_WIDTH, ARM_HEIGHT);
		//renderingContext.rotate(40 * Math.PI/180);
		//renderingContext.fillRect(-ARM_WIDTH + fistRadius, ARM_HEIGHT, ARM_WIDTH, FOREARM_HEIGHT);
        renderingContext.restore();
	}

	var drawForearm = function(renderingContext, elbowAngle, armXOffset, armYOffSet) {
		renderingContext.save();
		renderingContext.translate(-BODY_WIDTH + armXOffset, -tuxImage.height / 2 + armYOffSet);
		renderingContext.rotate(elbowAngle);
		renderingContext.fillRect(-ARM_WIDTH / 2, -ARM_HEIGHT, ARM_WIDTH, FOREARM_HEIGHT);
		
		renderingContext.fillStyle = "blue";
		renderingContext.beginPath();
		var fistRadius = ARM_WIDTH / 2;
		renderingContext.arc(0, ARM_HEIGHT, fistRadius, 0 , 2 * Math.PI, true);
		renderingContext.fill();

		renderingContext.fillStyle = "#E2B98F";
		renderingContext.beginPath();
		var fistRadius = ARM_WIDTH / 2;
		renderingContext.arc(0, -FOREARM_HEIGHT, fistRadius, 0 , 2 * Math.PI, true);
		renderingContext.fill();

        renderingContext.restore();

	}

	SpriteLibrary.bachelorBen = function(bachelorSpecification) {
		
		var renderingContext = bachelorSpecification.renderingContext;
		var leftArmAngle = bachelorSpecification.leftArmAngle || (Math.PI / 4);
		var rightArmAngle = bachelorSpecification.rightArmAngle || (-Math.PI / 4);
		var headTilt = bachelorSpecification.headTilt || "straight";
		

		renderingContext.save();
		if (bachelorLoaded && tuxLoaded) {

			var bodyOffset = 25;
			var tuxOffset = 25;

			var headOffset = 10;
			
			var rightLegOffset = 75;
			var leftLegOffset = 25;
			var legPositionOffset = 15;
			
			var leftArmXPositionOffset = 40;
			var rightArmXPositionOffset = 90;
			var leftArmYPositionOffset= 70;
			var rightArmYPositionOffset = 70;
			
			//draw neck
			renderingContext.fillStyle = "#E2B98F";
			renderingContext.fillRect(-bachelorImage.width / 2 - 5, -bachelorImage.height/2, 
										40, 100);

			//draw head image
			renderingContext.save();
			renderingContext.scale(.9,.9);
			if (headTilt == "straight") {
				renderingContext.rotate(5*Math.PI/180);
				renderingContext.drawImage(bachelorImage, -bachelorImage.width, -bachelorImage.height - headOffset);
			} else if (headTilt == "right") {
				renderingContext.rotate(20*Math.PI/180);
				renderingContext.drawImage(bachelorImage, -bachelorImage.width, -bachelorImage.height + headOffset/2);
			} else if (headTilt == "left") {
				renderingContext.rotate(350*Math.PI/180);
				renderingContext.drawImage(bachelorImage, -bachelorImage.width, -bachelorImage.height - headOffset*2);
			}
			renderingContext.restore();

			
			//position body
			renderingContext.fillStyle = "black";
			renderingContext.fillRect(-BODY_WIDTH + bodyOffset, bachelorImage.height / 10 - bodyOffset, 
										BODY_WIDTH, BODY_HEIGHT);

			//draw arms
			drawArm(renderingContext, leftArmAngle, -leftArmXPositionOffset, leftArmYPositionOffset);
			drawArm(renderingContext, rightArmAngle, rightArmXPositionOffset, rightArmYPositionOffset);

			//drawForearm(renderingContext, 2*Math.PI/3, -leftArmXPositionOffset, leftArmYPositionOffset);
			//drawForearm(renderingContext, Math.PI, rightArmXPositionOffset, rightArmYPositionOffset);


			//draw tux image
			renderingContext.drawImage(tuxImage, -bachelorImage.width, -bachelorImage.height / 4 + tuxOffset);

			//draw legs
			renderingContext.fillStyle ="black";
			renderingContext.fillRect(-bachelorImage.width + rightLegOffset, BODY_HEIGHT - legPositionOffset, 
										LEG_WIDTH, LEG_HEIGHT);
			renderingContext.fillRect(-bachelorImage.width + leftLegOffset, BODY_HEIGHT - legPositionOffset, 
										LEG_WIDTH, LEG_HEIGHT);
		}
		renderingContext.restore()
	};
	
}());