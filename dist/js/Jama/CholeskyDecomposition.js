/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
import { Matrix } from './Matrix';
/**
 * Cholesky algorithm for symmetric and positive definite matrix.
 * Structure to access L and isspd flag.
 * @param  {Matrix} Arg   Square, symmetric matrix.
 * @class
 */
export class CholeskyDecomposition {
    constructor(Arg) {
        this.L = null;
        this.n = 0;
        this.isspd = false;
        let A = Arg.getArray();
        this.n = Arg.getRowDimension();
        this.L = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.n, this.n]);
        this.isspd = (Arg.getColumnDimension() === this.n);
        for (let j = 0; j < this.n; j++) {
            let Lrowj = this.L[j];
            let d = 0.0;
            for (let k = 0; k < j; k++) {
                let Lrowk = this.L[k];
                let s = 0.0;
                for (let i = 0; i < k; i++) {
                    s += Lrowk[i] * Lrowj[i];
                }
                ;
                Lrowj[k] = s = (A[j][k] - s) / this.L[k][k];
                d = d + s * s;
                this.isspd = ((lhs, rhs) => lhs && rhs)(this.isspd, (A[k][j] === A[j][k]));
            }
            ;
            d = A[j][j] - d;
            this.isspd = ((lhs, rhs) => lhs && rhs)(this.isspd, (d > 0.0));
            this.L[j][j] = Math.sqrt(Math.max(d, 0.0));
            for (let k = j + 1; k < this.n; k++) {
                this.L[j][k] = 0.0;
            }
            ;
        }
        ;
    }
    /**
     * Is the matrix symmetric and positive definite?
     * @return     {boolean} true if A is symmetric and positive definite.
     */
    isSPD() {
        return this.isspd;
    }
    /**
     * Return triangular factor.
     * @return     {Matrix} L
     */
    getL() {
        return new Matrix(this.L, this.n, this.n);
    }
    /**
     * Solve A*X = B
     * @param  {Matrix} B   A Matrix with as many rows as A and any number of columns.
     * @return     {Matrix} X so that L*L'*X = B
     * @exception  IllegalArgumentException  Matrix row dimensions must agree.
     * @exception  RuntimeException  Matrix is not symmetric positive definite.
     */
    solve(B) {
        if (B.getRowDimension() !== this.n) {
            throw Object.defineProperty(new Error("Matrix row dimensions must agree."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        }
        if (!this.isspd) {
            throw Object.defineProperty(new Error("Matrix is not symmetric positive definite."), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        let X = B.getArrayCopy();
        let nx = B.getColumnDimension();
        for (let k = 0; k < this.n; k++) {
            for (let j = 0; j < nx; j++) {
                for (let i = 0; i < k; i++) {
                    X[k][j] -= X[i][j] * this.L[k][i];
                }
                ;
                X[k][j] /= this.L[k][k];
            }
            ;
        }
        ;
        for (let k = this.n - 1; k >= 0; k--) {
            for (let j = 0; j < nx; j++) {
                for (let i = k + 1; i < this.n; i++) {
                    X[k][j] -= X[i][j] * this.L[i][k];
                }
                ;
                X[k][j] /= this.L[k][k];
            }
            ;
        }
        ;
        return new Matrix(X, this.n, nx);
    }
}
CholeskyDecomposition.serialVersionUID = 1;
CholeskyDecomposition["__class"] = "Jama.CholeskyDecomposition";
CholeskyDecomposition["__interfaces"] = ["java.io.Serializable"];
