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
                cur_class.ref.off('value', function (s){});
                let users = [];
                for (let i = 0; i < snapshot.val().users.length; ++i) {
                    users.push(snapshot.val().users[0].name);
                }
                cur_class.play(users);
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
            this.ref.orderByChild("users/" + i).set({
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
                cur_class.ref.off('value', function (s){});
                let users = [];
                for (let i = 0; i < snapshot.val().users.length; ++i) {
                    users.push(snapshot.val().users[0].name);
                }
                cur_class.field.setPlayers(users);
                cur_class.getDeck();
            }
        });
    }

    getDeck() {
        this.ref.orderByChild("users").on('value', function (snapshot) {
            console.log(snapshot.val());
        });
    }
}