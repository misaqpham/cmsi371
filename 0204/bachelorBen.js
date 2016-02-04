(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR

	var BODY_WIDTH = 140;
	var BODY_HEIGHT = 185;
	var ARM_WIDTH = 35;
	var ARM_HEIGHT = 145;
	var LEG_WIDTH = 45;
	var LEG_HEIGHT = 150;

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
		
		/*renderingContext.fillStyle = "rgb{206, 172, 158}";
		renderingContext.beginPath();
		var fistRadius = ARM_WIDTH / 2;
		renderingContext.arc(0, ARM_HEIGHT + fistRadius, fistRadius, 0 , 2 * Math.PI, true);
		renderingContext.fill();*/
		renderingContext.restore();
	}

	SpriteLibrary.bachelorBen = function(bachelorSpecification) {
		
		var leftArmAngle = bachelorSpecification.leftArmAngle || (Math.PI / 4);
		var rightArmAngle = bachelorSpecification.rightArmAngle || (-Math.PI / 4);

		var renderingContext = bachelorSpecification.renderingContext;

		renderingContext.save();
		if (bachelorLoaded && tuxLoaded) {

			var bodyOffset = 25;
			var tuxOffset = 25;
			
			var rightLegOffset = 75;
			var leftLegOffset = 25;
			var legPositionOffset = 15;
			
			var leftArmXPositionOffset = 40;
			var rightArmXPositionOffset = 90;
			var leftArmYPositionOffset= 70;
			var rightArmYPositionOffset = 70;

			//draw head image and position body
			renderingContext.drawImage(bachelorImage, -bachelorImage.width, -bachelorImage.height);
			renderingContext.fillRect(-BODY_WIDTH + bodyOffset, bachelorImage.height / 10 - bodyOffset, 
										BODY_WIDTH, BODY_HEIGHT);

			//draw arms
			//renderingContext.fillStyle = "blue";
			drawArm(renderingContext, leftArmAngle, -leftArmXPositionOffset, leftArmYPositionOffset);
			drawArm(renderingContext, rightArmAngle, rightArmXPositionOffset, rightArmYPositionOffset);

			//draw tux image
			renderingContext.drawImage(tuxImage, -bachelorImage.width, -bachelorImage.height / 4 + tuxOffset);

			//draw legs
			renderingContext.fillStyle ="black";
			renderingContext.fillRect(-bachelorImage.width + rightLegOffset, BODY_HEIGHT - legPositionOffset , LEG_WIDTH, LEG_HEIGHT);
			renderingContext.fillRect(-bachelorImage.width + leftLegOffset, BODY_HEIGHT - legPositionOffset, LEG_WIDTH, LEG_HEIGHT);


		}
		renderingContext.restore()
	};
	
}());