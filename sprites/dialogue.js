(function () {
  
  window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR
  
  SpriteLibrary.dialogue = function (dialogueSpecification){
    var renderingContext = dialogueSpecification.renderingContext;
    var text = dialogueSpecification.text;
    var font = dialogueSpecification.font || "32px calibri";
    var xPosition = dialogueSpecification.textPosition;
    var size = dialogueSpecification.bubbleSize || "medium";
    var speakerPosition = dialogueSpecification.speakerPosition || "left"

    var drawBubble = function(renderingContext) {
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
            renderingContext.stroke();
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
            renderingContext.stroke();
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
            renderingContext.stroke();
        }
      }

    var writeText = function(renderingContext) {
        renderingContext.font = font;
        renderingContext.fillText(text, xPosition, 75);
      }
        
    if(speakerPosition == "right") {
        renderingContext.save();
        renderingContext.scale(-1,1); 
        drawBubble(renderingContext);
        renderingContext.restore();
        writeText(renderingContext); 
    } else {
        drawBubble(renderingContext);
        writeText(renderingContext);
    }      
}
}());
