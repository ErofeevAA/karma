class ModelParameters {

    constructor() {
        this.btn_menu = ModelParameters.createButton(ParametersEnum.MENU, 0, 0);
    }

    static createButton(text, x, y) {
        return new TextBlock(text, "text-button");
    }
}

const ParametersEnum = {
    MENU: "Вернуться в меню",
};