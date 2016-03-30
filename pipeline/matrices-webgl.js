/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        animationActive = false,
        currentRotation = 0.0,
        currentInterval,
        modelViewMatrix,
        projectionMatrix,
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // State and function for performing animation.
        previousTimestamp,
        advanceScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,

        /*
         * This code does not really belong here: it should live
         * in a separate library of matrix and transformation
         * functions.  It is here only to show you how matrices
         * can be used with GLSL.
         *
         * Based on the original glRotate reference:
         *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
         */
        getRotationMatrix = function (angle, x, y, z) {
            // In production code, this function should be associated
            // with a matrix object with associated functions.
            var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
                s = Math.sin(angle * Math.PI / 180.0),
                c = Math.cos(angle * Math.PI / 180.0),
                oneMinusC = 1.0 - c,

                // We can't calculate this until we have normalized
                // the axis vector of rotation.
                x2, // "2" for "squared."
                y2,
                z2,
                xy,
                yz,
                xz,
                xs,
                ys,
                zs;

            // Normalize the axis vector of rotation.
            x /= axisLength;
            y /= axisLength;
            z /= axisLength;

            // *Now* we can calculate the other terms.
            x2 = x * x;
            y2 = y * y;
            z2 = z * z;
            xy = x * y;
            yz = y * z;
            xz = x * z;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            // GL expects its matrices in column major order.
            return [
                (x2 * oneMinusC) + c,
                (xy * oneMinusC) + zs,
                (xz * oneMinusC) - ys,
                0.0,

                (xy * oneMinusC) - zs,
                (y2 * oneMinusC) + c,
                (yz * oneMinusC) + xs,
                0.0,

                (xz * oneMinusC) + ys,
                (yz * oneMinusC) - xs,
                (z2 * oneMinusC) + c,
                0.0,

                0.0,
                0.0,
                0.0,
                1.0
            ];
        },

        /*
         * This is another function that really should reside in a
         * separate library.  But, because the creation of that library
         * is part of the student course work, we leave it here for
         * later refactoring and adaptation by students.
         */
        getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
            var width = right - left,
                height = top - bottom,
                depth = zFar - zNear;

            return [
                2.0 / width,
                0.0,
                0.0,
                0.0,

                0.0,
                2.0 / height,
                0.0,
                0.0,

                0.0,
                0.0,
                -2.0 / depth,
                0.0,

                -(right + left) / width,
                -(top + bottom) / height,
                -(zFar + zNear) / depth,
                1.0
            ];
        };

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.  Note how each object may come with a
    // rotation axis now.
    objectsToDraw = [
        // We move our original triangles a bit to accommodate a new addition
        // to the scene (yes, a translation will also do the trick, if it
        // where implemented in this program).
        {
            vertices: [].concat(
                [ -2.0, 0.0, 0.0 ],
                [ -1.5, 0.0, -0.75 ],
                [ -2.0, 0.5, 0.0 ]
            ),
            colors: [].concat(
                [ 1.0, 0.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 0.0, 1.0 ]
            ),
            mode: gl.TRIANGLES
        },

        {
            color: { r: 0.0, g: 1.0, b: 0 },
            vertices: [].concat(
                [ -1.75, 0.0, -0.5 ],
                [ -1.25, 0.0, -0.5 ],
                [ -1.75, 0.5, -0.5 ]
            ),
            mode: gl.TRIANGLES
        },

        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: [].concat(
                [ -2.25, 0.0, 0.5 ],
                [ -1.75, 0.0, 0.5 ],
                [ -2.25, 0.5, 0.5 ]
            ),
            mode: gl.TRIANGLES
        },

        {
            color: { r: 0.0, g: 0.0, b: 1.0 },
            vertices: [].concat(
                [ -1.0, -1.0, 0.75 ],
                [ -1.0, -0.1, -1.0 ],
                [ -0.1, -0.1, -1.0 ],
                [ -0.1, -1.0, 0.75 ]
            ),
            mode: gl.LINE_LOOP,
            axis: { x: 1.0, y: 0.0, z: 1.0 }
        },

        // {
        //     color: { r: 0.0, g: 0.5, b: 0.0 },
        //     vertices: Shapes.toRawLineArray(Shapes.sphere()),
        //     mode: gl.LINES,
        //     axis: { x: 0.0, y: 1.0, z: 1.0 }
        // },

        // Something that would have been clipped before.
        {
            vertices: [].concat(
                [ 3.0, 1.5, 0.0 ],
                [ 2.0, -1.5, 0.0 ],
                [ 4.0, -1.5, 0.0 ]
            ),
            colors: [].concat(
                [ 1.0, 0.5, 0.0 ],
                [ 0.0, 0.0, 0.5 ],
                [ 0.5, 0.75, 0.5 ]
            ),
            mode: gl.TRIANGLES,
            axis: { x: -0.5, y: 1.0, z: 0.0 }
        },

        // Show off the new shape.
        {
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
            color: { r: 1.0, g: 0, b: 0.5 },
            mode: gl.TRIANGLES,
            axis: { x: 7.0, y: 1.0, z: 1.0 },
            children: [{ 
                vertices: new Shape(Shape.sphere()).toRawTriangleArray(),
                color: { r: 0, g: 0, b: 1.0 },
                mode: gl.TRIANGLES,
                axis: { x: 7.0, y: 1.0, z: 1.0 }
                }]
        }

        // {
        //     vertices: new Shape(Shape.diamond()).toRawTriangleArray(),
        //     // 12 triangles in all.
            
        //     color: { r: 1.0, g: 0, b: 0.5 },
        //     mode: gl.TRIANGLES,
        //     axis: { x: 7.0, y: 1.0, z: 1.0 }
        // }

        // {
        //     vertices: new Shape(Shape.cube()).toRawTriangleArray(),
        //     // 12 triangles in all.
            
        //     color: { r: 1.0, g: 0, b: 0.5 },
        //     mode: gl.TRIANGLES,
        //     axis: { x: 7.0, y: 1.0, z: 1.0 }
        // }
    ];

    // Pass the vertices to WebGL.
    var passVertices = function () {
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            } else if (objectsToDraw[i].hasOwnProperty(children)) {
                    passVertices(objectsToDraw[i].children);
            }

            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);
        }
    }

}(document.getElementById("matrices-webgl")));
