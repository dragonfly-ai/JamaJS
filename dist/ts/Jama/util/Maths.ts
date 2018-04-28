/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
export class Maths {
    /**
     * sqrt(a^2 + b^2) without under/overflow.
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    public static hypot(a : number, b : number) : number {
        let r : number;
        if(Math.abs(a) > Math.abs(b)) {
            r = b / a;
            r = Math.abs(a) * Math.sqrt(1 + r * r);
        } else if(b !== 0) {
            r = a / b;
            r = Math.abs(b) * Math.sqrt(1 + r * r);
        } else {
            r = 0.0;
        }
        return r;
    }
}
Maths["__class"] = "Jama.util.Maths";



