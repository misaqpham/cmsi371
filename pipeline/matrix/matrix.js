/*
 * This JavaScript file defines a Vector object and associated functions.
 * The object itself is returned as the result of a function, allowing us
 * to encapsulate its code and module variables.
 *
 * This module's approach is non-destructive: methods always return new
 * Vector objects, and never modify the operands.  This is a design choice.
 *
 * This module is designed for vectors of any number of dimensions.  The
 * implementations are generalized but not optimal for certain sizes of
 * vectors.  Specific Vector2D and Vector3D implementations can be much
 * more compact, while sacrificing generality.
 */
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
                throw "Matrixs have different dimensions";
            }
        };

    // Basic methods.
    matrix.prototype.dimensions = function () {
        return this.elements.length;
    };

    // Addition and subtraction.
    vector.prototype.add = function (v) {
        var result = new Vector(),
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, v);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] + v.elements[i];
        }

        return result;
    };

    vector.prototype.subtract = function (v) {
        var result = new Vector(),
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, v);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] - v.elements[i];
        }

        return result;
    };

    // Scalar multiplication and division.
    matrix.prototype.multiply = function (s) {
        var result = new Matrix(),
            column,
            row,
            total,
            max;

        for (row = 0, max = 4; row < max; row += 1) {
            for (column = 0, max = 4; column < 4; column +=1) {  
                total = 0;
                for (i = 0; i < 4; i++) {
                    total += this.elements[i + row * 4] * m.elements[i * 4 + col];
                }
                result.elements[row * 4 + col] = sum;
            }
        }
        return result;
    };

    vector.prototype.divide = function (s) {
        var result = new Vector(),
            i,
            max;

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result.elements[i] = this.elements[i] / s;
        }

        return result;
    };

    // Dot product.
    vector.prototype.dot = function (v) {
        var result = 0,
            i,
            max;

        // Dimensionality check.
        checkDimensions(this, v);

        for (i = 0, max = this.dimensions(); i < max; i += 1) {
            result += this.elements[i] * v.elements[i];
        }

        return result;
    };

    // Cross product.
    vector.prototype.cross = function (v) {
        // This method is for 3D vectors only.
        if (this.dimensions() !== 3 || v.dimensions() !== 3) {
            throw "Cross product is for 3D vectors only.";
        }

        // With 3D vectors, we can just return the result directly.
        return new Vector(
            (this.y() * v.z()) - (this.z() * v.y()),
            (this.z() * v.x()) - (this.x() * v.z()),
            (this.x() * v.y()) - (this.y() * v.x())
        );
    };

    // Magnitude and unit vector.
    vector.prototype.magnitude = function () {
        // Make use of the dot product.
        return Math.sqrt(this.dot(this));
    };

    vector.prototype.unit = function () {
        // At this point, we can leverage our more "primitive" methods.
        return this.divide(this.magnitude());
    };

    // Projection.
    vector.prototype.projection = function (v) {
        var unitv;

        // Dimensionality check.
        checkDimensions(this, v);

        // Plug and chug :)
        // The projection of u onto v is u dot the unit vector of v
        // times the unit vector of v.
        unitv = v.unit();
        return unitv.multiply(this.dot(unitv));
    };

    return vector;
})();
