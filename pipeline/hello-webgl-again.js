/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {
    /*
     * This code does not really belong here: it should live
     * in a separate library of matrix and transformation
     * functions.  It is here only to show you how matrices
     * can be used with GLSL.
     *
     * Based on the original glRotate reference:
     *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
     */

    // Grab the WebGL rendering context.
    var gl = GLSLUtilities.getGL(canvas);
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

    // Build the objects to display.
    var objectsToDraw = [

        new Shape({ 
            color: { r: 1.0, g: 0, b: 0.5 },
            vertices: new Shape(Shape.cube()).toRawLineArray(),
            //axis: { x: 1.0, y: 1.0, z: 1.0},
            scale: {sx: 2.0, sy: 2.0, sz: 2.0},
            rotate: {angle: Math.PI, rx: 5, ry: 10, rz: -10},
            translate: {tx: 4, ty: 0, tz: -10},
            mode: gl.LINES
        }),

         new Shape({ 
            color: { r: 1.0, g: 0, b: 0.5 },
            vertices: new Shape(Shape.icosahedron()).toRawLineArray(),
            axis: { x: 1.0, y: 1.0, z: 1.0},
            //scale: {sx: 2.0, sy: 2.0, sz: 2.0},
            translate: {tx: -6, ty: 0, tz: -10},
            mode: gl.LINES
        }),

        new Shape({ 
            vertices: new Shape(Shape.sphere()).toRawTriangleArray(),
            color: { r: 0, g: 1.0, b: 0.4 },
            mode: gl.LINES,
            axis: { x: 0.0, y: 0.0, z: 1.0 },
            scale: {sx: 0.5, sy: 0.5, sz: 0.5},
            // JD: Note, something wrong with rotate even if angle = 0.0. Look more closely
            //     at the matrix and the code.
            rotate: {angle: 0, rx: 0.0, ry: 1.0, rz: 0.0},
            translate: {tx: 0, ty: 0, tz: -10},

            // JD: Children do not appear inside viewing volume because the code does not
            //     (yet) propagate the parent's transform onto the children. Thus, the
            //     translate being done above, which is necessary to place the sphere
            //     inside the viewing volume, is not being applied to the children.
            //
            //     As an experiment, you can temporarily give the children a translate
            //     property. See what happens. After that, you need to implement the
            //     propagation of the parent transform to its children.
            children: [ new Shape({ 
                vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
                color: { r: 0, g: 0, b: 1.0 },
                mode: gl.TRIANGLES,
                // axis: { x: 1.0, y: 1.0, z: 1.0 },
                // rotate: {angle: Math.PI/4, rx: 0, ry: 0, rz: 10},
                //translate: {tx: 0, ty: 2, tz: -10},
                children: [ new Shape({ 
                    vertices: new Shape(Shape.diamond()).toRawTriangleArray(),
                    color: { r: 1.0, g: 0, b: 1.0 },
                    mode: gl.TRIANGLES,
                    //translate: {tx: 0, ty: 2, tz: -10},
                    //axis: { x: 1.0, y: 1.0, z: 1.0 },
                })]
            })]
        })
    ];

    // Pass the vertices to WebGL.
    var passVertices = function (objectsToDraw) {
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (var j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            } 
            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,objectsToDraw[i].colors);

            if (objectsToDraw[i].children.length > 0) {
                passVertices(objectsToDraw[i].children);
            }
        }
    };

    // Initialize the shaders.
    var abort = false;
    var shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    var vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    var vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    
    //matrices
    var rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    var scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");
    var translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    var orthogonalMatrix = gl.getUniformLocation(shaderProgram, "orthogonalMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var instanceMatrix = gl.getUniformLocation(shaderProgram, "instanceMatrix");
    var modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    
    // Set up the scale matrix.
    gl.uniformMatrix4fv(scaleMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix.getScaleMatrix(1.0, 1.0, 1.0).convertForWebGL()));

    // Set up the transformation/translation matrix.
    gl.uniformMatrix4fv(translationMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix.getTranslationMatrix(0, 0, 0).convertForWebGL()));

    // Set up the perspective (frustum) projection matrix. 
    //r, l, t, b, f, n
    gl.uniformMatrix4fv(projectionMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix.getPerspectiveProjectionMatrix(4, -4, 2, -2, 1000, 5).convertForWebGL()));

    /*
     * Displays an individual object.
     */
    var drawObject = function (object) {
            // Set the varying colors.
            gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
            gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

            gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(object.rotate ?
                Matrix.getRotationMatrix(currentRotation, object.rotate.rx, object.rotate.ry, object.rotate.rz).elements : 
                new Matrix().elements
            ));

            instanceMatrix = new Matrix();

            instanceMatrix = instanceMatrix.multiply(
                Matrix.getTranslationMatrix(
                    object.translate.tx, 
                    object.translate.ty, 
                    object.translate.tz
                ).multiply(
                    Matrix.getScaleMatrix(
                        object.scale.sx, 
                        object.scale.sy, 
                        object.scale.sz
                    ).multiply(
                        Matrix.getRotationMatrix(
                            object.rotate.angle, 
                            object.rotate.rx, 
                            object.rotate.ry, 
                            object.rotate.rz
                        )
                    )
                )
            );
            
            gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "modelViewMatrix"),
                gl.FALSE,
                new Float32Array(instanceMatrix.convertForWebGL())
            );

            // Set the varying vertex coordinates.
            gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
            gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(object.mode, 0, object.vertices.length / 3);

            if(object.children.length > 0){
                for (i = 0; i < object.children.length; i++) {
                    drawObject(object.children[i]);
                }
            }       
    };

    /*
     * Displays the scene.
     */
    var drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        // gl.uniformMatrix4fv(
        //     rotationMatrix, 
        //     gl.FALSE, 
        //     new Float32Array(Matrix.getRotationMatrix(currentRotation, 0, 1, 0));

        // Display the objects.
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // gl.uniformMatrix4fv(orthogonalMatrix, gl.FALSE, new Float32Array(Matrix.getOrthogonalMatrix(
    //     -2 * (canvas.width / canvas.height),
    //     2 * (canvas.width / canvas.height),
    //     -2,
    //     2,
    //     -10,
    //     10
    // ).convertForWebGL()));
    
    passVertices(objectsToDraw);
    /*
     * Animates the scene.
     */
    var animationActive = false;
    var currentRotation = 0.0;
    var previousTimestamp = null;


    var advanceScene = function (timestamp) {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        currentRotation += 0.033 * progress;
        drawScene();
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("hello-webgl")));
