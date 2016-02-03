(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; 
	var ARM_WIDTH = 35;
	var ARM_HEIGHT = 150;

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

	SpriteLibrary.jojo = function (jojoSpecification) {
		var renderingContext = jojoSpecification.renderingContext;
		var mood = jojoSpecification.mood || "mad";
		var leftArmAngle = jojoSpecification.leftArmAngle || (Math.PI / 4);
		var rightArmAngle = jojoSpecification.rightArmAngle || (-Math.PI / 4);

		renderingContext.save();
		renderingContext.translate(-jojoImage.width/ 5, jojoImage.height / 2 + 100);
		renderingContext.rotate(rightArmAngle);
		renderingContext.fillStyle = "#E2B98F";
		renderingContext.fillRect(jojoImage.width / 2, jojoImage.height / 4 , ARM_WIDTH, ARM_HEIGHT);
		renderingContext.restore();

		renderingContext.save();
		renderingContext.translate(jojoImage.width / 4 - 40, jojoImage.height / 4 - 50);
		renderingContext.rotate(leftArmAngle);
		renderingContext.fillStyle = "#E2B98F";
		renderingContext.fillRect(jojoImage.width / 2, jojoImage.height / 4 , ARM_WIDTH, ARM_HEIGHT);
		renderingContext.restore();
		
		if (jojoLoaded) {
			renderingContext.save();
			renderingContext.scale(.9, .9);
			renderingContext.drawImage(jojoImage, 0, 0);
			renderingContext.restore();
		}

		if(dressLoaded) {
			renderingContext.drawImage(dressImage, jojoImage.width / 8 - 10, jojoImage.height / 2 + 10);
		}

	}

}());
