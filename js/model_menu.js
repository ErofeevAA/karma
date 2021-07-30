class ModelMenu {

    constructor() {
        this.header = new TextBlock(MenuEnum.HEADER, "text-header");
        this.btn_multiplayer = ModelMenu.createButton(MenuEnum.MULTIPLAYER, 0, 0);
        this.btn_train = ModelMenu.createButton(MenuEnum.TRAINING, 0, 0);
        this.btn_about = ModelMenu.createButton(MenuEnum.ABOUT, 0, 0);
    }

    static createButton(text, x, y) {
        /*let width = MenuEnum.WIDTH;
        let height = MenuEnum.HEIGHT;*/
        return new TextBlock(text, "text-button");
    }
}

const MenuEnum = {
    HEADER: "It's KARMA",
    MULTIPLAYER: "Мультиплеер",
    TRAINING: "Правила",
    ABOUT: "О нас",
};