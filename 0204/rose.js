(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR
	
	var roseImage = new Image();
	var roseLoaded = false;
	roseImage.addEventListener("load", function() {
		roseLoaded = true;
	}, false)
	roseImage.src ="rose.png";
	
	SpriteLibrary.rose = function (roseSpecification){
		var renderingContext = roseSpecification.renderingContext;

		if (roseLoaded) {
			renderingContext.drawImage(roseImage, 0, 0);
		}
	}
}());
