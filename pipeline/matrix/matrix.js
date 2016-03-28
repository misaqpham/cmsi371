var Matrix = (function () {
    // Define the constructor.
    var matrix = function () {
        this.elements = [].slice.call(arguments): 
            [ 1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1 ];
    },
    
        // A private method for checking dimensions,
        // throwing an exception when different.
        checkDimensions = function (m1, m2) {
            if (m1.dimensions() !== m2.dimensions()) {
                throw "Matrices have different dimensions";
            }
        };

    // Basic methods.
    matrix.prototype.dimensions = function () {
        return this.elements.length;
    };

    matrix.prototype.elements = function () {
        return this.elements;
    };


    matrix.prototype.multiply = function (matrix2) {
        var result = new Matrix(),
            column,
            row,
            total,
            max;

        checkDimensions(this, matrix2);

        for (row = 0, max = 4; row < max; row += 1) {
            for (column = 0, max = 4; column < 4; column +=1) {  
                total = 0;
                for (i = 0; i < 4; i++) {
                    total += this.elements[i + row * 4] * matrix2.elements[i * 4 + col];
                }
                result.elements[row * 4 + col] = sum;
            }
        }
        return result;
    };

    matrix.getScaleMatrix = function (sx, sy, sz) {
        var scale = new Matrix( sx, 0, 0, 0,
                                0, sy, 0, 0,
                                0, 0, sz, 0,
                                0, 0,  0, 1 );
        
        return scale;
    };

     matrix.getTranslationMatrix = function (tx, ty, tz) {
        var translation = new Matrix( 1, 0, 0, tx,
                                      0, 1, 0, ty,
                                      0, 0, 1, tz,
                                      0, 0, 0, 1 );

        return tranlation;
    };

    matrix.getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
        var s = Math.sin(angle * Math.PI / 180.0);
        var c = Math.cos(angle * Math.PI / 180.0);
        var oneMinusC = 1.0 - c;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // Now we can calculate the other terms.
        // "2" for "squared."
        var x2 = x * x;
        var y2 = y * y;
        var z2 = z * z;
        var xy = x * y;
        var yz = y * z;
        var xz = x * z;
        var xs = x * s;
        var ys = y * s;
        var zs = z * s;

        // GL expects its matrices in column major order.
        var rotation = new Matrix (
            (x2 * oneMinusC) + c,   (xy * oneMinusC) + zs,  (xz * oneMinusC) - ys,  0.0,
            (xy * oneMinusC) - zs,  (y2 * oneMinusC) + c,   (yz * oneMinusC) + xs,  0.0,
            (xz * oneMinusC) + ys,  (yz * oneMinusC) - xs,  (z2 * oneMinusC) + c,   0.0,
            0.0,                    0.0,                    0.0,                    1.0
        );

        return rotation;
    };

    matrix.getOrthogonalMatrix = function (r, l, t, b, f, n) {
        var orthogonal = new Matrix(  2/(r-l),  0,          0,          -((r+l)/(r-l)),
                                      0,        2/(t-b),    0,          -((t+b)/(t-b)),
                                      0,        0,          -2/(f-n),   -((f+n)/(f-n)),
                                      0,        0,          0,          1               
                                    );
        return orthogonal;
    };

    matrix.getPerspectiveProjectionMatrix = function (r, l, t, b, f, n) {
        var projection = new Matrix( (2*n)/(r-l),   0,              (r+l)/(r-l),        0,
                                      0,            (2*n)/(t-b),    (t+b)/(t-b),        0,
                                      0,            0,              -((f+n)/(f-n)),     (-2*n*f)/(f-n),
                                      0,            0,              -1,                 0               
                                    );
        return projection;
    };

    matrix.convertForWebGL = function () {
        var columnsForWebGL = [],
            i;

        for (i = 0; i<4; i++) {
            columnsForWebGL.push(this.elements(i), this.elements(i + 4), this.elements(i + 8), this.elements(i + 12))
        }

        return columnsForWebGL
    }

})();
