class Card {
    constructor(img) {
        this.image = img;
    }
}

class NumCard extends Card {
    constructor(img) {
        super(img);
    }
}

class KarmaCard extends Card {
    constructor(img) {
        super(img);
    }
}

class Player {
    constructor(name) {
        this.cards = [];
        this.state = undefined;
    }
}

class Field {

    constructor() {
        this.players = [];
    }

    add(player) {
        this.players.push(player);
    }
}

class PlayerState {
    static ATTACHED = "ATTACHED";
}