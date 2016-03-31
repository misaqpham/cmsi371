/*
 * Unit tests for shape object.
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

        ok(s1.children.length, 1);

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

        ok(s1.children.length, 5);

        s1.removeChildren();

        ok(s1.children.length, 4);

        s1.removeChildren();

        ok(s1.children.length, 3);
        
        s1.removeChildren();

        ok(s1.children.length, 2);

        s1.removeChildren();

        ok(s1.children.length, 1);

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

        ok(s1.children.length, s2.children.length, "both children arrays are the same length");
        deepEqual(s1.children, s2.children, "both children arrays are the same");

        s2.removeChildren();
        s1.removeChildren();

        ok(s1.children.length, s2.children.length, "after 1 removal, both children arrays are the same length");
        deepEqual(s1.children, s2.children, "after 1 removal, both children arrays are the same");
    });

    test("Checking for Grandchildren", function () {
        var s1 =  new Shape({ 
            vertices: new Shape(Shape.sphere()).toRawTriangleArray(),
            children: [ new Shape({ 
                vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
                color: { r: 0, g: 0, b: 1.0 },
                axis: { x: 1.0, y: 1.0, z: 1.0 },
                children: [ new Shape({ 
                    vertices: new Shape(Shape.cube()).toRawTriangleArray(),
                    color: { r: 1.0, g: 0, b: 1.0 },
                    axis: { x: 1.0, y: 1.0, z: 1.0 }
                })]
            })]
        })
        
        s1.addChildren(new Shape({
            vertices: new Shape(Shape.sphere()).toRawTriangleArray()
        }));

        ok(s1.children.length, 2, "children");

        ok(s1.children[0].children.length, 1, "grandkids");

        s1.children[0].addChildren(new Shape({
            vertices: new Shape(Shape.cube()).toRawTriangleArray()
        }));

        ok(s1.children[0].children.length, 2, "more grandkids");

        s1.removeChildren();

        ok(s1.children.length, 2, "-1 child");

        s1.children[0].removeChildren();

        ok(s1.children[0].children.length, 2, "-1 grandkid");

    });
});
