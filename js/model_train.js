class ModelTrain {

    constructor() {
        this.deck = new TextBlock(TrainEnum.DECK, "text-deck");
        this.distribution = new TextBlock(TrainEnum.DISTRIBUTION, "text-distribution");
        this.distribution_text = new TextBlock(TrainEnum.DISTRIBUTION_TEXT, "text-distribution_text");
        this.game_train = new TextBlock(TrainEnum.GAME_TRAIN, "text-game_train");
        this.game_text1 = new TextBlock(TrainEnum.GAME_TEXT1, "text-game_text1");
        this.game_text2 = new TextBlock(TrainEnum.GAME_TEXT2, "text-game_text2");
        this.end_train = new TextBlock(TrainEnum.END_TRAIN, "text-end_train");
        this.end_text = new TextBlock(TrainEnum.END_TEXT, "text-end_text");
        this.karma_cards = new TextBlock(TrainEnum.KARMA_CARDS, "text-karma_cards");
        this.karma_cards_text = new TextBlock(TrainEnum.KARMA_CARDS_TEXT, "text-karma_cards_text");
        this.give_a_stack_to_a_friend = new TextBlock(TrainEnum.GIVE_A_STACK_TO_A_FRIEND, "text-give_a_stack_to_a_friend");
        this.give_a_stack_to_a_friend_text = new TextBlock(TrainEnum.GIVE_A_STACK_TO_A_FRIEND_TEXT, "text-give_a_stack_to_a_friend_text");

        this.btn_menu = ModelTrain.createButton(TrainEnum.MENU, 0, 0);
    }

    static createButton(text, x, y) {
        return new TextBlock(text, "text-button");
    }
}

const TrainEnum = {
    MENU: "Вернуться в меню",
    DECK: "Добро пожаловать в игру КАРМА!!! В колоде 34 карты (по 2 карты каждого типа) — 32 карты со значением от 1 до 16 и 2 карты кармы.",
    DISTRIBUTION: "НАЧАЛО ИГРЫ:",
    DISTRIBUTION_TEXT: "Перед каждым игроком лежат 3 стопки карт лицевой стороной вверх. Игроки не трогают эти карты, а смотрят только на те, которые у них на руках.",
    GAME_TRAIN: "ХОД ИГРЫ:",
    GAME_TEXT1: "Игроки поочерёдно сбрасывают карты в центр стола. Первый игрок, который подствечивается красным, кладёт любую карту, далее ход передаётся по часовой стрелке. В свой ход игрок должен разыграть карту с большим значением, чем у предыдущей карты, или равным ему. Сначала игрок обязан разыграть все карты из руки, потом – все карты на столе. Если значения карт оказались меньше значения предыдущей карты, игрок забирает себе всю стопку сброса, нажав на свой ник. Также игрок забирает себе всю стопку сброса в случаях, когда он не может разыграть нужную карту из руки или из открытых карт со стола.",
    GAME_TEXT2: "Разыграть дубль: Вы можете разыграть две карты с одинаковым значением. Для этого ваш противник должен ответить на ваш ход, картой с одинаковым значением. Результатом будет закрытие всей стопки и отправка ее в зону сброса.",
    END_TRAIN: "КОНЕЦ ИГРЫ:",
    END_TEXT: "Игра завершается, как только все игроки, кроме одного, избавятся от своих карт. Этот игрок проигрывает, а все остальные побеждают!",
    KARMA_CARDS: "КАРТА КАРМЫ:",
    KARMA_CARDS_TEXT: "Эту карту можно разыграть независимо от значения предыдущей карты. Карты кармы сразу после использования помещаются в стопку уже использованных карт.",
    GIVE_A_STACK_TO_A_FRIEND: "ОТДАТЬ СТОПКУ ДРУГУ (вторая слева):",
    GIVE_A_STACK_TO_A_FRIEND_TEXT: "Отдайте всю стопку сброса другому игроку и уберите карту кармы «Отдать стопку другу» из игры. Стопку сброса можно отдать любому игроку, который еще не успел избавиться от всех своих карт и выйти из игры." +
        "Примечание: После того как вы разыграли карту кармы «Отдать стопку другу», ход передаётся игроку слева от вас, даже если вы только что отдали стопку сброса именно ему.",
};