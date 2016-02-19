(function () {
  
  window.SpriteLibrary = window.SpriteLibrary || {}; //do this instead using OR
  
  SpriteLibrary.dialogue = function (dialogueSpecification){
    var renderingContext = dialogueSpecification.renderingContext;
    var ctx = renderingContext;
    ctx.beginPath();
    ctx.moveTo(75,25);
    ctx.quadraticCurveTo(25,25,25,62.5);
    ctx.quadraticCurveTo(25,100,50,100);
    ctx.quadraticCurveTo(50,120,30,125);
    ctx.quadraticCurveTo(60,120,65,100);
    ctx.lineTo(425,100);
    ctx.quadraticCurveTo(525,100,525,62.5);
    ctx.quadraticCurveTo(525,25,475,25.5);
    ctx.lineTo(75,25);
    ctx.stroke();
  
  }

}());
