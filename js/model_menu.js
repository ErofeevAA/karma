class ModelMenu {

    constructor(canvas_width) {
        let x = 180;
        this.header = new MenuHeader(MenuEnum.HEADER, x, 40, MenuEnum.WIDTH);
        x = MenuEnum.BUTTON_X;
        let y = MenuEnum.BUTTON_Y;
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
        /*let width = MenuEnum.WIDTH;
        let height = MenuEnum.HEIGHT;*/
        return new TextButton(text, x, y, 20);
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

const MenuEnum = {
    HEADER: "Карма",
    MULTIPLAYER: "Мультиплеер",
    SINGLE_PLAYER: "Одиночная игра",
    TRAINING: "Обучение",
    ABOUT: "О нас",
    WIDTH: 70,
    HEIGHT: 40,
    BUTTON_X: 210,
    BUTTON_Y: 180
};