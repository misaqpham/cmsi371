(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; 
	var ARM_WIDTH = 35;
	var ARM_HEIGHT = 150;

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
	dressImage.src ="olivias-dress.png";

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

	SpriteLibrary.olivia = function (oliviaSpecification) {
		var renderingContext = oliviaSpecification.renderingContext;
		var mood = oliviaSpecification.mood || "mad";
		var leftArmAngle = oliviaSpecification.leftArmAngle || (Math.PI / 4);
		var rightArmAngle = oliviaSpecification.rightArmAngle || (-Math.PI / 4);

		renderingContext.save();
		renderingContext.translate(oliviaImage.width / 6, oliviaImage.height);
		renderingContext.rotate(rightArmAngle);
		renderingContext.fillStyle = "#E2B98F";
		renderingContext.fillRect(oliviaImage.width / 2, oliviaImage.height / 4 , ARM_WIDTH, ARM_HEIGHT);
		renderingContext.restore();

		renderingContext.save();
		renderingContext.translate(-oliviaImage.width / 6 + 50, oliviaImage.height / 2.5);
		renderingContext.rotate(leftArmAngle);
		renderingContext.fillStyle = "#E2B98F";
		renderingContext.fillRect(oliviaImage.width / 2, oliviaImage.height / 4 , ARM_WIDTH, ARM_HEIGHT);
		renderingContext.restore();
		
		if(dressLoaded) {
			renderingContext.drawImage(dressImage, -oliviaImage.width / 8 + 10, oliviaImage.height / 2 + 40);
		}

		if (oliviaLoaded || oliviaMadLoaded) {
			if (mood = "happy") {
				renderingContext.save();
				renderingContext.scale(.9, .9);
				renderingContext.drawImage(oliviaImage, 0, 0);
				renderingContext.restore();
			} else if (mood = "mad") {
				renderingContext.save();
				renderingContext.scale(.9, .9);
				renderingContext.drawImage(oliviaMadImage, 0, 0);
				renderingContext.restore();
			}
		}

		




	}

}());
