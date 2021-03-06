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
        super(Number(num));
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
        this.image_path = "assets/playing_cards/karma_cards/" + this.name + ".png";
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
        this.discard_pile = false;
        this.deck = [];
        this.cards_in_fight = [];
        this.karma_in_game = undefined;
        this.num_attacker = -1;
        this.num_first_attacker = -1;
    }

    init(names) {
        for (let i = 0; i < 2; ++i) {
            for (let j = 1; j < 17; ++j) {
                this.deck.push(new NumCard(j));
            }
            this.deck.push(new KarmaCard(CardsEnum.GIVE_STACK));
            /*this.deck.push(new KarmaCard(CardsEnum.PLAY_CARD));
            this.deck.push(new KarmaCard(CardsEnum.BOTTOM_TOP));
            this.deck.push(new KarmaCard(CardsEnum.FIVE_OR_LESS));*/
        }

        this.randomizeDeck();

        this.setPlayers(names);

        for (let i = 0; i < this.players.length; ++i) {
            for (let j = 0; j < 6; ++j) {
                this.players[i].cards_in_hand.push(this.deck.pop());
            }
            for (let j = 0; j < 3; ++j) {
                this.players[i].cards_on_table.push([this.deck.pop(), this.deck.pop()]);
            }
        }
        this.num_attacker = Math.floor(Math.random() * this.players.length);
        this.players[this.num_attacker].state = PlayerState.ATTACKER;
        if (this.num_attacker + 1 === this.players.length) {
            this.players[0].state = PlayerState.DEFENDER;
        } else {
            this.players[this.num_attacker + 1].state = PlayerState.DEFENDER;
        }
        this.num_first_attacker = this.num_attacker;
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
                this.players[i].cards_on_table.push([this.typeCard(cards[i].cards_on_table[j][0]),
                    this.typeCard(cards[i].cards_on_table[j][1])]);
            }
        }
    }

    setDeck(deck_name) {
        //console.log("setDeck");
        //console.log(deck_name);
        for (let i = 0; i < deck_name.length; ++i) {
            //console.log(deck_name[i]);
            this.deck.push(this.typeCard(deck_name[i]));
        }
    }

    typeCard(card) {
        return (typeof card === 'number') ? new NumCard(card) : new KarmaCard(card);
    }

    randomizeDeck() {
        for (let k = 0; k < 10; ++k) {
            for (let i = 0; i < this.deck.length; ++i) {
                let j = Math.floor(Math.random() * this.deck.length);
                let tmp = this.deck[i];
                this.deck[i] = this.deck[j];
                this.deck[j] = tmp;
            }
        }
    }

    getAllTable() {
        let j = this.num_attacker;
        for (let i = 0; i < this.players[j].cards_on_table.length; ++i) {
            this.players[j].cards_in_hand.push(this.players[j].cards_on_table[i].pop());
            this.players[j].cards_in_hand.push(this.players[j].cards_on_table[i].pop())
        }
        this.players[j].cards_on_table.pop();
        this.players[j].cards_on_table.pop();
        this.players[j].cards_on_table.pop();
    }

    getIndexCard(cards, name) {
        for (let i = 0; i < cards.length; ++i) {
            if (cards[i].name === name) {
                return i;
            }
        }
    }

    abandonCards(num_player) {
        this.karma_in_game = undefined;
        for (let i = 0; i < this.players.length; ++i) {
            if (i === num_player) {
                while (this.cards_in_fight.length > 0) {
                    this.players[num_player].cards_in_hand.push(this.cards_in_fight.pop());
                }
                continue;
            }
            while (this.players[i].cards_in_hand.length < 6 && this.deck.length > 0) {
                this.players[i].cards_in_hand.push(this.deck.pop());
            }
        }
    }


    move(move) {
        console.log("move", move);
        if (typeof move === "string") {
            if (move === CardsEnum.GIVE_STACK) {
                this.karma_in_game = new KarmaCard(CardsEnum.GIVE_STACK);
                let index = this.getIndexCard(this.players[this.num_attacker].cards_in_hand, move);
                this.karmaCardsInFight(this.karma_in_game, index);
            }
            if (move === CardsEnum.PLAY_CARD) {
                this.karma_in_game = new KarmaCard(CardsEnum.PLAY_CARD);
                let index = this.getIndexCard(this.players[this.num_attacker].cards_in_hand, move);
                this.karmaCardsInFight(this.karma_in_game, index);
            }
            return;
        }
        if (typeof move === 'number') {
            let last = this.cards_in_fight.length - 1;
            let cards = this.players[this.num_attacker].cards_in_hand;
            //console.log("num_attacker " + this.num_attacker);
            //console.log(cards);
            let index = this.getIndexCard(cards, move);
            //console.log(index);
            if (last === -1 || move > this.cards_in_fight[last].name) {
                //console.log('if no less');
                this.cardNoLessInFight(cards[index], index);
                return;
            }
            if (move === this.cards_in_fight[last].name) {
                //console.log("if equals");
                this.cardsEqualsInFight(index);
            }
        }
    }

    karmaCardsInFight(card, index) {
        if (card.name === CardsEnum.GIVE_STACK) {
            this.karma_in_game = new KarmaCard(CardsEnum.GIVE_STACK);
            if (this.cards_in_fight.length === 0) {
                this.karma_in_game = undefined;
                this.discard_pile = true;
            }
            this.players[this.num_attacker].cards_in_hand.splice(index, 1);
            if (this.players[this.num_attacker].cards_in_hand.length === 0) {
                if (this.deck.length === 0) {
                    this.getAllTable();
                } else {
                    this.players[this.num_attacker].cards_in_hand.push(this.deck.pop());
                }
            }
            this.changeAttacker();
        }
        if (card.name === CardsEnum.PLAY_CARD) {
            this.karma_in_game = new KarmaCard(CardsEnum.PLAY_CARD);
            this.players[this.num_attacker].cards_in_hand.splice(index, 1);
            this.takeFromTable();
            this.changeAttacker();
        }
        //this.changeAttacker();
    }

    takeFromTable() {
        this.karma_in_game = undefined;
        let i = this.players[this.num_attacker].cards_on_table.length - 1;
        this.players[this.num_attacker].cards_in_hand.push(this.players[this.num_attacker].cards_on_table[i].pop());
        this.players[this.num_attacker].cards_in_hand.push(this.players[this.num_attacker].cards_on_table[i].pop());
        this.players[this.num_attacker].cards_on_table.pop();
    }

    cardNoLessInFight(card, index) {
        //console.log("card");
        //console.log(card);
        this.cards_in_fight.push(card);
        this.players[this.num_attacker].cards_in_hand.splice(index, 1);
        if (this.players[this.num_attacker].cards_in_hand.length === 0) {
            if (this.deck.length === 0) {
                this.getAllTable();
            } else {
                this.players[this.num_attacker].cards_in_hand.push(this.deck.pop());
            }
        }
        this.changeAttacker();
    }

    cardsEqualsInFight(index) {
        this.cards_in_fight = [];
        this.players[this.num_attacker].cards_in_hand.splice(index, 1);
        for (let i = 0; i < this.players.length; ++i) {
            while (this.players[i].cards_in_hand.length < 6 && this.deck.length > 0) {
                this.players[i].cards_in_hand.push(this.deck.pop());
            }
        }
        if (this.players[this.num_attacker].cards_in_hand.length === 0) {
            if (this.deck.length === 0) {
                this.getAllTable();
            } else {
                this.players[this.num_attacker].cards_in_hand.push(this.deck.pop());
            }
        }
        this.changeFirstAttacker();
        this.discard_pile = true;
    }

    changeFirstAttacker() {
        this.num_first_attacker += 1;
        if (this.num_first_attacker === this.players.length) {
            this.players[0].state = PlayerState.ATTACKER;
            this.players[this.num_first_attacker - 1].state = PlayerState.DEFENDER;
            this.num_first_attacker = 0;
        } else {
            this.players[this.num_first_attacker].state = PlayerState.ATTACKER;
            this.players[this.num_first_attacker - 1].state = PlayerState.DEFENDER;
        }
        this.num_attacker = this.num_first_attacker;
    }

    changeAttacker() {
        this.num_attacker += 1;
        if (this.num_attacker === this.players.length) {
            this.players[0].state = PlayerState.ATTACKER;
            this.players[this.num_attacker - 1].state = PlayerState.DEFENDER;
            this.num_attacker = 0;
        } else {
            this.players[this.num_attacker].state = PlayerState.ATTACKER;
            this.players[this.num_attacker - 1].state = PlayerState.DEFENDER;
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