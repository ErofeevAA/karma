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
        this.play_a_card_from_the_table = new TextBlock(TrainEnum.PLAY_A_CARD_FROM_THE_TABLE, "text-play_a_card_from_the_table");
        this.play_a_card_from_the_table_text = new TextBlock(TrainEnum.PLAY_A_CARD_FROM_THE_TABLE_TEXT, "text-play_a_card_from_the_table_text");
        this.from_bottom_to_top = new TextBlock(TrainEnum.FROM_BOTTOM_TO_TOP, "text-from_bottom_to_top");
        this.from_bottom_to_top_text = new TextBlock(TrainEnum.FROM_BOTTOM_TO_TOP_TEXT, "text-from_bottom_to_top_text");
        this.five_or_less = new TextBlock(TrainEnum.FIVE_OR_LESS, "text-five_or_less");
        this.five_or_less_text = new TextBlock(TrainEnum.FIVE_OR_LESS_TEXT, "text-five_or_less_text");

        this.btn_menu = ModelTrain.createButton(TrainEnum.MENU, 0, 0);
    }

    static createButton(text, x, y) {
        return new TextBlock(text, "text-button");
    }
}

const TrainEnum = {
    MENU: "Вернуться в меню",
    DECK: "В колоде 40 карт (по 2 карты каждого типа) — 32 карты со значением от 1 до 16 и 8 карт кармы.",
    DISTRIBUTION: "РАЗДАЧА КАРТ:",
    DISTRIBUTION_TEXT: "Положите перед каждым игроком по 3 карты в ряд рубашкой вверх. Игроки не смотрят на эти карты. Раздайте игрокам ещё по 3 карты, положив их лицевой стороной вверх на лежащие перед ним карты. Раздайте каждому еще 6 карт, не раскрывая их. Из оставшихся после раздачи карт сформируйте колоду и поместите её на стол рубашкой вверх.",
    GAME_TRAIN: "ХОД ИГРЫ:",
    GAME_TEXT1: "Игроки поочерёдно сбрасывают карты в центр стола. Первый игрок (слева от раздававшего) кладёт любую карту, далее ход передаётся по часовой стрелке. В свой ход игрок должен разыграть карту с большим значением, чем у предыдущей карты, или равным ему. Сначала игрок обязан разыграть все карты из руки, потом – все карты на столе. Игроки переворачивают лежащие рубашкой вверх карты, только когда кладут их в стопку сброса. Если значение такой карты оказалось меньше значения предыдущей карты, игрок забирает себе в руку эту карту и всю стопку сброса. Также игрок забирает себе всю стопку сброса в случаях, когда он не может разыграть нужную карту из руки или из открытых карт со стола.",
    GAME_TEXT2: "Разыграть дубль: Вы можете одновременно разыграть две карты с одинаковым значением либо из руки, либо со стола. Если в стопку сброса было разыграно две карты с одинаковым значением подряд (одним игроком или же в результате ходов двух соседних игроков), разыгравший вторую карту игрок убирает из игры всю стопку сброса и делает ход. В конце своего хода игрок добирает карты из колоды, чтобы у него в руке всегда было как минимум 6 карт, пока в колоде не закончатся карты. Его ход завершается. Следующий игрок кладёт любую карту.\n Если во время хода у игрока заканчиваются карты, он может взять одну из колоды. Этой картой он и должен будет отбиться от карты противника, в противном случае игрок забирает карты этого хода себе. Если же карт в колоде больше нет, игрок берет свои стопки.",
    END_TRAIN: "КОНЕЦ ИГРЫ:",
    END_TEXT: "Игра завершается, как только все игроки, кроме одного, избавятся от своих карт. Этот игрок проигрывает, а все остальные побеждают!",
    KARMA_CARDS: "КАРТЫ КАРМЫ:",
    KARMA_CARDS_TEXT: "Эти карты можно разыграть независимо от значения предыдущей карты. Карты кармы сразу после использования помещаются в стопку уже использованных карт.",
    GIVE_A_STACK_TO_A_FRIEND: "ОТДАТЬ СТОПКУ ДРУГУ (вторая справа):",
    GIVE_A_STACK_TO_A_FRIEND_TEXT: "Отдайте всю стопку сброса другому игроку и уберите карту кармы «Отдать стопку другу» из игры. Стопку сброса можно отдать любому игроку, который еще не успел избавиться от всех своих карт и выйти из игры." +
        "Примечание: После того как вы разыграли карту кармы «Отдать стопку другу», ход передаётся игроку слева от вас, даже если вы только что отдали стопку сброса именно ему.",
    PLAY_A_CARD_FROM_THE_TABLE: "РАЗЫГРАТЬ КАРТУ СО СТОЛА (третья справа):",
    PLAY_A_CARD_FROM_THE_TABLE_TEXT: "Эта карта позволяет вам разыграть одну стопку со стола до того, как вы разыграли все карты из руки. Если перед вами на столе не осталось карт, то вы можете разыграть данную карту из вашей руки, тем самым пропустив свой ход.",
    FROM_BOTTOM_TO_TOP: "СНИЗУ ВВЕРХ (вторая слева):",
    FROM_BOTTOM_TO_TOP_TEXT: "Возьмите карту из-под низа стопки хода и поместите её вверх, положив карту «Снизу вверх» в стопку использованных карт.",
    FIVE_OR_LESS: "ПЯТЬ ИЛИ МЕНЬШЕ (третья слева):",
    FIVE_OR_LESS_TEXT: "Следующий игрок должен разыграть карту со значением меньшим 5 или равным ему или карту кармы.",
};