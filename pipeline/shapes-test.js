/*
 * Unit tests for our matrix object.
 */
$(function () {

    test("Adding Children", function () {
        var s1 = new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        });

        deepEqual(s1.children.length, 0);

        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        deepEqual(s1.children.length, 1);

        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));

        deepEqual(s1.children.length, 5);

    });

    test("Removing Children", function () {
        var s1 = new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        });

        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));

        deepEqual(s1.children.length, 5);

        s1.removeChildren();

        deepEqual(s1.children.length, 4);

        s1.removeChildren();

        deepEqual(s1.children.length, 3);
        
        s1.removeChildren();

        deepEqual(s1.children.length, 2);

        s1.removeChildren();

        deepEqual(s1.children.length, 1);

        s1.removeChildren();

        deepEqual(s1.children.length, 0);

        //length now zero, try to remove again and should still pass
        s1.removeChildren();

        deepEqual(s1.children.length, 0);
          
    });

    test("Comparing Children", function () {
        var s1 = new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        });
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.diamond()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.cube()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.cube()).toRawTriangleArray()
        }));

        var s2 = new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        });
       s2.addChildren(new Shape({
            vertices: new Shape(Shape.diamond()).toRawTriangleArray()
        }));
       s2.addChildren(new Shape({
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray()
        }));
       s2.addChildren(new Shape({
            vertices: new Shape(Shape.cube()).toRawTriangleArray()
        }));
       s2.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));
       s2.addChildren(new Shape({
            vertices: new Shape(Shape.cube()).toRawTriangleArray()
        }));

        deepEqual(s1.children.length, s2.children.length, "both children arrays are the same length");
        deepEqual(s1.children, s2.children, "both children arrays are the same");

        s2.removeChildren();
        s1.removeChildren();

        deepEqual(s1.children.length, s2.children.length, "after 1 removal, both children arrays are the same length");
        deepEqual(s1.children, s2.children, "after 1 removal, both children arrays are the same");



    });

});
