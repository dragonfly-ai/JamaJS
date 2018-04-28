"use strict";
/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
var Maths_1 = require("./util/Maths");
var SingularValueDecomposition_1 = require("./SingularValueDecomposition");
var LUDecomposition_1 = require("./LUDecomposition");
var QRDecomposition_1 = require("./QRDecomposition");
var CholeskyDecomposition_1 = require("./CholeskyDecomposition");
var EigenvalueDecomposition_1 = require("./EigenvalueDecomposition");
/**
 * Construct an m-by-n constant matrix.
 * @param {number} m    Number of rows.
 * @param {number} n    Number of colums.
 * @param {number} s    Fill the matrix with this scalar value.
 * @class
 * @author The MathWorks, Inc. and the National Institute of Standards and Technology.
 */
var Matrix = (function () {
    function Matrix(A, m, n) {
        var _this = this;
        if (((A != null && A instanceof Array && (A.length == 0 || A[0] == null || A[0] instanceof Array)) || A === null) && ((typeof m === 'number') || m === null) && ((typeof n === 'number') || n === null)) {
            var __args = Array.prototype.slice.call(arguments);
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (function () {
                _this.A = A;
                _this.m = m;
                _this.n = n;
            })();
        }
        else if (((typeof A === 'number') || A === null) && ((typeof m === 'number') || m === null) && ((typeof n === 'number') || n === null)) {
            var __args = Array.prototype.slice.call(arguments);
            var m_1 = __args[0];
            var n_1 = __args[1];
            var s_1 = __args[2];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (function () {
                _this.m = m_1;
                _this.n = n_1;
                _this.A = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m_1, n_1]);
                for (var i = 0; i < m_1; i++) {
                    for (var j = 0; j < n_1; j++) {
                        _this.A[i][j] = s_1;
                    }
                    ;
                }
                ;
            })();
        }
        else if (((A != null && A instanceof Array && (A.length == 0 || A[0] == null || (typeof A[0] === 'number'))) || A === null) && ((typeof m === 'number') || m === null) && n === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            var vals_1 = __args[0];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (function () {
                _this.m = m;
                _this.n = (m !== 0 ? (vals_1.length / m | 0) : 0);
                if (m * _this.n !== vals_1.length) {
                    throw Object.defineProperty(new Error("Array length must be a multiple of m."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                }
                _this.A = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m, _this.n]);
                for (var i = 0; i < m; i++) {
                    for (var j = 0; j < _this.n; j++) {
                        _this.A[i][j] = vals_1[i + j * m];
                    }
                    ;
                }
                ;
            })();
        }
        else if (((typeof A === 'number') || A === null) && ((typeof m === 'number') || m === null) && n === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            var m_2 = __args[0];
            var n_2 = __args[1];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (function () {
                _this.m = m_2;
                _this.n = n_2;
                _this.A = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m_2, n_2]);
            })();
        }
        else if (((A != null && A instanceof Array && (A.length == 0 || A[0] == null || A[0] instanceof Array)) || A === null) && m === undefined && n === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (function () {
                _this.m = A.length;
                _this.n = A[0].length;
                for (var i = 0; i < _this.m; i++) {
                    if (A[i].length !== _this.n) {
                        throw Object.defineProperty(new Error("All rows must have the same length."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                    }
                }
                ;
                _this.A = A;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Construct a matrix from a copy of a 2-D array.
     * @param {Array} A    Two-dimensional array of doubles.
     * @exception  IllegalArgumentException All rows must have the same length
     * @return {Matrix}
     */
    Matrix.constructWithCopy = function (A) {
        var m = A.length;
        var n = A[0].length;
        var X = new Matrix(m, n);
        var C = X.getArray();
        for (var i = 0; i < m; i++) {
            if (A[i].length !== n) {
                throw Object.defineProperty(new Error("All rows must have the same length."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
            }
            for (var j = 0; j < n; j++) {
                C[i][j] = A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Make a deep copy of a matrix
     * @return {Matrix}
     */
    Matrix.prototype.copy = function () {
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Clone the Matrix object.
     * @return {*}
     */
    Matrix.prototype.clone = function () {
        return this.copy();
    };
    /**
     * Access the internal two-dimensional array.
     * @return     {Array} Pointer to the two-dimensional array of matrix elements.
     */
    Matrix.prototype.getArray = function () {
        return this.A;
    };
    /**
     * Copy the internal two-dimensional array.
     * @return     {Array} Two-dimensional array copy of matrix elements.
     */
    Matrix.prototype.getArrayCopy = function () {
        var C = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.m, this.n]);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j];
            }
            ;
        }
        ;
        return C;
    };
    /**
     * Make a one-dimensional column packed copy of the internal array.
     * @return     {Array} Matrix elements packed in a one-dimensional array by columns.
     */
    Matrix.prototype.getColumnPackedCopy = function () {
        var vals = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.m * this.n);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                vals[i + j * this.m] = this.A[i][j];
            }
            ;
        }
        ;
        return vals;
    };
    /**
     * Make a one-dimensional row packed copy of the internal array.
     * @return     {Array} Matrix elements packed in a one-dimensional array by rows.
     */
    Matrix.prototype.getRowPackedCopy = function () {
        var vals = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.m * this.n);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                vals[i * this.n + j] = this.A[i][j];
            }
            ;
        }
        ;
        return vals;
    };
    /**
     * Get row dimension.
     * @return     {number} m, the number of rows.
     */
    Matrix.prototype.getRowDimension = function () {
        return this.m;
    };
    /**
     * Get column dimension.
     * @return     {number} n, the number of columns.
     */
    Matrix.prototype.getColumnDimension = function () {
        return this.n;
    };
    /**
     * Get a single element.
     * @param {number} i    Row index.
     * @param {number} j    Column index.
     * @return     {number} A(i,j)
     * @exception  ArrayIndexOutOfBoundsException
     */
    Matrix.prototype.get = function (i, j) {
        return this.A[i][j];
    };
    Matrix.prototype.getMatrix$int$int$int$int = function (i0, i1, j0, j1) {
        var X = new Matrix(i1 - i0 + 1, j1 - j0 + 1);
        var B = X.getArray();
        try {
            for (var i = i0; i <= i1; i++) {
                for (var j = j0; j <= j1; j++) {
                    B[i - i0][j - j0] = this.A[i][j];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    };
    /**
     * Get a submatrix.
     * @param {number} i0   Initial row index
     * @param {number} i1   Final row index
     * @param {number} j0   Initial column index
     * @param {number} j1   Final column index
     * @return     {Matrix} A(i0:i1,j0:j1)
     * @exception  ArrayIndexOutOfBoundsException Submatrix indices
     */
    Matrix.prototype.getMatrix = function (i0, i1, j0, j1) {
        if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && ((typeof j1 === 'number') || j1 === null)) {
            return this.getMatrix$int$int$int$int(i0, i1, j0, j1);
        }
        else if (((i0 != null && i0 instanceof Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && j1 === undefined) {
            return this.getMatrix$int_A$int$int(i0, i1, j0);
        }
        else if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((j0 != null && j0 instanceof Array && (j0.length == 0 || j0[0] == null || (typeof j0[0] === 'number'))) || j0 === null) && j1 === undefined) {
            return this.getMatrix$int$int$int_A(i0, i1, j0);
        }
        else if (((i0 != null && i0 instanceof Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((i1 != null && i1 instanceof Array && (i1.length == 0 || i1[0] == null || (typeof i1[0] === 'number'))) || i1 === null) && j0 === undefined && j1 === undefined) {
            return this.getMatrix$int_A$int_A(i0, i1);
        }
        else
            throw new Error('invalid overload');
    };
    Matrix.prototype.getMatrix$int_A$int_A = function (r, c) {
        var X = new Matrix(r.length, c.length);
        var B = X.getArray();
        try {
            for (var i = 0; i < r.length; i++) {
                for (var j = 0; j < c.length; j++) {
                    B[i][j] = this.A[r[i]][c[j]];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    };
    Matrix.prototype.getMatrix$int$int$int_A = function (i0, i1, c) {
        var X = new Matrix(i1 - i0 + 1, c.length);
        var B = X.getArray();
        try {
            for (var i = i0; i <= i1; i++) {
                for (var j = 0; j < c.length; j++) {
                    B[i - i0][j] = this.A[i][c[j]];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    };
    Matrix.prototype.getMatrix$int_A$int$int = function (r, j0, j1) {
        var X = new Matrix(r.length, j1 - j0 + 1);
        var B = X.getArray();
        try {
            for (var i = 0; i < r.length; i++) {
                for (var j = j0; j <= j1; j++) {
                    B[i][j - j0] = this.A[r[i]][j];
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
        return X;
    };
    /**
     * Set a single element.
     * @param {number} i    Row index.
     * @param {number} j    Column index.
     * @param {number} s    A(i,j).
     * @exception  ArrayIndexOutOfBoundsException
     */
    Matrix.prototype.set = function (i, j, s) {
        this.A[i][j] = s;
    };
    Matrix.prototype.setMatrix$int$int$int$int$Jama_Matrix = function (i0, i1, j0, j1, X) {
        try {
            for (var i = i0; i <= i1; i++) {
                for (var j = j0; j <= j1; j++) {
                    this.A[i][j] = X.get(i - i0, j - j0);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    };
    /**
     * Set a submatrix.
     * @param {number} i0   Initial row index
     * @param {number} i1   Final row index
     * @param {number} j0   Initial column index
     * @param {number} j1   Final column index
     * @param {Matrix} X    A(i0:i1,j0:j1)
     * @exception  ArrayIndexOutOfBoundsException Submatrix indices
     */
    Matrix.prototype.setMatrix = function (i0, i1, j0, j1, X) {
        if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && ((typeof j1 === 'number') || j1 === null) && ((X != null && X instanceof Matrix) || X === null)) {
            return this.setMatrix$int$int$int$int$Jama_Matrix(i0, i1, j0, j1, X);
        }
        else if (((i0 != null && i0 instanceof Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((typeof j0 === 'number') || j0 === null) && ((j1 != null && j1 instanceof Matrix) || j1 === null) && X === undefined) {
            return this.setMatrix$int_A$int$int$Jama_Matrix(i0, i1, j0, j1);
        }
        else if (((typeof i0 === 'number') || i0 === null) && ((typeof i1 === 'number') || i1 === null) && ((j0 != null && j0 instanceof Array && (j0.length == 0 || j0[0] == null || (typeof j0[0] === 'number'))) || j0 === null) && ((j1 != null && j1 instanceof Matrix) || j1 === null) && X === undefined) {
            return this.setMatrix$int$int$int_A$Jama_Matrix(i0, i1, j0, j1);
        }
        else if (((i0 != null && i0 instanceof Array && (i0.length == 0 || i0[0] == null || (typeof i0[0] === 'number'))) || i0 === null) && ((i1 != null && i1 instanceof Array && (i1.length == 0 || i1[0] == null || (typeof i1[0] === 'number'))) || i1 === null) && ((j0 != null && j0 instanceof Matrix) || j0 === null) && j1 === undefined && X === undefined) {
            return this.setMatrix$int_A$int_A$Jama_Matrix(i0, i1, j0);
        }
        else
            throw new Error('invalid overload');
    };
    Matrix.prototype.setMatrix$int_A$int_A$Jama_Matrix = function (r, c, X) {
        try {
            for (var i = 0; i < r.length; i++) {
                for (var j = 0; j < c.length; j++) {
                    this.A[r[i]][c[j]] = X.get(i, j);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    };
    Matrix.prototype.setMatrix$int_A$int$int$Jama_Matrix = function (r, j0, j1, X) {
        try {
            for (var i = 0; i < r.length; i++) {
                for (var j = j0; j <= j1; j++) {
                    this.A[r[i]][j] = X.get(i, j - j0);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    };
    Matrix.prototype.setMatrix$int$int$int_A$Jama_Matrix = function (i0, i1, c, X) {
        try {
            for (var i = i0; i <= i1; i++) {
                for (var j = 0; j < c.length; j++) {
                    this.A[i][c[j]] = X.get(i - i0, j);
                }
                ;
            }
            ;
        }
        catch (e) {
            throw Object.defineProperty(new Error("Submatrix indices"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IndexOutOfBoundsException', 'java.lang.Object', 'java.lang.ArrayIndexOutOfBoundsException', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        ;
    };
    /**
     * Matrix transpose.
     * @return    {Matrix} A'
     */
    Matrix.prototype.transpose = function () {
        var X = new Matrix(this.n, this.m);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[j][i] = this.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * One norm
     * @return    {number} maximum column sum.
     */
    Matrix.prototype.norm1 = function () {
        var f = 0;
        for (var j = 0; j < this.n; j++) {
            var s = 0;
            for (var i = 0; i < this.m; i++) {
                s += Math.abs(this.A[i][j]);
            }
            ;
            f = Math.max(f, s);
        }
        ;
        return f;
    };
    /**
     * Two norm
     * @return    {number} maximum singular value.
     */
    Matrix.prototype.norm2 = function () {
        return (new SingularValueDecomposition_1.SingularValueDecomposition(this).norm2());
    };
    /**
     * Infinity norm
     * @return    {number} maximum row sum.
     */
    Matrix.prototype.normInf = function () {
        var f = 0;
        for (var i = 0; i < this.m; i++) {
            var s = 0;
            for (var j = 0; j < this.n; j++) {
                s += Math.abs(this.A[i][j]);
            }
            ;
            f = Math.max(f, s);
        }
        ;
        return f;
    };
    /**
     * Frobenius norm
     * @return    {number} sqrt of sum of squares of all elements.
     */
    Matrix.prototype.normF = function () {
        var f = 0;
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                f = Maths_1.Maths.hypot(f, this.A[i][j]);
            }
            ;
        }
        ;
        return f;
    };
    /**
     * Unary minus
     * @return    {Matrix} -A
     */
    Matrix.prototype.uminus = function () {
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = -this.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * C = A + B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A + B
     */
    Matrix.prototype.plus = function (B) {
        this.checkMatrixDimensions(B);
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] + B.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * A = A + B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A + B
     */
    Matrix.prototype.plusEquals = function (B) {
        this.checkMatrixDimensions(B);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] + B.A[i][j];
            }
            ;
        }
        ;
        return this;
    };
    /**
     * C = A - B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A - B
     */
    Matrix.prototype.minus = function (B) {
        this.checkMatrixDimensions(B);
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] - B.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * A = A - B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A - B
     */
    Matrix.prototype.minusEquals = function (B) {
        this.checkMatrixDimensions(B);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] - B.A[i][j];
            }
            ;
        }
        ;
        return this;
    };
    /**
     * Element-by-element multiplication, C = A.*B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.*B
     */
    Matrix.prototype.arrayTimes = function (B) {
        this.checkMatrixDimensions(B);
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] * B.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Element-by-element multiplication in place, A = A.*B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.*B
     */
    Matrix.prototype.arrayTimesEquals = function (B) {
        this.checkMatrixDimensions(B);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] * B.A[i][j];
            }
            ;
        }
        ;
        return this;
    };
    /**
     * Element-by-element right division, C = A./B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A./B
     */
    Matrix.prototype.arrayRightDivide = function (B) {
        this.checkMatrixDimensions(B);
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] / B.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Element-by-element right division in place, A = A./B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A./B
     */
    Matrix.prototype.arrayRightDivideEquals = function (B) {
        this.checkMatrixDimensions(B);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] / B.A[i][j];
            }
            ;
        }
        ;
        return this;
    };
    /**
     * Element-by-element left division, C = A.\B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.\B
     */
    Matrix.prototype.arrayLeftDivide = function (B) {
        this.checkMatrixDimensions(B);
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = B.A[i][j] / this.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Element-by-element left division in place, A = A.\B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.\B
     */
    Matrix.prototype.arrayLeftDivideEquals = function (B) {
        this.checkMatrixDimensions(B);
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                this.A[i][j] = B.A[i][j] / this.A[i][j];
            }
            ;
        }
        ;
        return this;
    };
    Matrix.prototype.times$double = function (s) {
        var X = new Matrix(this.m, this.n);
        var C = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                C[i][j] = s * this.A[i][j];
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Multiply a matrix by a scalar in place, A = s*A
     * @param {number} s    scalar
     * @return     {Matrix} replace A by s*A
     */
    Matrix.prototype.timesEquals = function (s) {
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                this.A[i][j] = s * this.A[i][j];
            }
            ;
        }
        ;
        return this;
    };
    Matrix.prototype.times$Jama_Matrix = function (B) {
        if (B.m !== this.n) {
            throw Object.defineProperty(new Error("Matrix inner dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        var X = new Matrix(this.m, B.n);
        var C = X.getArray();
        var Bcolj = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        for (var j = 0; j < B.n; j++) {
            for (var k = 0; k < this.n; k++) {
                Bcolj[k] = B.A[k][j];
            }
            ;
            for (var i = 0; i < this.m; i++) {
                var Arowi = this.A[i];
                var s = 0;
                for (var k = 0; k < this.n; k++) {
                    s += Arowi[k] * Bcolj[k];
                }
                ;
                C[i][j] = s;
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Linear algebraic matrix multiplication, A * B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} Matrix product, A * B
     * @exception  IllegalArgumentException Matrix inner dimensions must agree.
     */
    Matrix.prototype.times = function (B) {
        if (((B != null && B instanceof Matrix) || B === null)) {
            return this.times$Jama_Matrix(B);
        }
        else if (((typeof B === 'number') || B === null)) {
            return this.times$double(B);
        }
        else
            throw new Error('invalid overload');
    };
    /**
     * LU Decomposition
     * @return     {LUDecomposition} LUDecomposition
     * @see LUDecomposition
     */
    Matrix.prototype.lu = function () {
        return new LUDecomposition_1.LUDecomposition(this);
    };
    /**
     * QR Decomposition
     * @return     {QRDecomposition} QRDecomposition
     * @see QRDecomposition
     */
    Matrix.prototype.qr = function () {
        return new QRDecomposition_1.QRDecomposition(this);
    };
    /**
     * Cholesky Decomposition
     * @return     {CholeskyDecomposition} CholeskyDecomposition
     * @see CholeskyDecomposition
     */
    Matrix.prototype.chol = function () {
        return new CholeskyDecomposition_1.CholeskyDecomposition(this);
    };
    /**
     * Singular Value Decomposition
     * @return     {SingularValueDecomposition} SingularValueDecomposition
     * @see SingularValueDecomposition
     */
    Matrix.prototype.svd = function () {
        return new SingularValueDecomposition_1.SingularValueDecomposition(this);
    };
    /**
     * Eigenvalue Decomposition
     * @return     {EigenvalueDecomposition} EigenvalueDecomposition
     * @see EigenvalueDecomposition
     */
    Matrix.prototype.eig = function () {
        return new EigenvalueDecomposition_1.EigenvalueDecomposition(this);
    };
    /**
     * Solve A*X = B
     * @param {Matrix} B    right hand side
     * @return     {Matrix} solution if A is square, least squares solution otherwise
     */
    Matrix.prototype.solve = function (B) {
        return (this.m === this.n ? (new LUDecomposition_1.LUDecomposition(this)).solve(B) : (new QRDecomposition_1.QRDecomposition(this)).solve(B));
    };
    /**
     * Solve X*A = B, which is also A'*X' = B'
     * @param {Matrix} B    right hand side
     * @return     {Matrix} solution if A is square, least squares solution otherwise.
     */
    Matrix.prototype.solveTranspose = function (B) {
        return this.transpose().solve(B.transpose());
    };
    /**
     * Matrix inverse or pseudoinverse
     * @return     {Matrix} inverse(A) if A is square, pseudoinverse otherwise.
     */
    Matrix.prototype.inverse = function () {
        return this.solve(Matrix.identity(this.m, this.m));
    };
    /**
     * Matrix determinant
     * @return     {number} determinant
     */
    Matrix.prototype.det = function () {
        return new LUDecomposition_1.LUDecomposition(this).det();
    };
    /**
     * Matrix rank
     * @return     {number} effective numerical rank, obtained from SVD.
     */
    Matrix.prototype.rank = function () {
        return new SingularValueDecomposition_1.SingularValueDecomposition(this).rank();
    };
    /**
     * Matrix condition (2 norm)
     * @return     {number} ratio of largest to smallest singular value.
     */
    Matrix.prototype.cond = function () {
        return new SingularValueDecomposition_1.SingularValueDecomposition(this).cond();
    };
    /**
     * Matrix trace.
     * @return     {number} sum of the diagonal elements.
     */
    Matrix.prototype.trace = function () {
        var t = 0;
        for (var i = 0; i < Math.min(this.m, this.n); i++) {
            t += this.A[i][i];
        }
        ;
        return t;
    };
    /**
     * Generate matrix with random elements
     * @param {number} m    Number of rows.
     * @param {number} n    Number of colums.
     * @return     {Matrix} An m-by-n matrix with uniformly distributed random elements.
     */
    Matrix.random = function (m, n) {
        var A = new Matrix(m, n);
        var X = A.getArray();
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n; j++) {
                X[i][j] = Math.random();
            }
            ;
        }
        ;
        return A;
    };
    /**
     * Generate identity matrix
     * @param {number} m    Number of rows.
     * @param {number} n    Number of colums.
     * @return     {Matrix} An m-by-n matrix with ones on the diagonal and zeros elsewhere.
     */
    Matrix.identity = function (m, n) {
        var A = new Matrix(m, n);
        var X = A.getArray();
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < n; j++) {
                X[i][j] = (i === j ? 1.0 : 0.0);
            }
            ;
        }
        ;
        return A;
    };
    /**
     * Check if size(A) == size(B)
     * @param {Matrix} B
     * @private
     */
    /*private*/ Matrix.prototype.checkMatrixDimensions = function (B) {
        if (B.m !== this.m || B.n !== this.n) {
            throw Object.defineProperty(new Error("Matrix dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
    };
    return Matrix;
}());
Matrix.serialVersionUID = 1;
exports.Matrix = Matrix;
Matrix["__class"] = "Jama.Matrix";
Matrix["__interfaces"] = ["java.lang.Cloneable", "java.io.Serializable"];
