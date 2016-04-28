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
            vertices: new Shape(Shape.icosahedron()).toRawTriangleArray(),
            axis: { x: 1.0, y: 1.0, z: 1.0},
            //scale: {sx: 2.0, sy: 2.0, sz: 2.0},
            translate: {tx: -6, ty: 0, tz: -10},
            normals: new Shape(Shape.icosahedron()).toNormalArray(),
            mode: gl.TRIANGLES
        }),

        new Shape({ 
            color: { r: .75, g: 0.0, b: 0.5 },
            vertices: new Shape(Shape.cube()).toRawTriangleArray(),
            //axis: { x: 1.0, y: 1.0, z: 1.0},
            scale: {sx: 2.0, sy: 2.0, sz: 2.0},
            //rotate: {angle: Math.PI, rx: 5, ry: 10, rz: 0},
            translate: {tx: 4, ty: 1, tz: -10},
            normals: new Shape(Shape.cube()).toNormalArray(),
            mode: gl.TRIANGLES
        }),

        // new Shape({ 
        //     vertices: new Shape(Shape.sphere()).toRawTriangleArray(),
        //     color: { r: 0, g: 1.0, b: 0.4 },
        //     mode: gl.TRIANGLES,
        //     scale: {sx: 2, sy: 2, sz: 2},
        //     //rotate: {angle:  0.0, rx: 0.0, ry: 1.0, rz: 0.0},
        //     translate: {tx: 0.0, ty: 0.0, tz: -10},
        //     normals: new Shape(Shape.sphere()).toNormalArray(),
        //     // children: [
        //     //     new Shape({ 
        //     //     color: { r: 1.0, g: 0, b: 0.5 },
        //     //     vertices: new Shape(Shape.icosahedron()).toRawTriangleArray(),
        //     //     axis: { x: 1.0, y: 1.0, z: 1.0},
        //     //     scale: {sx: 1.5, sy: 1.5, sz: 1.5},
        //     //     normals: new Shape(Shape.icosahedron()).toNormalArray(),
        //     //     mode: gl.TRIANGLES
        //     //     })]
        // }),

        new Shape({ 
            vertices: new Shape(Shape.diamond()).toRawTriangleArray(),
            color: { r: 0, g: 0, b: 1.0 },
            mode: gl.TRIANGLES,
            axis: {x: 0, y: 0, z: 1},
            rotate: {rotate: Math.PI, rx: 5, ry: 5, rz: 0},
            translate: {tx: 4, ty: -2, tz: -10},
            normals: new Shape(Shape.diamond()).toNormalArray(),
            // children: [ new Shape({ 
            //     vertices: new Shape(Shape.cube()).toRawTriangleArray(),
            //     axis: {x: 0, y: 0, z: 0},
            //     color: { r: 1.0, g: 0, b: 1.0 },
            //     mode: gl.TRIANGLES,
            // })]
        }),

        // new Shape({ 
        //     vertices: new Shape(Shape.icosahedron()).toRawTriangleArray(),
        //     color: { r: 1.0, g: 0.0, b: 0.0 },

        //     // We make the specular reflection be white.
        //     // specularColor: { r: 1.0, g: 0.0, b: 1.0 },
        //     shininess: 16,

        //     // Like colors, one normal per vertex.  This can be simplified
        //     // with helper functions, of course.
        //     normals: new Shape(Shape.icosahedron()).toNormalArray(),
        //     mode: gl.TRIANGLES
        // }),
    ];

    // Pass the vertices to WebGL.
    var passVertices = function (objectsToDraw) {
        for (var i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            //Solid color
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

            // Specular colors.
            if (!objectsToDraw[i].specularColors) {
            // Future refactor: helper function to convert a single value or
            // array into an array of copies of itself.
                objectsToDraw[i].specularColors = [];
                for (var j = 0, maxj = objectsToDraw[i].vertices.length / 3; j < maxj; j += 1) {
                    objectsToDraw[i].specularColors = objectsToDraw[i].specularColors.concat(
                        objectsToDraw[i].specularColor.r,
                        objectsToDraw[i].specularColor.g,
                        objectsToDraw[i].specularColor.b
                    );
                }
            }
        
        objectsToDraw[i].specularBuffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].specularColors);

        // One more buffer: normals.
        objectsToDraw[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl, objectsToDraw[i].normals);
            
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
    var vertexDiffuseColor = gl.getAttribLocation(shaderProgram, "vertexDiffuseColor");
    gl.enableVertexAttribArray(vertexDiffuseColor);
    var vertexSpecularColor = gl.getAttribLocation(shaderProgram, "vertexSpecularColor");
    gl.enableVertexAttribArray(vertexSpecularColor);
    var normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    //matrices
    var rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    var orthogonalMatrix = gl.getUniformLocation(shaderProgram, "orthogonalMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var cameraMatrix = gl.getUniformLocation(shaderProgram, "cameraMatrix");

    //lighting variables
    var lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    var lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");
    var lightSpecular = gl.getUniformLocation(shaderProgram, "lightSpecular");
    var shininess = gl.getUniformLocation(shaderProgram, "shininess");

    gl.uniform4fv(lightPosition, [0, 150, 0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1, 1, 1]);
    gl.uniform3fv(lightSpecular, [1, 1, 1]);
    gl.uniform1f(gl.getUniformLocation(shaderProgram, "shininess"), 0);

    // Set up the perspective (frustum) projection matrix. 
    //r, l, t, b, f, n
    gl.uniformMatrix4fv(projectionMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix.getPerspectiveProjectionMatrix(4, -4, 2, -2, 1000, 5).convertForWebGL()));

    //set up camera matrix
    //px, py, pz, qx, qy, qz, upx, upy, upz 
    //vertical camera up (0,1,0)
     gl.uniformMatrix4fv(cameraMatrix,
        gl.FALSE,
        new Float32Array(Matrix.lookAt(0, 0, 10, 0, 0, 0, 0, 1, 0).convertForWebGL()));
    /*
     * Displays an individual object.
     */
    var drawObject = function (object, parentMatrix) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexDiffuseColor, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, object.specularBuffer);
        gl.vertexAttribPointer(vertexSpecularColor, 3, gl.FLOAT, false, 0, 0);

        // Set the shininess.
        gl.uniform1f(shininess, object.shininess);

        object.rotate.angle = currentRotation;

        var currentMatrix = getInstanceMatrix(object);

        if (parentMatrix) {
            currentMatrix = parentMatrix.multiply(currentMatrix);
        }

        gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "modelViewMatrix"),
            gl.FALSE,
            new Float32Array(currentMatrix.convertForWebGL())
        );

        // Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

       // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if(object.children.length > 0){
            for (var i = 0; i < object.children.length; i++) {
                drawObject(object.children[i], currentMatrix);
            }
        }       
    };

    var getInstanceMatrix = function(object) {
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
        return instanceMatrix;
    }

    /*
     * Displays the scene.
     */
    var drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      //set the rotation matrix
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
            Matrix.getRotationMatrix(0, 0, 1, 0).elements
        ));

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

    // Set up our one light source and its colors.
    gl.uniform4fv(lightPosition, [500.0, 1000.0, 100.0, 1.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightSpecular, [1.0, 1.0, 1.0]);

    
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

}(document.getElementById("shapeScene")));
