(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR

	var BODY_WIDTH = 125;
	var BODY_HEIGHT = 175;
	var ARM_WIDTH = 30;
	var ARM_HEIGHT = 125;
	var LEG_WIDTH = 50;
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


	var drawArm = function(renderingContext, armOffset, armAngle) {
		renderingContext.save();
		renderingContext.translate(armOffset * 2, bachelorImage.height - 30);
		renderingContext.rotate(armAngle);
		renderingContext.fillRect(-ARM_WIDTH / 2.5, BODY_WIDTH / 2 , ARM_WIDTH, ARM_HEIGHT);
		
		renderingContext.fillStyle = "rgb{206, 172, 158}";
		renderingContext.beginPath();
		var fistRadius = ARM_WIDTH / 2;
		renderingContext.arc(0, ARM_HEIGHT + fistRadius, fistRadius, 0 , 2 * Math.PI, true);
		renderingContext.fill();
		renderingContext.restore();
	}

	SpriteLibrary.bachelorBen = function(bachelorSpecification) {
		
		var leftArmAngle = bachelorSpecification.leftArmAngle || (Math.PI / 4);
		var rightArmAngle = bachelorSpecification.rightArmAngle || (-Math.PI / 4);

		var renderingContext = bachelorSpecification.renderingContext;

		renderingContext.save();
		if (bachelorLoaded) {

			renderingContext.drawImage(bachelorImage, bachelorImage.width * 2, 0);
			
			renderingContext.fillStyle ="black";
			renderingContext.fillRect(bachelorImage.width * 2 + 5, bachelorImage.height, BODY_WIDTH, BODY_HEIGHT);

			drawArm(renderingContext, bachelorImage.width * 1.25, leftArmAngle);
			
			drawArm(renderingContext, bachelorImage.width * 1.25, rightArmAngle);

			renderingContext.drawImage(tuxImage, bachelorImage.width * 2 - 5, bachelorImage.height - 20);

			renderingContext.fillStyle ="black";
			renderingContext.fillRect(bachelorImage.width * 2 + 15, bachelorImage.height + BODY_HEIGHT, LEG_WIDTH, LEG_HEIGHT);
			renderingContext.fillRect(bachelorImage.width * 3 - 40, bachelorImage.height + BODY_HEIGHT, LEG_WIDTH, LEG_HEIGHT);


		}
		renderingContext.restore()
	};
	
}());