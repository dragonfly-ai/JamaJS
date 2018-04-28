/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
import { Maths } from './util/Maths';
import { Matrix } from './Matrix';
/**
 * Check for symmetry, then construct the eigenvalue decomposition
 * Structure to access D and V.
 * @param {Matrix} Arg    Square matrix
 * @class
 */
export class EigenvalueDecomposition {
    constructor(Arg) {
        this.n = 0;
        this.issymmetric = false;
        this.d = null;
        this.e = null;
        this.V = null;
        this.H = null;
        this.ort = null;
        this.cdivr = 0;
        this.cdivi = 0;
        let A = Arg.getArray();
        this.n = Arg.getColumnDimension();
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
        this.d = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        this.e = (s => { let a = []; while (s-- > 0)
            a.push(0); return a; })(this.n);
        this.issymmetric = true;
        for (let j = 0; ((lhs, rhs) => lhs && rhs)((j < this.n), this.issymmetric); j++) {
            for (let i = 0; ((lhs, rhs) => lhs && rhs)((i < this.n), this.issymmetric); i++) {
                this.issymmetric = (A[i][j] === A[j][i]);
            }
            ;
        }
        ;
        if (this.issymmetric) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.n; j++) {
                    this.V[i][j] = A[i][j];
                }
                ;
            }
            ;
            this.tred2();
            this.tql2();
        }
        else {
            this.H = (function (dims) { let allocate = function (dims) { if (dims.length == 0) {
                return 0;
            }
            else {
                let array = [];
                for (let i = 0; i < dims[0]; i++) {
                    array.push(allocate(dims.slice(1)));
                }
                return array;
            } }; return allocate(dims); })([this.n, this.n]);
            this.ort = (s => { let a = []; while (s-- > 0)
                a.push(0); return a; })(this.n);
            for (let j = 0; j < this.n; j++) {
                for (let i = 0; i < this.n; i++) {
                    this.H[i][j] = A[i][j];
                }
                ;
            }
            ;
            this.orthes();
            this.hqr2();
        }
    }
    /*private*/ tred2() {
        for (let j = 0; j < this.n; j++) {
            this.d[j] = this.V[this.n - 1][j];
        }
        ;
        for (let i = this.n - 1; i > 0; i--) {
            let scale = 0.0;
            let h = 0.0;
            for (let k = 0; k < i; k++) {
                scale = scale + Math.abs(this.d[k]);
            }
            ;
            if (scale === 0.0) {
                this.e[i] = this.d[i - 1];
                for (let j = 0; j < i; j++) {
                    this.d[j] = this.V[i - 1][j];
                    this.V[i][j] = 0.0;
                    this.V[j][i] = 0.0;
                }
                ;
            }
            else {
                for (let k = 0; k < i; k++) {
                    this.d[k] /= scale;
                    h += this.d[k] * this.d[k];
                }
                ;
                let f = this.d[i - 1];
                let g = Math.sqrt(h);
                if (f > 0) {
                    g = -g;
                }
                this.e[i] = scale * g;
                h = h - f * g;
                this.d[i - 1] = f - g;
                for (let j = 0; j < i; j++) {
                    this.e[j] = 0.0;
                }
                ;
                for (let j = 0; j < i; j++) {
                    f = this.d[j];
                    this.V[j][i] = f;
                    g = this.e[j] + this.V[j][j] * f;
                    for (let k = j + 1; k <= i - 1; k++) {
                        g += this.V[k][j] * this.d[k];
                        this.e[k] += this.V[k][j] * f;
                    }
                    ;
                    this.e[j] = g;
                }
                ;
                f = 0.0;
                for (let j = 0; j < i; j++) {
                    this.e[j] /= h;
                    f += this.e[j] * this.d[j];
                }
                ;
                let hh = f / (h + h);
                for (let j = 0; j < i; j++) {
                    this.e[j] -= hh * this.d[j];
                }
                ;
                for (let j = 0; j < i; j++) {
                    f = this.d[j];
                    g = this.e[j];
                    for (let k = j; k <= i - 1; k++) {
                        this.V[k][j] -= (f * this.e[k] + g * this.d[k]);
                    }
                    ;
                    this.d[j] = this.V[i - 1][j];
                    this.V[i][j] = 0.0;
                }
                ;
            }
            this.d[i] = h;
        }
        ;
        for (let i = 0; i < this.n - 1; i++) {
            this.V[this.n - 1][i] = this.V[i][i];
            this.V[i][i] = 1.0;
            let h = this.d[i + 1];
            if (h !== 0.0) {
                for (let k = 0; k <= i; k++) {
                    this.d[k] = this.V[k][i + 1] / h;
                }
                ;
                for (let j = 0; j <= i; j++) {
                    let g = 0.0;
                    for (let k = 0; k <= i; k++) {
                        g += this.V[k][i + 1] * this.V[k][j];
                    }
                    ;
                    for (let k = 0; k <= i; k++) {
                        this.V[k][j] -= g * this.d[k];
                    }
                    ;
                }
                ;
            }
            for (let k = 0; k <= i; k++) {
                this.V[k][i + 1] = 0.0;
            }
            ;
        }
        ;
        for (let j = 0; j < this.n; j++) {
            this.d[j] = this.V[this.n - 1][j];
            this.V[this.n - 1][j] = 0.0;
        }
        ;
        this.V[this.n - 1][this.n - 1] = 1.0;
        this.e[0] = 0.0;
    }
    /*private*/ tql2() {
        for (let i = 1; i < this.n; i++) {
            this.e[i - 1] = this.e[i];
        }
        ;
        this.e[this.n - 1] = 0.0;
        let f = 0.0;
        let tst1 = 0.0;
        let eps = Math.pow(2.0, -52.0);
        for (let l = 0; l < this.n; l++) {
            tst1 = Math.max(tst1, Math.abs(this.d[l]) + Math.abs(this.e[l]));
            let m = l;
            while ((m < this.n)) {
                if (Math.abs(this.e[m]) <= eps * tst1) {
                    break;
                }
                m++;
            }
            ;
            if (m > l) {
                let iter = 0;
                do {
                    iter = iter + 1;
                    let g = this.d[l];
                    let p = (this.d[l + 1] - g) / (2.0 * this.e[l]);
                    let r = Maths.hypot(p, 1.0);
                    if (p < 0) {
                        r = -r;
                    }
                    this.d[l] = this.e[l] / (p + r);
                    this.d[l + 1] = this.e[l] * (p + r);
                    let dl1 = this.d[l + 1];
                    let h = g - this.d[l];
                    for (let i = l + 2; i < this.n; i++) {
                        this.d[i] -= h;
                    }
                    ;
                    f = f + h;
                    p = this.d[m];
                    let c = 1.0;
                    let c2 = c;
                    let c3 = c;
                    let el1 = this.e[l + 1];
                    let s = 0.0;
                    let s2 = 0.0;
                    for (let i = m - 1; i >= l; i--) {
                        c3 = c2;
                        c2 = c;
                        s2 = s;
                        g = c * this.e[i];
                        h = c * p;
                        r = Maths.hypot(p, this.e[i]);
                        this.e[i + 1] = s * r;
                        s = this.e[i] / r;
                        c = p / r;
                        p = c * this.d[i] - s * g;
                        this.d[i + 1] = h + s * (c * g + s * this.d[i]);
                        for (let k = 0; k < this.n; k++) {
                            h = this.V[k][i + 1];
                            this.V[k][i + 1] = s * this.V[k][i] + c * h;
                            this.V[k][i] = c * this.V[k][i] - s * h;
                        }
                        ;
                    }
                    ;
                    p = -s * s2 * c3 * el1 * this.e[l] / dl1;
                    this.e[l] = s * p;
                    this.d[l] = c * p;
                } while ((Math.abs(this.e[l]) > eps * tst1));
            }
            this.d[l] = this.d[l] + f;
            this.e[l] = 0.0;
        }
        ;
        for (let i = 0; i < this.n - 1; i++) {
            let k = i;
            let p = this.d[i];
            for (let j = i + 1; j < this.n; j++) {
                if (this.d[j] < p) {
                    k = j;
                    p = this.d[j];
                }
            }
            ;
            if (k !== i) {
                this.d[k] = this.d[i];
                this.d[i] = p;
                for (let j = 0; j < this.n; j++) {
                    p = this.V[j][i];
                    this.V[j][i] = this.V[j][k];
                    this.V[j][k] = p;
                }
                ;
            }
        }
        ;
    }
    /*private*/ orthes() {
        let low = 0;
        let high = this.n - 1;
        for (let m = low + 1; m <= high - 1; m++) {
            let scale = 0.0;
            for (let i = m; i <= high; i++) {
                scale = scale + Math.abs(this.H[i][m - 1]);
            }
            ;
            if (scale !== 0.0) {
                let h = 0.0;
                for (let i = high; i >= m; i--) {
                    this.ort[i] = this.H[i][m - 1] / scale;
                    h += this.ort[i] * this.ort[i];
                }
                ;
                let g = Math.sqrt(h);
                if (this.ort[m] > 0) {
                    g = -g;
                }
                h = h - this.ort[m] * g;
                this.ort[m] = this.ort[m] - g;
                for (let j = m; j < this.n; j++) {
                    let f = 0.0;
                    for (let i = high; i >= m; i--) {
                        f += this.ort[i] * this.H[i][j];
                    }
                    ;
                    f = f / h;
                    for (let i = m; i <= high; i++) {
                        this.H[i][j] -= f * this.ort[i];
                    }
                    ;
                }
                ;
                for (let i = 0; i <= high; i++) {
                    let f = 0.0;
                    for (let j = high; j >= m; j--) {
                        f += this.ort[j] * this.H[i][j];
                    }
                    ;
                    f = f / h;
                    for (let j = m; j <= high; j++) {
                        this.H[i][j] -= f * this.ort[j];
                    }
                    ;
                }
                ;
                this.ort[m] = scale * this.ort[m];
                this.H[m][m - 1] = scale * g;
            }
        }
        ;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                this.V[i][j] = (i === j ? 1.0 : 0.0);
            }
            ;
        }
        ;
        for (let m = high - 1; m >= low + 1; m--) {
            if (this.H[m][m - 1] !== 0.0) {
                for (let i = m + 1; i <= high; i++) {
                    this.ort[i] = this.H[i][m - 1];
                }
                ;
                for (let j = m; j <= high; j++) {
                    let g = 0.0;
                    for (let i = m; i <= high; i++) {
                        g += this.ort[i] * this.V[i][j];
                    }
                    ;
                    g = (g / this.ort[m]) / this.H[m][m - 1];
                    for (let i = m; i <= high; i++) {
                        this.V[i][j] += g * this.ort[i];
                    }
                    ;
                }
                ;
            }
        }
        ;
    }
    /*private*/ cdiv(xr, xi, yr, yi) {
        let r;
        let d;
        if (Math.abs(yr) > Math.abs(yi)) {
            r = yi / yr;
            d = yr + r * yi;
            this.cdivr = (xr + r * xi) / d;
            this.cdivi = (xi - r * xr) / d;
        }
        else {
            r = yr / yi;
            d = yi + r * yr;
            this.cdivr = (r * xr + xi) / d;
            this.cdivi = (r * xi - xr) / d;
        }
    }
    /*private*/ hqr2() {
        let nn = this.n;
        let n = nn - 1;
        let low = 0;
        let high = nn - 1;
        let eps = Math.pow(2.0, -52.0);
        let exshift = 0.0;
        let p = 0;
        let q = 0;
        let r = 0;
        let s = 0;
        let z = 0;
        let t;
        let w;
        let x;
        let y;
        let norm = 0.0;
        for (let i = 0; i < nn; i++) {
            if (((lhs, rhs) => lhs || rhs)(i < low, i > high)) {
                this.d[i] = this.H[i][i];
                this.e[i] = 0.0;
            }
            for (let j = Math.max(i - 1, 0); j < nn; j++) {
                norm = norm + Math.abs(this.H[i][j]);
            }
            ;
        }
        ;
        let iter = 0;
        while ((n >= low)) {
            let l = n;
            while ((l > low)) {
                s = Math.abs(this.H[l - 1][l - 1]) + Math.abs(this.H[l][l]);
                if (s === 0.0) {
                    s = norm;
                }
                if (Math.abs(this.H[l][l - 1]) < eps * s) {
                    break;
                }
                l--;
            }
            ;
            if (l === n) {
                this.H[n][n] = this.H[n][n] + exshift;
                this.d[n] = this.H[n][n];
                this.e[n] = 0.0;
                n--;
                iter = 0;
            }
            else if (l === n - 1) {
                w = this.H[n][n - 1] * this.H[n - 1][n];
                p = (this.H[n - 1][n - 1] - this.H[n][n]) / 2.0;
                q = p * p + w;
                z = Math.sqrt(Math.abs(q));
                this.H[n][n] = this.H[n][n] + exshift;
                this.H[n - 1][n - 1] = this.H[n - 1][n - 1] + exshift;
                x = this.H[n][n];
                if (q >= 0) {
                    if (p >= 0) {
                        z = p + z;
                    }
                    else {
                        z = p - z;
                    }
                    this.d[n - 1] = x + z;
                    this.d[n] = this.d[n - 1];
                    if (z !== 0.0) {
                        this.d[n] = x - w / z;
                    }
                    this.e[n - 1] = 0.0;
                    this.e[n] = 0.0;
                    x = this.H[n][n - 1];
                    s = Math.abs(x) + Math.abs(z);
                    p = x / s;
                    q = z / s;
                    r = Math.sqrt(p * p + q * q);
                    p = p / r;
                    q = q / r;
                    for (let j = n - 1; j < nn; j++) {
                        z = this.H[n - 1][j];
                        this.H[n - 1][j] = q * z + p * this.H[n][j];
                        this.H[n][j] = q * this.H[n][j] - p * z;
                    }
                    ;
                    for (let i = 0; i <= n; i++) {
                        z = this.H[i][n - 1];
                        this.H[i][n - 1] = q * z + p * this.H[i][n];
                        this.H[i][n] = q * this.H[i][n] - p * z;
                    }
                    ;
                    for (let i = low; i <= high; i++) {
                        z = this.V[i][n - 1];
                        this.V[i][n - 1] = q * z + p * this.V[i][n];
                        this.V[i][n] = q * this.V[i][n] - p * z;
                    }
                    ;
                }
                else {
                    this.d[n - 1] = x + p;
                    this.d[n] = x + p;
                    this.e[n - 1] = z;
                    this.e[n] = -z;
                }
                n = n - 2;
                iter = 0;
            }
            else {
                x = this.H[n][n];
                y = 0.0;
                w = 0.0;
                if (l < n) {
                    y = this.H[n - 1][n - 1];
                    w = this.H[n][n - 1] * this.H[n - 1][n];
                }
                if (iter === 10) {
                    exshift += x;
                    for (let i = low; i <= n; i++) {
                        this.H[i][i] -= x;
                    }
                    ;
                    s = Math.abs(this.H[n][n - 1]) + Math.abs(this.H[n - 1][n - 2]);
                    x = y = 0.75 * s;
                    w = -0.4375 * s * s;
                }
                if (iter === 30) {
                    s = (y - x) / 2.0;
                    s = s * s + w;
                    if (s > 0) {
                        s = Math.sqrt(s);
                        if (y < x) {
                            s = -s;
                        }
                        s = x - w / ((y - x) / 2.0 + s);
                        for (let i = low; i <= n; i++) {
                            this.H[i][i] -= s;
                        }
                        ;
                        exshift += s;
                        x = y = w = 0.964;
                    }
                }
                iter = iter + 1;
                let m = n - 2;
                while ((m >= l)) {
                    z = this.H[m][m];
                    r = x - z;
                    s = y - z;
                    p = (r * s - w) / this.H[m + 1][m] + this.H[m][m + 1];
                    q = this.H[m + 1][m + 1] - z - r - s;
                    r = this.H[m + 2][m + 1];
                    s = Math.abs(p) + Math.abs(q) + Math.abs(r);
                    p = p / s;
                    q = q / s;
                    r = r / s;
                    if (m === l) {
                        break;
                    }
                    if (Math.abs(this.H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(this.H[m - 1][m - 1]) + Math.abs(z) + Math.abs(this.H[m + 1][m + 1])))) {
                        break;
                    }
                    m--;
                }
                ;
                for (let i = m + 2; i <= n; i++) {
                    this.H[i][i - 2] = 0.0;
                    if (i > m + 2) {
                        this.H[i][i - 3] = 0.0;
                    }
                }
                ;
                for (let k = m; k <= n - 1; k++) {
                    let notlast = (k !== n - 1);
                    if (k !== m) {
                        p = this.H[k][k - 1];
                        q = this.H[k + 1][k - 1];
                        r = (notlast ? this.H[k + 2][k - 1] : 0.0);
                        x = Math.abs(p) + Math.abs(q) + Math.abs(r);
                        if (x === 0.0) {
                            continue;
                        }
                        p = p / x;
                        q = q / x;
                        r = r / x;
                    }
                    s = Math.sqrt(p * p + q * q + r * r);
                    if (p < 0) {
                        s = -s;
                    }
                    if (s !== 0) {
                        if (k !== m) {
                            this.H[k][k - 1] = -s * x;
                        }
                        else if (l !== m) {
                            this.H[k][k - 1] = -this.H[k][k - 1];
                        }
                        p = p + s;
                        x = p / s;
                        y = q / s;
                        z = r / s;
                        q = q / p;
                        r = r / p;
                        for (let j = k; j < nn; j++) {
                            p = this.H[k][j] + q * this.H[k + 1][j];
                            if (notlast) {
                                p = p + r * this.H[k + 2][j];
                                this.H[k + 2][j] = this.H[k + 2][j] - p * z;
                            }
                            this.H[k][j] = this.H[k][j] - p * x;
                            this.H[k + 1][j] = this.H[k + 1][j] - p * y;
                        }
                        ;
                        for (let i = 0; i <= Math.min(n, k + 3); i++) {
                            p = x * this.H[i][k] + y * this.H[i][k + 1];
                            if (notlast) {
                                p = p + z * this.H[i][k + 2];
                                this.H[i][k + 2] = this.H[i][k + 2] - p * r;
                            }
                            this.H[i][k] = this.H[i][k] - p;
                            this.H[i][k + 1] = this.H[i][k + 1] - p * q;
                        }
                        ;
                        for (let i = low; i <= high; i++) {
                            p = x * this.V[i][k] + y * this.V[i][k + 1];
                            if (notlast) {
                                p = p + z * this.V[i][k + 2];
                                this.V[i][k + 2] = this.V[i][k + 2] - p * r;
                            }
                            this.V[i][k] = this.V[i][k] - p;
                            this.V[i][k + 1] = this.V[i][k + 1] - p * q;
                        }
                        ;
                    }
                }
                ;
            }
        }
        ;
        if (norm === 0.0) {
            return;
        }
        for (n = nn - 1; n >= 0; n--) {
            p = this.d[n];
            q = this.e[n];
            if (q === 0) {
                let l = n;
                this.H[n][n] = 1.0;
                for (let i = n - 1; i >= 0; i--) {
                    w = this.H[i][i] - p;
                    r = 0.0;
                    for (let j = l; j <= n; j++) {
                        r = r + this.H[i][j] * this.H[j][n];
                    }
                    ;
                    if (this.e[i] < 0.0) {
                        z = w;
                        s = r;
                    }
                    else {
                        l = i;
                        if (this.e[i] === 0.0) {
                            if (w !== 0.0) {
                                this.H[i][n] = -r / w;
                            }
                            else {
                                this.H[i][n] = -r / (eps * norm);
                            }
                        }
                        else {
                            x = this.H[i][i + 1];
                            y = this.H[i + 1][i];
                            q = (this.d[i] - p) * (this.d[i] - p) + this.e[i] * this.e[i];
                            t = (x * s - z * r) / q;
                            this.H[i][n] = t;
                            if (Math.abs(x) > Math.abs(z)) {
                                this.H[i + 1][n] = (-r - w * t) / x;
                            }
                            else {
                                this.H[i + 1][n] = (-s - y * t) / z;
                            }
                        }
                        t = Math.abs(this.H[i][n]);
                        if ((eps * t) * t > 1) {
                            for (let j = i; j <= n; j++) {
                                this.H[j][n] = this.H[j][n] / t;
                            }
                            ;
                        }
                    }
                }
                ;
            }
            else if (q < 0) {
                let l = n - 1;
                if (Math.abs(this.H[n][n - 1]) > Math.abs(this.H[n - 1][n])) {
                    this.H[n - 1][n - 1] = q / this.H[n][n - 1];
                    this.H[n - 1][n] = -(this.H[n][n] - p) / this.H[n][n - 1];
                }
                else {
                    this.cdiv(0.0, -this.H[n - 1][n], this.H[n - 1][n - 1] - p, q);
                    this.H[n - 1][n - 1] = this.cdivr;
                    this.H[n - 1][n] = this.cdivi;
                }
                this.H[n][n - 1] = 0.0;
                this.H[n][n] = 1.0;
                for (let i = n - 2; i >= 0; i--) {
                    let ra;
                    let sa;
                    let vr;
                    let vi;
                    ra = 0.0;
                    sa = 0.0;
                    for (let j = l; j <= n; j++) {
                        ra = ra + this.H[i][j] * this.H[j][n - 1];
                        sa = sa + this.H[i][j] * this.H[j][n];
                    }
                    ;
                    w = this.H[i][i] - p;
                    if (this.e[i] < 0.0) {
                        z = w;
                        r = ra;
                        s = sa;
                    }
                    else {
                        l = i;
                        if (this.e[i] === 0) {
                            this.cdiv(-ra, -sa, w, q);
                            this.H[i][n - 1] = this.cdivr;
                            this.H[i][n] = this.cdivi;
                        }
                        else {
                            x = this.H[i][i + 1];
                            y = this.H[i + 1][i];
                            vr = (this.d[i] - p) * (this.d[i] - p) + this.e[i] * this.e[i] - q * q;
                            vi = (this.d[i] - p) * 2.0 * q;
                            if (((lhs, rhs) => lhs && rhs)(vr === 0.0, vi === 0.0)) {
                                vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
                            }
                            this.cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
                            this.H[i][n - 1] = this.cdivr;
                            this.H[i][n] = this.cdivi;
                            if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
                                this.H[i + 1][n - 1] = (-ra - w * this.H[i][n - 1] + q * this.H[i][n]) / x;
                                this.H[i + 1][n] = (-sa - w * this.H[i][n] - q * this.H[i][n - 1]) / x;
                            }
                            else {
                                this.cdiv(-r - y * this.H[i][n - 1], -s - y * this.H[i][n], z, q);
                                this.H[i + 1][n - 1] = this.cdivr;
                                this.H[i + 1][n] = this.cdivi;
                            }
                        }
                        t = Math.max(Math.abs(this.H[i][n - 1]), Math.abs(this.H[i][n]));
                        if ((eps * t) * t > 1) {
                            for (let j = i; j <= n; j++) {
                                this.H[j][n - 1] = this.H[j][n - 1] / t;
                                this.H[j][n] = this.H[j][n] / t;
                            }
                            ;
                        }
                    }
                }
                ;
            }
        }
        ;
        for (let i = 0; i < nn; i++) {
            if (((lhs, rhs) => lhs || rhs)(i < low, i > high)) {
                for (let j = i; j < nn; j++) {
                    this.V[i][j] = this.H[i][j];
                }
                ;
            }
        }
        ;
        for (let j = nn - 1; j >= low; j--) {
            for (let i = low; i <= high; i++) {
                z = 0.0;
                for (let k = low; k <= Math.min(j, high); k++) {
                    z = z + this.V[i][k] * this.H[k][j];
                }
                ;
                this.V[i][j] = z;
            }
            ;
        }
        ;
    }
    /**
     * Return the eigenvector matrix
     * @return     {Matrix} V
     */
    getV() {
        return new Matrix(this.V, this.n, this.n);
    }
    /**
     * Return the real parts of the eigenvalues
     * @return     {Array} real(diag(D))
     */
    getRealEigenvalues() {
        return this.d;
    }
    /**
     * Return the imaginary parts of the eigenvalues
     * @return     {Array} imag(diag(D))
     */
    getImagEigenvalues() {
        return this.e;
    }
    /**
     * Return the block diagonal eigenvalue matrix
     * @return     {Matrix} D
     */
    getD() {
        let X = new Matrix(this.n, this.n);
        let D = X.getArray();
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                D[i][j] = 0.0;
            }
            ;
            D[i][i] = this.d[i];
            if (this.e[i] > 0) {
                D[i][i + 1] = this.e[i];
            }
            else if (this.e[i] < 0) {
                D[i][i - 1] = this.e[i];
            }
        }
        ;
        return X;
    }
}
EigenvalueDecomposition.serialVersionUID = 1;
EigenvalueDecomposition["__class"] = "Jama.EigenvalueDecomposition";
EigenvalueDecomposition["__interfaces"] = ["java.io.Serializable"];
