class ModelGameHost {

    constructor(num_room) {
        //this.num_room = num_room;
        this.field = new Field();
        this.ref = firebase.database().ref("rooms/" + num_room);
        this.wait();
    }

    wait() {
        let cur_class = this;
        this.ref.on('value', function (snapshot) {
            console.log(snapshot.val());
            if (snapshot.val().cur_num === snapshot.val().max_num) {
                cur_class.ref.off('values', function (s){});
                cur_class.play(snapshot.users);
            }
        });
    }

    play(names) {
        this.field.init(names);
        this.sendDeck();
    }

    sendDeck() {
        //let cur_class = this;
        for (let i = 0; i < this.field.players; ++i) {
            let cards_in_hands = [];
            for (let j = 0; j < this.field.players[i].cards_in_hand; ++j) {
                cards_in_hands.push(this.field.players[i].cards_in_hand[j].name);
            }
            let cards_on_table = []
            for (let j = 0; j < this.field.players[i].cards_on_table; ++j) {
                cards_on_table.push(this.field.players[i].cards_on_table[j].name);
            }
            this.ref.orderByChild("users/" + i).update({
                cards_in_hand: cards_in_hands,
                cards_on_table: cards_on_table
            });
        }
    }

}

class ModelGameClient {

    constructor(num_room) {
        //this.num_room = num_room;
        this.field = new Field();
        this.ref = firebase.database().ref("rooms/" + num_room);
        this.wait();
    }

    wait() {
        let cur_class = this;
        this.ref.on('value', function (snapshot) {
            console.log(snapshot.val());
            if (snapshot.val().cur_num === snapshot.val().max_num) {
                cur_class.ref.off('values', function (s){});
                cur_class.field.setPlayers(snapshot.val().users);
                cur_class.getDeck(snapshot.users);
            }
        });
    }

    getDeck() {
        this.ref.orderByChild("users").on('value', function (snapshot) {
            console.log(snapshot.val());
        });
    }
}