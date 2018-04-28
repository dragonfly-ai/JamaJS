/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
import { Maths } from './util/Maths';
import { SingularValueDecomposition } from './SingularValueDecomposition';
import { LUDecomposition } from './LUDecomposition';
import { QRDecomposition } from './QRDecomposition';
import { CholeskyDecomposition } from './CholeskyDecomposition';
import { EigenvalueDecomposition } from './EigenvalueDecomposition';
/**
 * Construct an m-by-n constant matrix.
 * @param {number} m    Number of rows.
 * @param {number} n    Number of colums.
 * @param {number} s    Fill the matrix with this scalar value.
 * @class
 * @author The MathWorks, Inc. and the National Institute of Standards and Technology.
 */
export class Matrix {
    constructor(A, m, n) {
        if (((A != null && A instanceof Array && (A.length == 0 || A[0] == null || A[0] instanceof Array)) || A === null) && ((typeof m === 'number') || m === null) && ((typeof n === 'number') || n === null)) {
            let __args = Array.prototype.slice.call(arguments);
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.A = A;
                this.m = m;
                this.n = n;
            })();
        }
        else if (((typeof A === 'number') || A === null) && ((typeof m === 'number') || m === null) && ((typeof n === 'number') || n === null)) {
            let __args = Array.prototype.slice.call(arguments);
            let m = __args[0];
            let n = __args[1];
            let s = __args[2];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.m = m;
                this.n = n;
                this.A = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m, n]);
                for (let i = 0; i < m; i++) {
                    for (let j = 0; j < n; j++) {
                        this.A[i][j] = s;
                    }
                    ;
                }
                ;
            })();
        }
        else if (((A != null && A instanceof Array && (A.length == 0 || A[0] == null || (typeof A[0] === 'number'))) || A === null) && ((typeof m === 'number') || m === null) && n === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            let vals = __args[0];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.m = m;
                this.n = (m !== 0 ? (vals.length / m | 0) : 0);
                if (m * this.n !== vals.length) {
                    throw Object.defineProperty(new Error("Array length must be a multiple of m."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                }
                this.A = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m, this.n]);
                for (let i = 0; i < m; i++) {
                    for (let j = 0; j < this.n; j++) {
                        this.A[i][j] = vals[i + j * m];
                    }
                    ;
                }
                ;
            })();
        }
        else if (((typeof A === 'number') || A === null) && ((typeof m === 'number') || m === null) && n === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            let m = __args[0];
            let n = __args[1];
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.m = m;
                this.n = n;
                this.A = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
                    return 0;
                }
                else {
                    let array = [];
                    for (let i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                } }; return allocate(dims); })([m, n]);
            })();
        }
        else if (((A != null && A instanceof Array && (A.length == 0 || A[0] == null || A[0] instanceof Array)) || A === null) && m === undefined && n === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            this.A = null;
            this.m = 0;
            this.n = 0;
            this.A = null;
            this.m = 0;
            this.n = 0;
            (() => {
                this.m = A.length;
                this.n = A[0].length;
                for (let i = 0; i < this.m; i++) {
                    if (A[i].length !== this.n) {
                        throw Object.defineProperty(new Error("All rows must have the same length."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                    }
                }
                ;
                this.A = A;
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
    static constructWithCopy(A) {
        let m = A.length;
        let n = A[0].length;
        let X = new Matrix(m, n);
        let C = X.getArray();
        for (let i = 0; i < m; i++) {
            if (A[i].length !== n) {
                throw Object.defineProperty(new Error("All rows must have the same length."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
            }
            for (let j = 0; j < n; j++) {
                C[i][j] = A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Make a deep copy of a matrix
     * @return {Matrix}
     */
    copy() {
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Clone the Matrix object.
     * @return {*}
     */
    clone() {
        return this.copy();
    }
    /**
     * Access the internal two-dimensional array.
     * @return     {Array} Pointer to the two-dimensional array of matrix elements.
     */
    getArray() {
        return this.A;
    }
    /**
     * Copy the internal two-dimensional array.
     * @return     {Array} Two-dimensional array copy of matrix elements.
     */
    getArrayCopy() {
        let C = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.m, this.n]);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j];
            }
            ;
        }
        ;
        return C;
    }
    /**
     * Make a one-dimensional column packed copy of the internal array.
     * @return     {Array} Matrix elements packed in a one-dimensional array by columns.
     */
    getColumnPackedCopy() {
        let vals = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m * this.n);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                vals[i + j * this.m] = this.A[i][j];
            }
            ;
        }
        ;
        return vals;
    }
    /**
     * Make a one-dimensional row packed copy of the internal array.
     * @return     {Array} Matrix elements packed in a one-dimensional array by rows.
     */
    getRowPackedCopy() {
        let vals = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m * this.n);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                vals[i * this.n + j] = this.A[i][j];
            }
            ;
        }
        ;
        return vals;
    }
    /**
     * Get row dimension.
     * @return     {number} m, the number of rows.
     */
    getRowDimension() {
        return this.m;
    }
    /**
     * Get column dimension.
     * @return     {number} n, the number of columns.
     */
    getColumnDimension() {
        return this.n;
    }
    /**
     * Get a single element.
     * @param {number} i    Row index.
     * @param {number} j    Column index.
     * @return     {number} A(i,j)
     * @exception  ArrayIndexOutOfBoundsException
     */
    get(i, j) {
        return this.A[i][j];
    }
    getMatrix$int$int$int$int(i0, i1, j0, j1) {
        let X = new Matrix(i1 - i0 + 1, j1 - j0 + 1);
        let B = X.getArray();
        try {
            for (let i = i0; i <= i1; i++) {
                for (let j = j0; j <= j1; j++) {
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
    }
    /**
     * Get a submatrix.
     * @param {number} i0   Initial row index
     * @param {number} i1   Final row index
     * @param {number} j0   Initial column index
     * @param {number} j1   Final column index
     * @return     {Matrix} A(i0:i1,j0:j1)
     * @exception  ArrayIndexOutOfBoundsException Submatrix indices
     */
    getMatrix(i0, i1, j0, j1) {
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
    }
    getMatrix$int_A$int_A(r, c) {
        let X = new Matrix(r.length, c.length);
        let B = X.getArray();
        try {
            for (let i = 0; i < r.length; i++) {
                for (let j = 0; j < c.length; j++) {
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
    }
    getMatrix$int$int$int_A(i0, i1, c) {
        let X = new Matrix(i1 - i0 + 1, c.length);
        let B = X.getArray();
        try {
            for (let i = i0; i <= i1; i++) {
                for (let j = 0; j < c.length; j++) {
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
    }
    getMatrix$int_A$int$int(r, j0, j1) {
        let X = new Matrix(r.length, j1 - j0 + 1);
        let B = X.getArray();
        try {
            for (let i = 0; i < r.length; i++) {
                for (let j = j0; j <= j1; j++) {
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
    }
    /**
     * Set a single element.
     * @param {number} i    Row index.
     * @param {number} j    Column index.
     * @param {number} s    A(i,j).
     * @exception  ArrayIndexOutOfBoundsException
     */
    set(i, j, s) {
        this.A[i][j] = s;
    }
    setMatrix$int$int$int$int$Jama_Matrix(i0, i1, j0, j1, X) {
        try {
            for (let i = i0; i <= i1; i++) {
                for (let j = j0; j <= j1; j++) {
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
    }
    /**
     * Set a submatrix.
     * @param {number} i0   Initial row index
     * @param {number} i1   Final row index
     * @param {number} j0   Initial column index
     * @param {number} j1   Final column index
     * @param {Matrix} X    A(i0:i1,j0:j1)
     * @exception  ArrayIndexOutOfBoundsException Submatrix indices
     */
    setMatrix(i0, i1, j0, j1, X) {
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
    }
    setMatrix$int_A$int_A$Jama_Matrix(r, c, X) {
        try {
            for (let i = 0; i < r.length; i++) {
                for (let j = 0; j < c.length; j++) {
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
    }
    setMatrix$int_A$int$int$Jama_Matrix(r, j0, j1, X) {
        try {
            for (let i = 0; i < r.length; i++) {
                for (let j = j0; j <= j1; j++) {
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
    }
    setMatrix$int$int$int_A$Jama_Matrix(i0, i1, c, X) {
        try {
            for (let i = i0; i <= i1; i++) {
                for (let j = 0; j < c.length; j++) {
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
    }
    /**
     * Matrix transpose.
     * @return    {Matrix} A'
     */
    transpose() {
        let X = new Matrix(this.n, this.m);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[j][i] = this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * One norm
     * @return    {number} maximum column sum.
     */
    norm1() {
        let f = 0;
        for (let j = 0; j < this.n; j++) {
            let s = 0;
            for (let i = 0; i < this.m; i++) {
                s += Math.abs(this.A[i][j]);
            }
            ;
            f = Math.max(f, s);
        }
        ;
        return f;
    }
    /**
     * Two norm
     * @return    {number} maximum singular value.
     */
    norm2() {
        return (new SingularValueDecomposition(this).norm2());
    }
    /**
     * Infinity norm
     * @return    {number} maximum row sum.
     */
    normInf() {
        let f = 0;
        for (let i = 0; i < this.m; i++) {
            let s = 0;
            for (let j = 0; j < this.n; j++) {
                s += Math.abs(this.A[i][j]);
            }
            ;
            f = Math.max(f, s);
        }
        ;
        return f;
    }
    /**
     * Frobenius norm
     * @return    {number} sqrt of sum of squares of all elements.
     */
    normF() {
        let f = 0;
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                f = Maths.hypot(f, this.A[i][j]);
            }
            ;
        }
        ;
        return f;
    }
    /**
     * Unary minus
     * @return    {Matrix} -A
     */
    uminus() {
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = -this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * C = A + B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A + B
     */
    plus(B) {
        this.checkMatrixDimensions(B);
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] + B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * A = A + B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A + B
     */
    plusEquals(B) {
        this.checkMatrixDimensions(B);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] + B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * C = A - B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A - B
     */
    minus(B) {
        this.checkMatrixDimensions(B);
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] - B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * A = A - B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A - B
     */
    minusEquals(B) {
        this.checkMatrixDimensions(B);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] - B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * Element-by-element multiplication, C = A.*B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.*B
     */
    arrayTimes(B) {
        this.checkMatrixDimensions(B);
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] * B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Element-by-element multiplication in place, A = A.*B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.*B
     */
    arrayTimesEquals(B) {
        this.checkMatrixDimensions(B);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] * B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * Element-by-element right division, C = A./B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A./B
     */
    arrayRightDivide(B) {
        this.checkMatrixDimensions(B);
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = this.A[i][j] / B.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Element-by-element right division in place, A = A./B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A./B
     */
    arrayRightDivideEquals(B) {
        this.checkMatrixDimensions(B);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                this.A[i][j] = this.A[i][j] / B.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    /**
     * Element-by-element left division, C = A.\B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.\B
     */
    arrayLeftDivide(B) {
        this.checkMatrixDimensions(B);
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = B.A[i][j] / this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Element-by-element left division in place, A = A.\B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} A.\B
     */
    arrayLeftDivideEquals(B) {
        this.checkMatrixDimensions(B);
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                this.A[i][j] = B.A[i][j] / this.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    times$double(s) {
        let X = new Matrix(this.m, this.n);
        let C = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                C[i][j] = s * this.A[i][j];
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Multiply a matrix by a scalar in place, A = s*A
     * @param {number} s    scalar
     * @return     {Matrix} replace A by s*A
     */
    timesEquals(s) {
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                this.A[i][j] = s * this.A[i][j];
            }
            ;
        }
        ;
        return this;
    }
    times$Jama_Matrix(B) {
        if (B.m !== this.n) {
            throw Object.defineProperty(new Error("Matrix inner dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        let X = new Matrix(this.m, B.n);
        let C = X.getArray();
        let Bcolj = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        for (let j = 0; j < B.n; j++) {
            for (let k = 0; k < this.n; k++) {
                Bcolj[k] = B.A[k][j];
            }
            ;
            for (let i = 0; i < this.m; i++) {
                let Arowi = this.A[i];
                let s = 0;
                for (let k = 0; k < this.n; k++) {
                    s += Arowi[k] * Bcolj[k];
                }
                ;
                C[i][j] = s;
            }
            ;
        }
        ;
        return X;
    }
    /**
     * Linear algebraic matrix multiplication, A * B
     * @param {Matrix} B    another matrix
     * @return     {Matrix} Matrix product, A * B
     * @exception  IllegalArgumentException Matrix inner dimensions must agree.
     */
    times(B) {
        if (((B != null && B instanceof Matrix) || B === null)) {
            return this.times$Jama_Matrix(B);
        }
        else if (((typeof B === 'number') || B === null)) {
            return this.times$double(B);
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * LU Decomposition
     * @return     {LUDecomposition} LUDecomposition
     * @see LUDecomposition
     */
    lu() {
        return new LUDecomposition(this);
    }
    /**
     * QR Decomposition
     * @return     {QRDecomposition} QRDecomposition
     * @see QRDecomposition
     */
    qr() {
        return new QRDecomposition(this);
    }
    /**
     * Cholesky Decomposition
     * @return     {CholeskyDecomposition} CholeskyDecomposition
     * @see CholeskyDecomposition
     */
    chol() {
        return new CholeskyDecomposition(this);
    }
    /**
     * Singular Value Decomposition
     * @return     {SingularValueDecomposition} SingularValueDecomposition
     * @see SingularValueDecomposition
     */
    svd() {
        return new SingularValueDecomposition(this);
    }
    /**
     * Eigenvalue Decomposition
     * @return     {EigenvalueDecomposition} EigenvalueDecomposition
     * @see EigenvalueDecomposition
     */
    eig() {
        return new EigenvalueDecomposition(this);
    }
    /**
     * Solve A*X = B
     * @param {Matrix} B    right hand side
     * @return     {Matrix} solution if A is square, least squares solution otherwise
     */
    solve(B) {
        return (this.m === this.n ? (new LUDecomposition(this)).solve(B) : (new QRDecomposition(this)).solve(B));
    }
    /**
     * Solve X*A = B, which is also A'*X' = B'
     * @param {Matrix} B    right hand side
     * @return     {Matrix} solution if A is square, least squares solution otherwise.
     */
    solveTranspose(B) {
        return this.transpose().solve(B.transpose());
    }
    /**
     * Matrix inverse or pseudoinverse
     * @return     {Matrix} inverse(A) if A is square, pseudoinverse otherwise.
     */
    inverse() {
        return this.solve(Matrix.identity(this.m, this.m));
    }
    /**
     * Matrix determinant
     * @return     {number} determinant
     */
    det() {
        return new LUDecomposition(this).det();
    }
    /**
     * Matrix rank
     * @return     {number} effective numerical rank, obtained from SVD.
     */
    rank() {
        return new SingularValueDecomposition(this).rank();
    }
    /**
     * Matrix condition (2 norm)
     * @return     {number} ratio of largest to smallest singular value.
     */
    cond() {
        return new SingularValueDecomposition(this).cond();
    }
    /**
     * Matrix trace.
     * @return     {number} sum of the diagonal elements.
     */
    trace() {
        let t = 0;
        for (let i = 0; i < Math.min(this.m, this.n); i++) {
            t += this.A[i][i];
        }
        ;
        return t;
    }
    /**
     * Generate matrix with random elements
     * @param {number} m    Number of rows.
     * @param {number} n    Number of colums.
     * @return     {Matrix} An m-by-n matrix with uniformly distributed random elements.
     */
    static random(m, n) {
        let A = new Matrix(m, n);
        let X = A.getArray();
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                X[i][j] = Math.random();
            }
            ;
        }
        ;
        return A;
    }
    /**
     * Generate identity matrix
     * @param {number} m    Number of rows.
     * @param {number} n    Number of colums.
     * @return     {Matrix} An m-by-n matrix with ones on the diagonal and zeros elsewhere.
     */
    static identity(m, n) {
        let A = new Matrix(m, n);
        let X = A.getArray();
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                X[i][j] = (i === j ? 1.0 : 0.0);
            }
            ;
        }
        ;
        return A;
    }
    /**
     * Check if size(A) == size(B)
     * @param {Matrix} B
     * @private
     */
    /*private*/ checkMatrixDimensions(B) {
        if (B.m !== this.m || B.n !== this.n) {
            throw Object.defineProperty(new Error("Matrix dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
    }
}
Matrix.serialVersionUID = 1;
Matrix["__class"] = "Jama.Matrix";
Matrix["__interfaces"] = ["java.lang.Cloneable", "java.io.Serializable"];
