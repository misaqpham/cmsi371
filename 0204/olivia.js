(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; 
	var ARM_WIDTH = 30;
	var ARM_HEIGHT = 160;

	var oliviaImage = new Image();
	var oliviaLoaded = false;
	oliviaImage.addEventListener("load", function() {
		oliviaLoaded = true;
	}, false)
	oliviaImage.src ="olivia-bach.png";
	
	var oliviaMadImage = new Image();
	var oliviaMadLoaded = false;
	oliviaMadImage.addEventListener("load", function() {
		oliviaMadLoaded = true;
	}, false)
	oliviaMadImage.src ="olivia2-bach.png";

	var dressImage = new Image();
	var dressLoaded = false;

	dressImage.addEventListener("load", function() {
		dressLoaded = true;
	}, false)
	dressImage.src ="olivia-dress.png";

	var BODY_WIDTH = dressImage.width;
	var BODY_HEIGHT = dressImage.height;

	var drawArm = function(renderingContext, armAngle, armXOffset, armYOffset) {
		renderingContext.save();
		renderingContext.translate(-BODY_WIDTH / 2 + armXOffset, -BODY_HEIGHT / 2 + armYOffset);
		renderingContext.rotate(armAngle);
		renderingContext.fillStyle = "#EAD3A9";
		renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);
		
		renderingContext.beginPath();
		var fistRadius = ARM_WIDTH / 2;
		renderingContext.arc(0, ARM_HEIGHT + fistRadius / 2, fistRadius, 0 , 2 * Math.PI, true);
		renderingContext.fill();
		renderingContext.restore();
	}

	SpriteLibrary.olivia = function (oliviaSpecification) {
		var renderingContext = oliviaSpecification.renderingContext;
		var mood = oliviaSpecification.mood || "happy";
		var leftArmAngle = oliviaSpecification.leftArmAngle || (Math.PI / 4);
		var rightArmAngle = oliviaSpecification.rightArmAngle || (-Math.PI / 4);

		var dressOffset = 45;
		var imageOffset = 30;

		var armXOffset = 50;
		var armYOffset = 250;

		drawArm(renderingContext, rightArmAngle, armXOffset, armYOffset);
		drawArm(renderingContext, leftArmAngle, -armXOffset, armYOffset);
		
		renderingContext.save();
		if(dressLoaded) {
			renderingContext.drawImage(dressImage, -BODY_WIDTH, -oliviaImage.height/2 + dressOffset);
		}
		renderingContext.restore();

		renderingContext.save();
		if (oliviaLoaded || oliviaMadLoaded) {
			if (mood == "happy") {
				renderingContext.save();
				renderingContext.scale(.9, .9);
				renderingContext.drawImage(oliviaImage, -oliviaImage.width, -oliviaImage.height);
				renderingContext.restore();
			} else if (mood == "mad") {
				renderingContext.save();
				renderingContext.scale(.9, .9);
				renderingContext.drawImage(oliviaMadImage, -oliviaMadImage.width, -oliviaMadImage.height + imageOffset);
				renderingContext.restore();
			}
			renderingContext.restore();
		}
	}

}());
