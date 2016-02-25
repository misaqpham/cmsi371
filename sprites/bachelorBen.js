(function () {
	
	window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR
	window.SpriteLibrary.bachelorBen = (function() {
	
		var BODY_WIDTH = 140;
		var BODY_HEIGHT = 185;
		
		var ARM_WIDTH = 35;
		var ARM_HEIGHT = 70;
		var FOREARM_HEIGHT = 80;

		var LEG_WIDTH = 45;
		var LEG_HEIGHT = 225;

		var NECK_WIDTH = 40;
		var NECK_HEIGHT = 80;

		var bachelorImage = new Image();
		var bachelorLoaded = false;
		bachelorImage.addEventListener("load", function() {
			bachelorLoaded = true;
		}, false);
		bachelorImage.src ="../sprites/ben-higgins.png";

		var tuxImage = new Image();
		var tuxLoaded = false;
		tuxImage.addEventListener("load", function() {
			tuxLoaded = true;
		}, false);
		tuxImage.src ="../sprites/tux.png";
		
		var drawArm = function (renderingContext, armAngle, elbowAngle, armXOffset, armYOffSet) {
			renderingContext.save();

			//upper arm
			renderingContext.translate(-BODY_WIDTH / 2 + armXOffset, -tuxImage.height / 2 + armYOffSet);
			renderingContext.fillStyle = "black";
			renderingContext.rotate(armAngle);
			renderingContext.fillRect(-ARM_WIDTH / 2, 0, ARM_WIDTH, ARM_HEIGHT);
			
			//elbow
			var elbowRadius = ARM_WIDTH / 2;
			renderingContext.fillStyle = "black";
			renderingContext.beginPath();
			renderingContext.arc(0, ARM_HEIGHT, elbowRadius, 0 , 2 * Math.PI, true);
			renderingContext.fill();
		
			//forearm
			renderingContext.fillStyle = "black";
			renderingContext.translate(0, ARM_HEIGHT);
			renderingContext.rotate(elbowAngle);
			renderingContext.fillRect(-elbowRadius, 0, ARM_WIDTH, FOREARM_HEIGHT);
	        
	        //hand
	        var handRadius = ARM_WIDTH / 2;
	        renderingContext.fillStyle = "#E2B98F";
			renderingContext.beginPath();
			renderingContext.arc(0, FOREARM_HEIGHT + handRadius, handRadius, 0 , 2 * Math.PI, true);
			renderingContext.fill();
			
	        renderingContext.restore();
		}
			
		var drawBen = function(bachelorSpecification) {

			var renderingContext = bachelorSpecification.renderingContext;
			var leftArmAngle = bachelorSpecification.leftArmAngle || ((30*Math.PI/180));
			var rightArmAngle = bachelorSpecification.rightArmAngle || (-30*Math.PI/180);
			var leftElbowAngle = bachelorSpecification.leftElbowAngle || ((30*Math.PI/180));
			var rightElbowAngle = bachelorSpecification.rightElbowAngle || (-30*Math.PI/180);
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
				renderingContext.fillRect(-bachelorImage.width / 2 - 5, -bachelorImage.height/2, NECK_WIDTH, NECK_HEIGHT);

				//draw head image
				renderingContext.save();
				renderingContext.scale(.9,.9);
				if (headTilt == "straight" || 0) {
					renderingContext.rotate(5*Math.PI/180);
					renderingContext.drawImage(bachelorImage, -bachelorImage.width, -bachelorImage.height - headOffset);
				} else if (headTilt == "right" || 1) {
					renderingContext.rotate(20*Math.PI/180);
					renderingContext.drawImage(bachelorImage, -bachelorImage.width, -bachelorImage.height + headOffset/2);
				} else if (headTilt == "left" || 2) {
					renderingContext.rotate(350*Math.PI/180);
					renderingContext.drawImage(bachelorImage, -bachelorImage.width, -bachelorImage.height - headOffset*2);
				}
				renderingContext.restore();

				//position body
				renderingContext.fillStyle = "black";
				renderingContext.fillRect(-BODY_WIDTH + bodyOffset, bachelorImage.height / 10 - bodyOffset, 
											BODY_WIDTH, BODY_HEIGHT);

				//draw tux image
				renderingContext.drawImage(tuxImage, -bachelorImage.width, -bachelorImage.height / 4 + tuxOffset);

				//draw arms
				drawArm(renderingContext, leftArmAngle, leftElbowAngle, -leftArmXPositionOffset, leftArmYPositionOffset);
				drawArm(renderingContext, rightArmAngle, rightElbowAngle, rightArmXPositionOffset, rightArmYPositionOffset);

				
				//draw legs
				renderingContext.fillStyle ="black";
				renderingContext.fillRect(-bachelorImage.width + rightLegOffset, BODY_HEIGHT - legPositionOffset, 
											LEG_WIDTH, LEG_HEIGHT);
				renderingContext.fillRect(-bachelorImage.width + leftLegOffset, BODY_HEIGHT - legPositionOffset, 
											LEG_WIDTH, LEG_HEIGHT);
			}
			renderingContext.restore()
		}
		return {draw: drawBen};
	})();
}());