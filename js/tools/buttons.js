class Button {
    func_click;

    constructor(text, x, y) {
        this.text = text;
        this.x = x;
        this.y = y;
    }

    set func_click(func) {
        this.func_click = func;
    }

    checkClickButton(x, y) {return false;}

    onClick(x, y) {
        if (this.checkClickButton(x, y)) {
            this.func_click();
        }
    }
}

class TextButton extends Button {

    constructor(text, x, y, pt) {
        super(text, x, y);
        this.pt = pt;
        this.width = 0;
        this.height = 50;
    }

    setSize(width) {
        this.width = width;
        //this.height = width / this.text.length;
        console.log(`width ${this.width} height ${this.height}`);
    }

    checkClickButton(x, y) {
        let b_x = this.x - this.width / 2;
        let b_y = this.y - this.height;
        return (b_x + this.width >= x && b_y + this.height - 15 >= y) && (x >= b_x && y >= b_y);
    }
}

class RoundedButton extends Button {

    constructor(text, x, y, width, height) {
        super(text, x, y);
        this.width = width;
        this.height = height;
        this.radius = height / 2;
    }

    checkClickButton(x, y) {
        let rad = this.radius;
        let dx = this.x - x;
        let dy = this.y + rad - y;
        if (dx * dx + dy * dy <= rad * rad) {
            return true;
        }
        dx = this.x + this.width - x;
        if (dx * dx + dy * dy <= rad * rad) {
            return true;
        }
        return (this.x + this.width >= x && this.y + this.height >= y) && (x >= this.x && y >= this.y);
    }
}

class RoundButton extends Button {

    constructor(text, x, y, radius) {
        super(text, x, y);
        this.radius = radius;
    }

    checkClickButton(x, y) {
        let rad = this.radius;
        let dx = this.x - x;
        let dy = this.y + rad - y;
        return dx * dx + dy * dy <= rad * rad;
    }
}