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

    constructor() {
        this.list_rooms = [];
        this.table = [{
            host: TableEnum.HOST,
            num_users: TableEnum.NUM,
            button: new TextBlock(null, null),
        }];
        this.buttons_connect = [];
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
                    button: new TextBlock(TableEnum.CHECK_MARK, ""),
                };
                cur_class.table.push(tmp);
            }
            cur_class.callbackGetRooms();
        });
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