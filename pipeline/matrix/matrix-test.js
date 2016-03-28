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
        equal(m.elements[10], 7, "Elementh element by index");
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
        equal(m2.elements[10], 1, "Elementh element by index");
        equal(m2.elements[11], 0, "Twelfth element by index");
        equal(m2.elements[12], 0, "Thirteenth element by index");
        equal(m2.elements[13], 0, "Fourteenth element by index");
        equal(m2.elements[14], 0, "Fifteenth element by index");
        equal(m2.elements[15], 1, "Sixteenth element by index");
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
        equal(result.elements[10], 11, "Elementh element by index");
        equal(result.elements[11], 12, "Twelfth element by index");
        equal(result.elements[12], 13, "Thirteenth element by index");
        equal(result.elements[13], 14, "Fourteenth element by index");
        equal(result.elements[14], 15, "Fifteenth element by index");
        equal(result.elements[15], 16, "Sixteenth element by index");
    });

});
