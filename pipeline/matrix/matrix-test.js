/*
 * Unit tests for our mector object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m = new Matrix(7, 1, 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 7, 1, 1);

        equal(m.dimensions(), 16, "Matrix size");
        equal(m.elements[0], 7, "First element by index");
        equal(m.elements[1], 1, "Second element by index");
        equal(m.elements[2], 1, "Third element by index");
        equal(m.elements[3], 0, "Fourth element by index");
        equal(m.elements[4], 1, "Fifth element by index");
        equal(m.elements[5], 2, "Sixth element by index");
        equal(m.elements[6], 3, "Sementh element by index");
        equal(m.elements[7], 4, "Eight element by index");
        equal(m.elements[8], 5, "Ninth element by index");
        equal(m.elements[9], 6, "Tenth element by index");
        equal(m.elements[10], 7, "Eleventh element by index");
        equal(m.elements[11], 8, "Twelfth element by index");
        equal(m.elements[12], 9, "Thirteenth element by index");
        equal(m.elements[13], 7, "Fourteenth element by index");
        equal(m.elements[14], 1, "Fifteenth element by index");
        equal(m.elements[15], 1, "Sixteenth element by index");

        var m2 = new Matrix();

        equal(m2.dimensions(), 16, "Matrix size");
        equal(m2.elements[0], 1, "First element by index");
        equal(m2.elements[1], 0, "Second element by index");
        equal(m2.elements[2], 0, "Third element by index");
        equal(m2.elements[3], 0, "Fourth element by index");
        equal(m2.elements[4], 0, "Fifth element by index");
        equal(m2.elements[5], 1, "Sixth element by index");
        equal(m2.elements[6], 0, "Sementh element by index");
        equal(m2.elements[7], 0, "Eight element by index");
        equal(m2.elements[8], 0, "Ninth element by index");
        equal(m2.elements[9], 0, "Tenth element by index");
        equal(m2.elements[10], 1, "Eleventh element by index");
        equal(m2.elements[11], 0, "Twelfth element by index");
        equal(m2.elements[12], 0, "Thirteenth element by index");
        equal(m2.elements[13], 0, "Fourteenth element by index");
        equal(m2.elements[14], 0, "Fifteenth element by index");
        equal(m2.elements[15], 1, "Sixteenth element by index");

        var m3 = m2.convertForWebGL(); 

        equal(m3[0], 1, "First element by index converted for WebGL");
        equal(m3[1], 0, "Second element by index converted for WebGL");
        equal(m3[2], 0, "Third element by index converted for WebGL");
        equal(m3[3], 0, "Fourth element by index converted for WebGL");
        equal(m3[4], 0, "Fifth element by index converted for WebGL");
        equal(m3[5], 1, "Sixth element by index converted for WebGL");
        equal(m3[6], 0, "Sementh element by index converted for WebGL");
        equal(m3[7], 0, "Eight element by index converted for WebGL");
        equal(m3[8], 0, "Ninth element by index converted for WebGL");
        equal(m3[9], 0, "Tenth element by index converted for WebGL");
        equal(m3[10], 1, "Eleventh element by index converted for WebGL");
        equal(m3[11], 0, "Twelfth element by index converted for WebGL");
        equal(m3[12], 0, "Thirteenth element by index converted for WebGL");
        equal(m3[13], 0, "Fourteenth element by index converted for WebGL");
        equal(m3[14], 0, "Fifteenth element by index converted for WebGL");
        equal(m3[15], 1, "Sixteenth element by index converted for WebGL");

        var m4 = new Matrix(1, 8, 6, 3, 8, 9, 11, 6, 4, 5, 9, 32, 10, 7, 2, 3);
        m4 = m4.convertForWebGL();

        equal(m4[0], 1, "First element by index converted for WebGL");
        equal(m4[1], 8, "Second element by index converted for WebGL");
        equal(m4[2], 4, "Third element by index converted for WebGL");
        equal(m4[3], 10, "Fourth element by index converted for WebGL");
        equal(m4[4], 8, "Fifth element by index converted for WebGL");
        equal(m4[5], 9, "Sixth element by index converted for WebGL");
        equal(m4[6], 5, "Sementh element by index converted for WebGL");
        equal(m4[7], 7, "Eight element by index converted for WebGL");
        equal(m4[8], 6, "Ninth element by index converted for WebGL");
        equal(m4[9], 11, "Tenth element by index converted for WebGL");
        equal(m4[10], 9, "Eleventh element by index converted for WebGL");
        equal(m4[11], 2, "Twelfth element by index converted for WebGL");
        equal(m4[12], 3, "Thirteenth element by index converted for WebGL");
        equal(m4[13], 6, "Fourteenth element by index converted for WebGL");
        equal(m4[14], 32, "Fifteenth element by index converted for WebGL");
        equal(m4[15], 3, "Sixteenth element by index converted for WebGL");


    });

    test("Matrix multiplication", function () {
        var m1 = new Matrix(),
            m2 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
            result = m1.multiply(m2);

        equal(result.elements[0], 1, "First element by index");
        equal(result.elements[1], 2, "Second element by index");
        equal(result.elements[2], 3, "Third element by index");
        equal(result.elements[3], 4, "Fourth element by index");
        equal(result.elements[4], 5, "Fifth element by index");
        equal(result.elements[5], 6, "Sixth element by index");
        equal(result.elements[6], 7, "Sementh element by index");
        equal(result.elements[7], 8, "Eight element by index");
        equal(result.elements[8], 9, "Ninth element by index");
        equal(result.elements[9], 10, "Tenth element by index");
        equal(result.elements[10], 11, "Eleventh element by index");
        equal(result.elements[11], 12, "Twelfth element by index");
        equal(result.elements[12], 13, "Thirteenth element by index");
        equal(result.elements[13], 14, "Fourteenth element by index");
        equal(result.elements[14], 15, "Fifteenth element by index");
        equal(result.elements[15], 16, "Sixteenth element by index");

        var m3 = new Matrix(1, 2, 3, 4, 0, 1, 2, 3, 4, 5, 7, 1, 1, 13, 26, 10),
            m4 = new Matrix(2, 4, 6, 8, 9, 7, 5, 3, 1, 24, 5, 0, 47, 35, 45, 3)
        
        result = m3.multiply(m4)
        equal(result.elements[0], 211, "First element by index");
        equal(result.elements[1], 230, "Second element by index");
        equal(result.elements[2], 211, "Third element by index");
        equal(result.elements[3], 26, "Fourth element by index");
        equal(result.elements[4], 152, "Fifth element by index");
        equal(result.elements[5], 160, "Sixth element by index");
        equal(result.elements[6], 150, "Sementh element by index");
        equal(result.elements[7], 12, "Eight element by index");
        equal(result.elements[8], 107, "Ninth element by index");
        equal(result.elements[9], 254, "Tenth element by index");
        equal(result.elements[10], 129, "Eleventh element by index");
        equal(result.elements[11], 50, "Twelfth element by index");
        equal(result.elements[12], 615, "Thirteenth element by index");
        equal(result.elements[13], 1069, "Fourteenth element by index");
        equal(result.elements[14], 651, "Fifteenth element by index");
        equal(result.elements[15], 77, "Sixteenth element by index");

    });

    test("Matrix Scale", function () {
        var m1 = Matrix.getScaleMatrix(7, 3, 9);
            
        equal(m1.elements[0], 7, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], 0, "Third element by index");
        equal(m1.elements[3], 0, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], 3, "Sixth element by index");
        equal(m1.elements[6], 0, "Sementh element by index");
        equal(m1.elements[7], 0, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], 9, "Eleventh element by index");
        equal(m1.elements[11], 0, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], 0, "Fifteenth element by index");
        equal(m1.elements[15], 1, "Sixteenth element by index");

        m1 = Matrix.getScaleMatrix(15, 1026, 64);

        equal(m1.elements[0], 15, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], 0, "Third element by index");
        equal(m1.elements[3], 0, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], 1026, "Sixth element by index");
        equal(m1.elements[6], 0, "Sementh element by index");
        equal(m1.elements[7], 0, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], 64, "Eleventh element by index");
        equal(m1.elements[11], 0, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], 0, "Fifteenth element by index");
        equal(m1.elements[15], 1, "Sixteenth element by index");

    });

    test("Translation Matrix", function () {
        var m1 = Matrix.getTranslationMatrix(7, 3, 9);
            
        equal(m1.elements[0], 1, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], 0, "Third element by index");
        equal(m1.elements[3], 7, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], 1, "Sixth element by index");
        equal(m1.elements[6], 0, "Sementh element by index");
        equal(m1.elements[7], 3, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], 1, "Eleventh element by index");
        equal(m1.elements[11], 9, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], 0, "Fifteenth element by index");
        equal(m1.elements[15], 1, "Sixteenth element by index");

        m1 = Matrix.getTranslationMatrix(15, 1026, 64);

        equal(m1.elements[0], 1, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], 0, "Third element by index");
        equal(m1.elements[3], 15, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], 1, "Sixth element by index");
        equal(m1.elements[6], 0, "Sementh element by index");
        equal(m1.elements[7], 1026, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], 1, "Eleventh element by index");
        equal(m1.elements[11], 64, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], 0, "Fifteenth element by index");
        equal(m1.elements[15], 1, "Sixteenth element by index");

    });

    test("Orthongonal Matrix", function () {
        var m1 = Matrix.getOrthogonalMatrix(4, 2, -2, 2, 6, 2);
            
        equal(m1.elements[0], 1, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], 0, "Third element by index");
        equal(m1.elements[3], -3, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], -0.5, "Sixth element by index");
        equal(m1.elements[6], 0, "Sementh element by index");
        equal(m1.elements[7], 0, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], -0.5, "Eleventh element by index");
        equal(m1.elements[11], -2, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], 0, "Fifteenth element by index");
        equal(m1.elements[15], 1, "Sixteenth element by index");

        m1 = Matrix.getOrthogonalMatrix(2, 7, 6, 5, -2, -4);

        equal(m1.elements[0], -0.4, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], 0, "Third element by index");
        equal(m1.elements[3], 1.8, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], 2, "Sixth element by index");
        equal(m1.elements[6], 0, "Sementh element by index");
        equal(m1.elements[7], -11, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], -1, "Eleventh element by index");
        equal(m1.elements[11], 3, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], 0, "Fifteenth element by index");
        equal(m1.elements[15], 1, "Sixteenth element by index");

    });
    
    test("Perspective Projection Matrix", function () {
        var m1 = Matrix.getPerspectiveProjectionMatrix(4, 2, -2, 2, 6, 2);
            
        equal(m1.elements[0], 2, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], 3, "Third element by index");
        equal(m1.elements[3], 0, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], -1, "Sixth element by index");
        equal(m1.elements[6], 0, "Sementh element by index");
        equal(m1.elements[7], 0, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], -2, "Eleventh element by index");
        equal(m1.elements[11], -6, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], -1, "Fifteenth element by index");
        equal(m1.elements[15], 0, "Sixteenth element by index");

        m1 = Matrix.getPerspectiveProjectionMatrix(2, 7, 6, 5, -2, -4);

        equal(m1.elements[0], 8/5, "First element by index");
        equal(m1.elements[1], 0, "Second element by index");
        equal(m1.elements[2], -1.8, "Third element by index");
        equal(m1.elements[3], 0, "Fourth element by index");
        equal(m1.elements[4], 0, "Fifth element by index");
        equal(m1.elements[5], -8, "Sixth element by index");
        equal(m1.elements[6], 11, "Sementh element by index");
        equal(m1.elements[7], 0, "Eight element by index");
        equal(m1.elements[8], 0, "Ninth element by index");
        equal(m1.elements[9], 0, "Tenth element by index");
        equal(m1.elements[10], 3, "Eleventh element by index");
        equal(m1.elements[11], -8, "Twelfth element by index");
        equal(m1.elements[12], 0, "Thirteenth element by index");
        equal(m1.elements[13], 0, "Fourteenth element by index");
        equal(m1.elements[14], -1, "Fifteenth element by index");
        equal(m1.elements[15], 0, "Sixteenth element by index");

    });

});
