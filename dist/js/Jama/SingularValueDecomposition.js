/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
import { Maths } from './util/Maths';
import { Matrix } from './Matrix';
/**
 * Construct the singular value decomposition
 * Structure to access U, S and V.
 * @param {Matrix} Arg    Rectangular matrix
 * @class
 */
export class SingularValueDecomposition {
    constructor(Arg) {
        this.U = null;
        this.V = null;
        this.s = null;
        this.m = 0;
        this.n = 0;
        let A = Arg.getArrayCopy();
        this.m = Arg.getRowDimension();
        this.n = Arg.getColumnDimension();
        let nu = Math.min(this.m, this.n);
        this.s = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(Math.min(this.m + 1, this.n));
        this.U = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.m, nu]);
        this.V = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
            return 0;
        }
        else {
            let array = [];
            for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.n, this.n]);
        let e = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        let work = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.m);
        let wantu = true;
        let wantv = true;
        let nct = Math.min(this.m - 1, this.n);
        let nrt = Math.max(0, Math.min(this.n - 2, this.m));
        for (let k = 0; k < Math.max(nct, nrt); k++) {
            if (k < nct) {
                this.s[k] = 0;
                for (let i = k; i < this.m; i++) {
                    this.s[k] = Maths.hypot(this.s[k], A[i][k]);
                }
                ;
                if (this.s[k] !== 0.0) {
                    if (A[k][k] < 0.0) {
                        this.s[k] = -this.s[k];
                    }
                    for (let i = k; i < this.m; i++) {
                        A[i][k] /= this.s[k];
                    }
                    ;
                    A[k][k] += 1.0;
                }
                this.s[k] = -this.s[k];
            }
            for (let j = k + 1; j < this.n; j++) {
                if (((lhs, rhs) => lhs && rhs)((k < nct), (this.s[k] !== 0.0))) {
                    let t = 0;
                    for (let i = k; i < this.m; i++) {
                        t += A[i][k] * A[i][j];
                    }
                    ;
                    t = -t / A[k][k];
                    for (let i = k; i < this.m; i++) {
                        A[i][j] += t * A[i][k];
                    }
                    ;
                }
                e[j] = A[k][j];
            }
            ;
            if (((lhs, rhs) => lhs && rhs)(wantu, (k < nct))) {
                for (let i = k; i < this.m; i++) {
                    this.U[i][k] = A[i][k];
                }
                ;
            }
            if (k < nrt) {
                e[k] = 0;
                for (let i = k + 1; i < this.n; i++) {
                    e[k] = Maths.hypot(e[k], e[i]);
                }
                ;
                if (e[k] !== 0.0) {
                    if (e[k + 1] < 0.0) {
                        e[k] = -e[k];
                    }
                    for (let i = k + 1; i < this.n; i++) {
                        e[i] /= e[k];
                    }
                    ;
                    e[k + 1] += 1.0;
                }
                e[k] = -e[k];
                if (((lhs, rhs) => lhs && rhs)((k + 1 < this.m), (e[k] !== 0.0))) {
                    for (let i = k + 1; i < this.m; i++) {
                        work[i] = 0.0;
                    }
                    ;
                    for (let j = k + 1; j < this.n; j++) {
                        for (let i = k + 1; i < this.m; i++) {
                            work[i] += e[j] * A[i][j];
                        }
                        ;
                    }
                    ;
                    for (let j = k + 1; j < this.n; j++) {
                        let t = -e[j] / e[k + 1];
                        for (let i = k + 1; i < this.m; i++) {
                            A[i][j] += t * work[i];
                        }
                        ;
                    }
                    ;
                }
                if (wantv) {
                    for (let i = k + 1; i < this.n; i++) {
                        this.V[i][k] = e[i];
                    }
                    ;
                }
            }
        }
        ;
        let p = Math.min(this.n, this.m + 1);
        if (nct < this.n) {
            this.s[nct] = A[nct][nct];
        }
        if (this.m < p) {
            this.s[p - 1] = 0.0;
        }
        if (nrt + 1 < p) {
            e[nrt] = A[nrt][p - 1];
        }
        e[p - 1] = 0.0;
        if (wantu) {
            for (let j = nct; j < nu; j++) {
                for (let i = 0; i < this.m; i++) {
                    this.U[i][j] = 0.0;
                }
                ;
                this.U[j][j] = 1.0;
            }
            ;
            for (let k = nct - 1; k >= 0; k--) {
                if (this.s[k] !== 0.0) {
                    for (let j = k + 1; j < nu; j++) {
                        let t = 0;
                        for (let i = k; i < this.m; i++) {
                            t += this.U[i][k] * this.U[i][j];
                        }
                        ;
                        t = -t / this.U[k][k];
                        for (let i = k; i < this.m; i++) {
                            this.U[i][j] += t * this.U[i][k];
                        }
                        ;
                    }
                    ;
                    for (let i = k; i < this.m; i++) {
                        this.U[i][k] = -this.U[i][k];
                    }
                    ;
                    this.U[k][k] = 1.0 + this.U[k][k];
                    for (let i = 0; i < k - 1; i++) {
                        this.U[i][k] = 0.0;
                    }
                    ;
                }
                else {
                    for (let i = 0; i < this.m; i++) {
                        this.U[i][k] = 0.0;
                    }
                    ;
                    this.U[k][k] = 1.0;
                }
            }
            ;
        }
        if (wantv) {
            for (let k = this.n - 1; k >= 0; k--) {
                if (((lhs, rhs) => lhs && rhs)((k < nrt), (e[k] !== 0.0))) {
                    for (let j = k + 1; j < nu; j++) {
                        let t = 0;
                        for (let i = k + 1; i < this.n; i++) {
                            t += this.V[i][k] * this.V[i][j];
                        }
                        ;
                        t = -t / this.V[k + 1][k];
                        for (let i = k + 1; i < this.n; i++) {
                            this.V[i][j] += t * this.V[i][k];
                        }
                        ;
                    }
                    ;
                }
                for (let i = 0; i < this.n; i++) {
                    this.V[i][k] = 0.0;
                }
                ;
                this.V[k][k] = 1.0;
            }
            ;
        }
        let pp = p - 1;
        let iter = 0;
        let eps = Math.pow(2.0, -52.0);
        let tiny = Math.pow(2.0, -966.0);
        while ((p > 0)) {
            let k;
            let kase;
            for (k = p - 2; k >= -1; k--) {
                if (k === -1) {
                    break;
                }
                if (Math.abs(e[k]) <= tiny + eps * (Math.abs(this.s[k]) + Math.abs(this.s[k + 1]))) {
                    e[k] = 0.0;
                    break;
                }
            }
            ;
            if (k === p - 2) {
                kase = 4;
            }
            else {
                let ks;
                for (ks = p - 1; ks >= k; ks--) {
                    if (ks === k) {
                        break;
                    }
                    let t = (ks !== p ? Math.abs(e[ks]) : 0.0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0.0);
                    if (Math.abs(this.s[ks]) <= tiny + eps * t) {
                        this.s[ks] = 0.0;
                        break;
                    }
                }
                ;
                if (ks === k) {
                    kase = 3;
                }
                else if (ks === p - 1) {
                    kase = 1;
                }
                else {
                    kase = 2;
                    k = ks;
                }
            }
            k++;
            switch ((kase)) {
                case 1:
                    {
                        let f = e[p - 2];
                        e[p - 2] = 0.0;
                        for (let j = p - 2; j >= k; j--) {
                            let t = Maths.hypot(this.s[j], f);
                            let cs = this.s[j] / t;
                            let sn = f / t;
                            this.s[j] = t;
                            if (j !== k) {
                                f = -sn * e[j - 1];
                                e[j - 1] = cs * e[j - 1];
                            }
                            if (wantv) {
                                for (let i = 0; i < this.n; i++) {
                                    t = cs * this.V[i][j] + sn * this.V[i][p - 1];
                                    this.V[i][p - 1] = -sn * this.V[i][j] + cs * this.V[i][p - 1];
                                    this.V[i][j] = t;
                                }
                                ;
                            }
                        }
                        ;
                    }
                    ;
                    break;
                case 2:
                    {
                        let f = e[k - 1];
                        e[k - 1] = 0.0;
                        for (let j = k; j < p; j++) {
                            let t = Maths.hypot(this.s[j], f);
                            let cs = this.s[j] / t;
                            let sn = f / t;
                            this.s[j] = t;
                            f = -sn * e[j];
                            e[j] = cs * e[j];
                            if (wantu) {
                                for (let i = 0; i < this.m; i++) {
                                    t = cs * this.U[i][j] + sn * this.U[i][k - 1];
                                    this.U[i][k - 1] = -sn * this.U[i][j] + cs * this.U[i][k - 1];
                                    this.U[i][j] = t;
                                }
                                ;
                            }
                        }
                        ;
                    }
                    ;
                    break;
                case 3:
                    {
                        let scale = Math.max(Math.max(Math.max(Math.max(Math.abs(this.s[p - 1]), Math.abs(this.s[p - 2])), Math.abs(e[p - 2])), Math.abs(this.s[k])), Math.abs(e[k]));
                        let sp = this.s[p - 1] / scale;
                        let spm1 = this.s[p - 2] / scale;
                        let epm1 = e[p - 2] / scale;
                        let sk = this.s[k] / scale;
                        let ek = e[k] / scale;
                        let b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2.0;
                        let c = (sp * epm1) * (sp * epm1);
                        let shift = 0.0;
                        if (((lhs, rhs) => lhs || rhs)((b !== 0.0), (c !== 0.0))) {
                            shift = Math.sqrt(b * b + c);
                            if (b < 0.0) {
                                shift = -shift;
                            }
                            shift = c / (b + shift);
                        }
                        let f = (sk + sp) * (sk - sp) + shift;
                        let g = sk * ek;
                        for (let j = k; j < p - 1; j++) {
                            let t = Maths.hypot(f, g);
                            let cs = f / t;
                            let sn = g / t;
                            if (j !== k) {
                                e[j - 1] = t;
                            }
                            f = cs * this.s[j] + sn * e[j];
                            e[j] = cs * e[j] - sn * this.s[j];
                            g = sn * this.s[j + 1];
                            this.s[j + 1] = cs * this.s[j + 1];
                            if (wantv) {
                                for (let i = 0; i < this.n; i++) {
                                    t = cs * this.V[i][j] + sn * this.V[i][j + 1];
                                    this.V[i][j + 1] = -sn * this.V[i][j] + cs * this.V[i][j + 1];
                                    this.V[i][j] = t;
                                }
                                ;
                            }
                            t = Maths.hypot(f, g);
                            cs = f / t;
                            sn = g / t;
                            this.s[j] = t;
                            f = cs * e[j] + sn * this.s[j + 1];
                            this.s[j + 1] = -sn * e[j] + cs * this.s[j + 1];
                            g = sn * e[j + 1];
                            e[j + 1] = cs * e[j + 1];
                            if (wantu && (j < this.m - 1)) {
                                for (let i = 0; i < this.m; i++) {
                                    t = cs * this.U[i][j] + sn * this.U[i][j + 1];
                                    this.U[i][j + 1] = -sn * this.U[i][j] + cs * this.U[i][j + 1];
                                    this.U[i][j] = t;
                                }
                                ;
                            }
                        }
                        ;
                        e[p - 2] = f;
                        iter = iter + 1;
                    }
                    ;
                    break;
                case 4:
                    {
                        if (this.s[k] <= 0.0) {
                            this.s[k] = (this.s[k] < 0.0 ? -this.s[k] : 0.0);
                            if (wantv) {
                                for (let i = 0; i <= pp; i++) {
                                    this.V[i][k] = -this.V[i][k];
                                }
                                ;
                            }
                        }
                        while ((k < pp)) {
                            if (this.s[k] >= this.s[k + 1]) {
                                break;
                            }
                            let t = this.s[k];
                            this.s[k] = this.s[k + 1];
                            this.s[k + 1] = t;
                            if (wantv && (k < this.n - 1)) {
                                for (let i = 0; i < this.n; i++) {
                                    t = this.V[i][k + 1];
                                    this.V[i][k + 1] = this.V[i][k];
                                    this.V[i][k] = t;
                                }
                                ;
                            }
                            if (wantu && (k < this.m - 1)) {
                                for (let i = 0; i < this.m; i++) {
                                    t = this.U[i][k + 1];
                                    this.U[i][k + 1] = this.U[i][k];
                                    this.U[i][k] = t;
                                }
                                ;
                            }
                            k++;
                        }
                        ;
                        iter = 0;
                        p--;
                    }
                    ;
                    break;
            }
        }
        ;
    }
    /**
     * Return the left singular vectors
     * @return     {Matrix} U
     */
    getU() {
        return new Matrix(this.U, this.m, Math.min(this.m + 1, this.n));
    }
    /**
     * Return the right singular vectors
     * @return     {Matrix} V
     */
    getV() {
        return new Matrix(this.V, this.n, this.n);
    }
    /**
     * Return the one-dimensional array of singular values
     * @return     {Array} diagonal of S.
     */
    getSingularValues() {
        return this.s;
    }
    /**
     * Return the diagonal matrix of singular values
     * @return     {Matrix} S
     */
    getS() {
        let X = new Matrix(this.n, this.n);
        let S = X.getArray();
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                S[i][j] = 0.0;
            }
            ;
            S[i][i] = this.s[i];
        }
        ;
        return X;
    }
    /**
     * Two norm
     * @return     {number} max(S)
     */
    norm2() {
        return this.s[0];
    }
    /**
     * Two norm condition number
     * @return     {number} max(S)/min(S)
     */
    cond() {
        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }
    /**
     * Effective numerical matrix rank
     * @return     {number} Number of nonnegligible singular values.
     */
    rank() {
        let eps = Math.pow(2.0, -52.0);
        let tol = Math.max(this.m, this.n) * this.s[0] * eps;
        let r = 0;
        for (let i = 0; i < this.s.length; i++) {
            if (this.s[i] > tol) {
                r++;
            }
        }
        ;
        return r;
    }
}
SingularValueDecomposition.serialVersionUID = 1;
SingularValueDecomposition["__class"] = "Jama.SingularValueDecomposition";
SingularValueDecomposition["__interfaces"] = ["java.io.Serializable"];
