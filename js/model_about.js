class ModelAbout {

    constructor() {
        this.contributors = new TextBlock(AboutEnum.CONTRIBUTORS, "text-contributors");
        this.contributor1 = new TextBlock(AboutEnum.CONTRIBUTOR1, "text-contributor1");
        this.contributor2 = new TextBlock(AboutEnum.CONTRIBUTOR2, "text-contributor2");
        this.information = new TextBlock(AboutEnum.INFORMATION, "text-information");
        this.btn_menu = ModelAbout.createButton(AboutEnum.MENU, 0, 0);
    }

    static createButton(text, x, y) {
        return new TextBlock(text, "text-button");
    }
}

const AboutEnum = {
    CONTRIBUTORS: "Авторы:",
    CONTRIBUTOR1: "Ерофеев Артем",
    CONTRIBUTOR2: "Кокарева Анастасия",
    INFORMATION: "Авторы вдохновились настольной игрой Марши Дж. Фалко под названием Карма мини",
    MENU: "Вернуться в меню",
};