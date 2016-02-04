(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; 
	var ARM_WIDTH = 30;
	var ARM_HEIGHT = 160;

	var jojoImage = new Image();
	var jojoLoaded = false;
	jojoImage.addEventListener("load", function() {
		jojoLoaded = true;
	}, false)
	jojoImage.src ="bachelor-jojo.png";

	var dressImage = new Image();
	var dressLoaded = false;
	dressImage.addEventListener("load", function() {
		dressLoaded = true;
	}, false)
	dressImage.src ="jojo-dress.png";

	var BODY_WIDTH = dressImage.width;
	var BODY_HEIGHT = dressImage.height;

	var drawArm = function(renderingContext, armAngle, armXOffset, armYOffset) {
		renderingContext.save();
		renderingContext.translate(-BODY_WIDTH / 2 + armXOffset, -BODY_HEIGHT / 2 + armYOffset);
		renderingContext.rotate(armAngle);
		renderingContext.fillStyle = "#D3B39E";
		renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);
		
		renderingContext.beginPath();
		var fistRadius = ARM_WIDTH / 2;
		renderingContext.arc(0, ARM_HEIGHT + fistRadius / 2, fistRadius, 0 , 2 * Math.PI, true);
		renderingContext.fill();
		renderingContext.restore();
	}

	SpriteLibrary.jojo = function (jojoSpecification) {
		var renderingContext = jojoSpecification.renderingContext;
		var leftArmAngle = jojoSpecification.leftArmAngle || (Math.PI / 4);
		var rightArmAngle = jojoSpecification.rightArmAngle || (-Math.PI / 4);

		var dressOffset = 35;
		var armYOffset = 150;
		var rightArmXOffset = 30;
		var leftArmXOffset = 100;
		
		drawArm(renderingContext, rightArmAngle, rightArmXOffset, armYOffset);
		drawArm(renderingContext, leftArmAngle, -leftArmXOffset, armYOffset);
		
		renderingContext.save();
		if (jojoLoaded) {
			renderingContext.scale(.9, .9);
			renderingContext.drawImage(jojoImage, -jojoImage.width, -jojoImage.height);
		}
		renderingContext.restore();

		renderingContext.save();
		if(dressLoaded) {
			renderingContext.drawImage(dressImage, -BODY_WIDTH - dressOffset, -jojoImage.height/2 + 60);
		}
		renderingContext.restore();

		/*renderingContext.save();
		renderingContext.translate(-BODY_WIDTH / 2 + rightArmXOffset, -BODY_HEIGHT / 2 + armYOffset);
		renderingContext.rotate(rightArmAngle);
		renderingContext.fillStyle = "#DABBA5";
		renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);
		renderingContext.restore();

		//renderingContext.translate(BODY_WIDTH / 2 + armXOffset, BODY_HEIGHT / 2 - armYOffset);
		//renderingContext.rotate(armAngle);
		//renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);

		renderingContext.save();
		renderingContext.translate(-BODY_WIDTH / 2 - leftArmXOffset, -BODY_HEIGHT / 2 + armYOffset);
		renderingContext.rotate(leftArmAngle);
		renderingContext.fillStyle = "#DABBA5";
		renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);
		renderingContext.restore();*/

	}

}());
