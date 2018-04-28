"use strict";
/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
var Matrix_1 = require("./Matrix");
/**
 * LU Decomposition
 * Structure to access L, U and piv.
 * @param  {Matrix} A Rectangular matrix
 * @class
 */
var LUDecomposition = (function () {
    function LUDecomposition(A) {
        this.LU = null;
        this.m = 0;
        this.n = 0;
        this.pivsign = 0;
        this.piv = null;
        this.LU = A.getArrayCopy();
        this.m = A.getRowDimension();
        this.n = A.getColumnDimension();
        this.piv = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (var i = 0; i < this.m; i++) {
            this.piv[i] = i;
        }
        ;
        this.pivsign = 1;
        var LUrowi;
        var LUcolj = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (var j = 0; j < this.n; j++) {
            for (var i = 0; i < this.m; i++) {
                LUcolj[i] = this.LU[i][j];
            }
            ;
            for (var i = 0; i < this.m; i++) {
                LUrowi = this.LU[i];
                var kmax = Math.min(i, j);
                var s = 0.0;
                for (var k = 0; k < kmax; k++) {
                    s += LUrowi[k] * LUcolj[k];
                }
                ;
                LUrowi[j] = LUcolj[i] -= s;
            }
            ;
            var p = j;
            for (var i = j + 1; i < this.m; i++) {
                if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
                    p = i;
                }
            }
            ;
            if (p !== j) {
                for (var k_1 = 0; k_1 < this.n; k_1++) {
                    var t = this.LU[p][k_1];
                    this.LU[p][k_1] = this.LU[j][k_1];
                    this.LU[j][k_1] = t;
                }
                ;
                var k = this.piv[p];
                this.piv[p] = this.piv[j];
                this.piv[j] = k;
                this.pivsign = -this.pivsign;
            }
            if ((function (lhs, rhs) { return lhs && rhs; })(j < this.m, this.LU[j][j] !== 0.0)) {
                for (var i = j + 1; i < this.m; i++) {
                    this.LU[i][j] /= this.LU[j][j];
                }
                ;
            }
        }
        ;
    }
    /**
     * Is the matrix nonsingular?
     * @return     {boolean} true if U, and hence A, is nonsingular.
     */
    LUDecomposition.prototype.isNonsingular = function () {
        for (var j = 0; j < this.n; j++) {
            if (this.LU[j][j] === 0)
                return false;
        }
        ;
        return true;
    };
    /**
     * Return lower triangular factor
     * @return     {Matrix} L
     */
    LUDecomposition.prototype.getL = function () {
        var X = new Matrix_1.Matrix(this.m, this.n);
        var L = X.getArray();
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                if (i > j) {
                    L[i][j] = this.LU[i][j];
                }
                else if (i === j) {
                    L[i][j] = 1.0;
                }
                else {
                    L[i][j] = 0.0;
                }
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Return upper triangular factor
     * @return     {Matrix} U
     */
    LUDecomposition.prototype.getU = function () {
        var X = new Matrix_1.Matrix(this.n, this.n);
        var U = X.getArray();
        for (var i = 0; i < this.n; i++) {
            for (var j = 0; j < this.n; j++) {
                if (i <= j) {
                    U[i][j] = this.LU[i][j];
                }
                else {
                    U[i][j] = 0.0;
                }
            }
            ;
        }
        ;
        return X;
    };
    /**
     * Return pivot permutation vector
     * @return     {Array} piv
     */
    LUDecomposition.prototype.getPivot = function () {
        var p = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (var i = 0; i < this.m; i++) {
            p[i] = this.piv[i];
        }
        ;
        return p;
    };
    /**
     * Return pivot permutation vector as a one-dimensional double array
     * @return     {Array} (double) piv
     */
    LUDecomposition.prototype.getDoublePivot = function () {
        var vals = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (var i = 0; i < this.m; i++) {
            vals[i] = this.piv[i];
        }
        ;
        return vals;
    };
    /**
     * Determinant
     * @return     {number} det(A)
     * @exception  IllegalArgumentException  Matrix must be square
     */
    LUDecomposition.prototype.det = function () {
        if (this.m !== this.n) {
            throw Object.defineProperty(new Error("Matrix must be square."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        var d = this.pivsign;
        for (var j = 0; j < this.n; j++) {
            d *= this.LU[j][j];
        }
        ;
        return d;
    };
    /**
     * Solve A*X = B
     * @param  {Matrix} B   A Matrix with as many rows as A and any number of columns.
     * @return     {Matrix} X so that L*U*X = B(piv,:)
     * @exception  IllegalArgumentException Matrix row dimensions must agree.
     * @exception  RuntimeException  Matrix is singular.
     */
    LUDecomposition.prototype.solve = function (B) {
        if (B.getRowDimension() !== this.m) {
            throw Object.defineProperty(new Error("Matrix row dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        if (!this.isNonsingular()) {
            throw Object.defineProperty(new Error("Matrix is singular."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        var nx = B.getColumnDimension();
        var Xmat = B.getMatrix$int_A$int$int(this.piv, 0, nx - 1);
        var X = Xmat.getArray();
        for (var k = 0; k < this.n; k++) {
            for (var i = k + 1; i < this.n; i++) {
                for (var j = 0; j < nx; j++) {
                    X[i][j] -= X[k][j] * this.LU[i][k];
                }
                ;
            }
            ;
        }
        ;
        for (var k = this.n - 1; k >= 0; k--) {
            for (var j = 0; j < nx; j++) {
                X[k][j] /= this.LU[k][k];
            }
            ;
            for (var i = 0; i < k; i++) {
                for (var j = 0; j < nx; j++) {
                    X[i][j] -= X[k][j] * this.LU[i][k];
                }
                ;
            }
            ;
        }
        ;
        return Xmat;
    };
    return LUDecomposition;
}());
LUDecomposition.serialVersionUID = 1;
exports.LUDecomposition = LUDecomposition;
LUDecomposition["__class"] = "Jama.LUDecomposition";
LUDecomposition["__interfaces"] = ["java.io.Serializable"];
