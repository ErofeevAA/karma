class ModelMenu {

    constructor(canvas_width) {
        let x = (canvas_width / 2) - MenuEnum.WIDTH / 2;
        this.header = new MenuHeader(MenuEnum.HEADER, x, 40, MenuEnum.WIDTH);
        let y = 50;
        let dy = 50;
        this.btn_multiplayer = ModelMenu.createButton(MenuEnum.MULTIPLAYER, x, y);
        y += dy;
        this.btn_single = ModelMenu.createButton(MenuEnum.SINGLE_PLAYER, x, y);
        y += dy;
        this.btn_train = ModelMenu.createButton(MenuEnum.TRAINING, x, y);
        y += dy;
        this.btn_about = ModelMenu.createButton(MenuEnum.ABOUT, x, y);
    }

    onClick(x, y) {
        this.btn_multiplayer.onClick(x, y);
        this.btn_single.onClick(x, y);
        this.btn_train.onClick(x, y);
        this.btn_about.onClick(x, y);
    }

    static createButton(text, x, y) {
        let width = MenuEnum.WIDTH;
        let height = MenuEnum.HEIGHT;
        return new MenuButton(text, x, y, width, height);
    }
}

class MenuHeader {

    constructor(text, x, y, width) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
    }
}

class MenuButton {
    func_click;

    constructor(text, x, y, width, height) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = height / 2;
    }

    set func_click(func) {
        this.func_click = func;
    }

    onClick(x, y) {
        if (this.checkClickButton(x, y)) {
            this.func_click();
        }
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


class MenuEnum {
    static HEADER = "Карма";
    static MULTIPLAYER = "Мультиплеер";
    static SINGLE_PLAYER = "Одиночная игра";
    static TRAINING = "Обучение";
    static ABOUT = "О нас";
    static WIDTH = 70;
    static HEIGHT = 40;
}