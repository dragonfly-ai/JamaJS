/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
import { Matrix } from './Matrix';
/**
 * LU Decomposition
 * Structure to access L, U and piv.
 * @param  {Matrix} A Rectangular matrix
 * @class
 */
export class LUDecomposition {
    constructor(A) {
        this.LU = null;
        this.m = 0;
        this.n = 0;
        this.pivsign = 0;
        this.piv = null;
        this.LU = A.getArrayCopy();
        this.m = A.getRowDimension();
        this.n = A.getColumnDimension();
        this.piv = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let i = 0; i < this.m; i++) {
            this.piv[i] = i;
        }
        ;
        this.pivsign = 1;
        let LUrowi;
        let LUcolj = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let j = 0; j < this.n; j++) {
            for (let i = 0; i < this.m; i++) {
                LUcolj[i] = this.LU[i][j];
            }
            ;
            for (let i = 0; i < this.m; i++) {
                LUrowi = this.LU[i];
                let kmax = Math.min(i, j);
                let s = 0.0;
                for (let k = 0; k < kmax; k++) {
                    s += LUrowi[k] * LUcolj[k];
                }
                ;
                LUrowi[j] = LUcolj[i] -= s;
            }
            ;
            let p = j;
            for (let i = j + 1; i < this.m; i++) {
                if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
                    p = i;
                }
            }
            ;
            if (p !== j) {
                for (let k = 0; k < this.n; k++) {
                    let t = this.LU[p][k];
                    this.LU[p][k] = this.LU[j][k];
                    this.LU[j][k] = t;
                }
                ;
                let k = this.piv[p];
                this.piv[p] = this.piv[j];
                this.piv[j] = k;
                this.pivsign = -this.pivsign;
            }
            if (((lhs, rhs) => lhs && rhs)(j < this.m, this.LU[j][j] !== 0.0)) {
                for (let i = j + 1; i < this.m; i++) {
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
    isNonsingular() {
        for (let j = 0; j < this.n; j++) {
            if (this.LU[j][j] === 0)
                return false;
        }
        ;
        return true;
    }
    /**
     * Return lower triangular factor
     * @return     {Matrix} L
     */
    getL() {
        let X = new Matrix(this.m, this.n);
        let L = X.getArray();
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
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
    }
    /**
     * Return upper triangular factor
     * @return     {Matrix} U
     */
    getU() {
        let X = new Matrix(this.n, this.n);
        let U = X.getArray();
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
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
    }
    /**
     * Return pivot permutation vector
     * @return     {Array} piv
     */
    getPivot() {
        let p = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let i = 0; i < this.m; i++) {
            p[i] = this.piv[i];
        }
        ;
        return p;
    }
    /**
     * Return pivot permutation vector as a one-dimensional double array
     * @return     {Array} (double) piv
     */
    getDoublePivot() {
        let vals = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        for (let i = 0; i < this.m; i++) {
            vals[i] = this.piv[i];
        }
        ;
        return vals;
    }
    /**
     * Determinant
     * @return     {number} det(A)
     * @exception  IllegalArgumentException  Matrix must be square
     */
    det() {
        if (this.m !== this.n) {
            throw Object.defineProperty(new Error("Matrix must be square."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        let d = this.pivsign;
        for (let j = 0; j < this.n; j++) {
            d *= this.LU[j][j];
        }
        ;
        return d;
    }
    /**
     * Solve A*X = B
     * @param  {Matrix} B   A Matrix with as many rows as A and any number of columns.
     * @return     {Matrix} X so that L*U*X = B(piv,:)
     * @exception  IllegalArgumentException Matrix row dimensions must agree.
     * @exception  RuntimeException  Matrix is singular.
     */
    solve(B) {
        if (B.getRowDimension() !== this.m) {
            throw Object.defineProperty(new Error("Matrix row dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        if (!this.isNonsingular()) {
            throw Object.defineProperty(new Error("Matrix is singular."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        let nx = B.getColumnDimension();
        let Xmat = B.getMatrix$int_A$int$int(this.piv, 0, nx - 1);
        let X = Xmat.getArray();
        for (let k = 0; k < this.n; k++) {
            for (let i = k + 1; i < this.n; i++) {
                for (let j = 0; j < nx; j++) {
                    X[i][j] -= X[k][j] * this.LU[i][k];
                }
                ;
            }
            ;
        }
        ;
        for (let k = this.n - 1; k >= 0; k--) {
            for (let j = 0; j < nx; j++) {
                X[k][j] /= this.LU[k][k];
            }
            ;
            for (let i = 0; i < k; i++) {
                for (let j = 0; j < nx; j++) {
                    X[i][j] -= X[k][j] * this.LU[i][k];
                }
                ;
            }
            ;
        }
        ;
        return Xmat;
    }
}
LUDecomposition.serialVersionUID = 1;
LUDecomposition["__class"] = "Jama.LUDecomposition";
LUDecomposition["__interfaces"] = ["java.io.Serializable"];
