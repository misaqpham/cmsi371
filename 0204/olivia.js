(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; 
	var ARM_WIDTH = 35;
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

	var oliviaShockImage = new Image();
	var oliviaShockLoaded = false;
	oliviaShockImage.addEventListener("load", function() {
		oliviaShockLoaded = true;
	}, false)
	oliviaShockImage.src ="olivia-scream.png";

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
		var fistPosition = ARM_HEIGHT + fistRadius - 5;
		renderingContext.arc(0, fistPosition, fistRadius, 0 , 2 * Math.PI, true);		
		renderingContext.fill();
		renderingContext.restore();
	}

	SpriteLibrary.olivia = function (oliviaSpecification) {
		if (!oliviaLoaded || !oliviaMadLoaded || !oliviaShockLoaded || !dressLoaded) {
			return;
		}

		var renderingContext = oliviaSpecification.renderingContext;
		var mood = oliviaSpecification.mood || "happy";
		var leftArmAngle = oliviaSpecification.leftArmAngle || (15*Math.PI/180);
		var rightArmAngle = oliviaSpecification.rightArmAngle || (-15*Math.PI/180);
		
		var dressOffset = 45;
		var imageOffset1 = 30;
		var imageOffset2 = 10;

		var armXOffset = 50;
		var armYOffset = 250;
		
		drawArm(renderingContext, rightArmAngle, armXOffset, armYOffset);
		drawArm(renderingContext, leftArmAngle, -armXOffset, armYOffset);
		
		renderingContext.save();
		if(dressLoaded || oliviaImageLoaded) {
			renderingContext.drawImage(dressImage, -BODY_WIDTH, -oliviaImage.height/2 + dressOffset);
		}
		renderingContext.restore();

		renderingContext.save();
		//if (oliviaLoaded || oliviaMadLoaded || oliviaShockLoaded) {
			if (mood == "happy" && oliviaLoaded) {
				renderingContext.save();
				renderingContext.scale(.9, .9);
				renderingContext.drawImage(oliviaImage, -oliviaImage.width, -oliviaImage.height);
				renderingContext.restore();
			} else if (mood == "mad" && oliviaMadImage) {
				renderingContext.save();
				renderingContext.scale(.8, .8);
				renderingContext.drawImage(oliviaMadImage, -oliviaMadImage.width, -oliviaMadImage.height + imageOffset1);
				renderingContext.restore();
			} else if (mood == "shock" && oliviaShockImage) {
				renderingContext.save();
				renderingContext.scale(1.2,1.2);
				renderingContext.drawImage(oliviaShockImage, -oliviaShockImage.width - imageOffset2, -oliviaShockImage.height + imageOffset2);
				renderingContext.restore();
			}
			renderingContext.restore();
		//}
		
	}

}());
