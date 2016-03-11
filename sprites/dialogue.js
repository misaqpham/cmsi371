(function () {

    window.SpriteLibrary = window.SpriteLibrary || {};

    window.SpriteLibrary.dialogue = (function () {

        var drawBubble = function (renderingContext, size) {
            if (size == "small") {
                renderingContext.beginPath();
                renderingContext.moveTo(75,25);
                renderingContext.quadraticCurveTo(25,25,25,62.5);
                renderingContext.quadraticCurveTo(25,100,50,100);
                renderingContext.quadraticCurveTo(50,120,30,125);
                renderingContext.quadraticCurveTo(60,120,65,100);
                renderingContext.lineTo(125,100);
                renderingContext.quadraticCurveTo(225,100,225,62.5);
                renderingContext.quadraticCurveTo(225,25,175,25.5);
                renderingContext.lineTo(75,25);
                renderingContext.fillStyle = "black";
                renderingContext.stroke();
                renderingContext.fillStyle ="white";
                renderingContext.fill();
            } else if (size == "medium") {
                renderingContext.beginPath();
                renderingContext.moveTo(75,25);
                renderingContext.quadraticCurveTo(25,25,25,62.5);
                renderingContext.quadraticCurveTo(25,100,50,100);
                renderingContext.quadraticCurveTo(50,120,30,125);
                renderingContext.quadraticCurveTo(60,120,65,100);
                renderingContext.lineTo(225,100);
                renderingContext.quadraticCurveTo(325,100,325,62.5);
                renderingContext.quadraticCurveTo(325,25,275,25.5);
                renderingContext.lineTo(75,25);
                renderingContext.fillStyle = "black";
                renderingContext.stroke();
                renderingContext.fillStyle ="white";
                renderingContext.fill();
            } else if (size == "large") {
                renderingContext.beginPath();
                renderingContext.moveTo(75,25);
                renderingContext.quadraticCurveTo(25,25,25,62.5);
                renderingContext.quadraticCurveTo(25,100,50,100);
                renderingContext.quadraticCurveTo(50,120,30,125);
                renderingContext.quadraticCurveTo(60,120,65,100);
                renderingContext.lineTo(325,100);
                renderingContext.quadraticCurveTo(425,100,425,62.5);
                renderingContext.quadraticCurveTo(425,25,375,25.5);
                renderingContext.lineTo(75,25);
                renderingContext.fillStyle = "black";
                renderingContext.stroke();
                renderingContext.fillStyle = "white";
                renderingContext.fill();
            }
          }

        var writeText = function (renderingContext, text, font, xPosition, yPosition) {
            renderingContext.font = font;
            renderingContext.fillStyle = "black";
            renderingContext.fillText(text, xPosition, yPosition/2 + 20);
        }
        
        var drawDialogue = function (dialogueSpecification) { 
            var renderingContext = dialogueSpecification.renderingContext;
            var text = dialogueSpecification.text;
            var font = dialogueSpecification.font || "26px calibri";
            var xPosition = dialogueSpecification.tx;
            var yPosition = dialogueSpecification.ty;
            var size = dialogueSpecification.bubbleSize || "medium";
            var speakerPosition = dialogueSpecification.speakerPosition || "left";
            var xOffset = dialogueSpecification.xOffset || 350;
            var xRightOffset = dialogueSpecification.xRightOffset || 500;


            if(speakerPosition == "right") {
                renderingContext.save();
                renderingContext.scale(-1,1); 
                drawBubble(renderingContext, size);
                renderingContext.restore();
                writeText(renderingContext, text, font, -xPosition + xRightOffset, yPosition); 
            } else {
                renderingContext.save();
                drawBubble(renderingContext, size);
                renderingContext.restore();
                writeText(renderingContext, text, font, xPosition - xOffset, yPosition);
            }  
        }
        return {draw: drawDialogue};
    }());
}());
