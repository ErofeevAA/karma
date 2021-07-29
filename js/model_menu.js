class ModelMenu {

    constructor() {
        this.header = new TextBlock(MenuEnum.HEADER, "text-header");
        this.btn_multiplayer = ModelMenu.createButton(MenuEnum.MULTIPLAYER, 0, 0);
        this.btn_single = ModelMenu.createButton(MenuEnum.SINGLE_PLAYER, 0, 0);
        this.btn_train = ModelMenu.createButton(MenuEnum.TRAINING, 0, 0);
        this.btn_parameters = ModelMenu.createButton(MenuEnum.PARAMETERS, 0, 0);
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
    SINGLE_PLAYER: "Одиночная игра",
    TRAINING: "Правила",
    PARAMETERS: "Параметры",
    ABOUT: "О нас",
};