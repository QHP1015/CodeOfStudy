{
    interface IPoint {
        drwaPoint: () => void;
        getDistance: (p: IPoint) => number;
        x: number;
        y: number
    }

    class Point implements IPoint {
        constructor(private _x: number, private _y: number) {
        };
        drwaPoint = () => console.log('x:', this._x, 'y:', this._y);
        getDistance = (p: IPoint) => {
            return Math.pow(p.x - this._x, 2) + Math.pow(p.y - this._y, 2)
        };

        set x(value: number) {
            if (value < 0) {
                throw new Error("value should >0")
            }
            this._x = value;
        }
        get x() {
            return this._x;
        }
        set y(value: number) {
            if (value < 0) {
                throw new Error("value should >0")
            }
            this._y = value;
        }
        get y() {
            return this._y;
        }
    }
}

let str1 = 'left' as const
const str2 = 'left'
