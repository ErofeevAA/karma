class ModelMenu {

    constructor(canvas_width) {
        let x = (canvas_width / 2) - MenuEnum.WIDTH / 2;
        this.header = new MenuHeader(MenuEnum.HEADER, x, 20, MenuEnum.WIDTH);
        let y = 50;
        let dy = 50;
        this.btn_multiplayer = this._createButton(MenuEnum.MULTIPLAYER, x, y);
        y += dy;
        this.btn_single = this._createButton(MenuEnum.SINGLE_PLAYER, x, y);
        y += dy;
        this.btn_train = this._createButton(MenuEnum.TRAINING, x, y);
        y += dy;
        this.btn_about = this._createButton(MenuEnum.ABOUT, x, y);
    }

    _createButton(text, x, y) {
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

    constructor(text, x, y, width, height) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = height / 2;
    }

    onClick(func) {
        console.log(this.text + "button");
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