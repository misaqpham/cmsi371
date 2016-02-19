(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR
	
	var roseImage = new Image();
	var roseLoaded = false;
	roseImage.addEventListener("load", function() {
		roseLoaded = true;
	}, false)
	roseImage.src ="rose.png";
	
	window.SpriteLibrary.rose = (function (){

		var drawRose = function(roseSpecification) {
		
		var renderingContext = roseSpecification.renderingContext;

		renderingContext.save()
		if (roseLoaded) {
			renderingContext.rotate(11*Math.PI/6);
			renderingContext.drawImage(roseImage, 0, 0);
		}
		renderingContext.restore();
		}
		
		return {draw: drawRose};
	
	}());

}());
