const firebaseConfig = {
    apiKey: "AIzaSyDfo8iQoQ6o8mPipwzKhfGgkYNTbgtCzyo",
    authDomain: "karma-91661.firebaseapp.com",
    databaseURL: "https://karma-91661-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "karma-91661",
    storageBucket: "karma-91661.appspot.com",
    messagingSenderId: "674103752000",
    appId: "1:674103752000:web:23aaf7a632e1d1ab6bf6a5",
    measurementId: "G-0W61K1N47S"
};

firebase.initializeApp(firebaseConfig);

class ModelListRooms {
    callbackGetRooms;

    constructor(canvas_width) {
        this.column_width = canvas_width / TableEnum.NUM_COLUMN;
        this.list_rooms = [];
        this.table = [{
            host: TableEnum.HOST,
            num_users: TableEnum.NUM}];
        this.buttons_connect = [];
    }

    onClick(x, y) {
        for (let i = 0; i < this.buttons_connect.length; ++i) {
            this.buttons_connect[i].onClick(x, y);
        }
    }

    getRooms() {
        let cur_class = this;
        firebase.database().ref(ConnectEnum.ROOMS).on('value', function (snapshot) {
            let data = snapshot.val();
            cur_class.list_rooms = data;
            for (let i = 0; i < data.length; ++i) {
                let tmp = {
                    host: data[i].host,
                    num_users: data[i].cur_num + '/' + data[i].max_num,
                };
                cur_class.table.push(tmp);
                let x = (cur_class.column_width / 2) * TableEnum.NUM_COLUMN;
                let button = new RoundButton(TableEnum.CHECK_MARK, x, cur_class.countRowY(i), 15);
                button.func_click = function () {
                    console.log("button " + i);
                    return i;
                };
                cur_class.buttons_connect.push(button);
            }
            cur_class.callbackGetRooms();
        });
    }

    countRowY(index) {
        return 30 + index * 20;
    }
}

const ConnectEnum = {
    ROOMS: "rooms/"
}

const TableEnum = {
    HOST: "Владелец",
    NUM: "Кол-во/макс.",
    NUM_COLUMN: 3,
    START_Y: 10,
    CHECK_MARK: "\u2713"
};