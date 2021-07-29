class Card {

    constructor(name) {
        this.image_path = "";
        this.name = name;
        this.genPath();
    }

    genPath(){}
}

class NumCard extends Card {

    constructor(num) {
        super(num);
    }

    genPath() {
        this.image_path = "assets/playing_cards/number_cards/" + this.name + ".png";
    }
}

class KarmaCard extends Card {

    constructor(name) {
        super(name);
    }

    genPath() {
        this.image_path = "assets/playing_cards/karma_cards" + this.name + ".png";
    }
}

class Player {

    constructor(name) {
        this.name = name;
        this.cards_in_hand = [];
        this.cards_on_table = [];
        this.state = undefined;
    }
}

class Field {

    constructor() {
        this.players = [];
        this.discard_pile = [];
        this.deck = [];
        this.cards_in_fight = [];
    }

    init(names) {
        for (let i = 0; i < 2; ++i) {
            for (let j = 1; j < 17; ++j) {
                let path = CardsEnum.PATH_TO_NUM + j + ".png";
                this.deck.push(new NumCard(path, j));
            }
            this.deck.push(new KarmaCard(CardsEnum.GIVE_STACK));
            this.deck.push(new KarmaCard(CardsEnum.PLAY_CARD));
            this.deck.push(new KarmaCard(CardsEnum.BOTTOM_TOP));
            this.deck.push(new KarmaCard(CardsEnum.FIVE_OR_LESS));
        }

        this.randomizeDeck();

        this.setPlayers(names);

        for (let i = 0; i < this.players.length; ++i) {
            for (let j = 0; j < 3; ++j) {
                this.players[i].cards_in_hand.push(this.deck.pop());
                this.players[i].cards_on_table.push([this.deck.pop(), this.deck.pop()]);
            }
        }
        let num_attacker = Math.floor(Math.random() * this.players.length);
        this.players[num_attacker].state = PlayerState.ATTACKER;
        if (num_attacker + 1 === this.players.length) {
            this.players[0].state = PlayerState.DEFENDER;
        } else {
            this.players[num_attacker + 1].state = PlayerState.DEFENDER;
        }
    }

    setPlayers(names) {
        for (let i = 0; i < names.length; ++i) {
            this.players.push(new Player(names[i]));
        }
    }

    setPlayersCards(cards) {
        for (let i = 0; i < this.players.length; ++i) {
            for (let j = 0; j < cards[i].cards_in_hand.length; ++j) {
                this.players[i].cards_in_hand.push(this.typeCard(cards[i].cards_in_hand[j]));
            }
            for (let j = 0; j < cards[i].cards_on_table.length; ++j) {
                this.players[i].cards_on_table = this.typeCard(cards[i].cards_on_table[j][0],
                    cards[i].cards_on_table[j][1]);
            }
        }
    }

    typeCard(card) {
        return (typeof card === 'number') ? new NumCard(card) : new KarmaCard(card);
    }

    randomizeDeck() {
        for (let k = 0; k < 10; ++k) {
            for (let i = 0; i < this.deck.length; ++i) {
                let j = Math.floor(Math.random() * 40);
                let tmp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = tmp;
            }
        }
    }
}

const PlayerState = {
    ATTACKER: "Attacker",
    DEFENDER: "Defender"
};

const CardsEnum = {
    GIVE_STACK: "give_a_stack",
    PLAY_CARD: "play_a_card_from_the_table",
    BOTTOM_TOP: "from_bottom_to_top",
    FIVE_OR_LESS: "five_or_less"
};