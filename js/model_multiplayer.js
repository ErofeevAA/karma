class ModelListRooms {

    constructor() {
        this.btn_create_room = new TextBlock("Создать комнату", "text-button");
        this.list_rooms = [];
        this.table = [{
            host: TableEnum.HOST,
            num_users: TableEnum.NUM,
            button: new TextBlock(null, null),
            num_room: -1
        }];
    }

    // noinspection JSUnfilteredForInLoop
    getRooms(callback) {
        let cur_class = this;
        firebase.database().ref(ConnectEnum.ROOMS).get().then(function (snapshot) {
            let data = snapshot.val();
            cur_class.list_rooms = data;
            for (let key in data) {
                // noinspection JSUnfilteredForInLoop
                if (data[key].cur_num === data[key].max_num) {
                    continue;
                }
                // noinspection JSUnfilteredForInLoop
                let tmp = {
                    host: data[key].host,
                    num_users: data[key].cur_num + '/' + data[key].max_num,
                    button: new TextBlock(TableEnum.CHECK_MARK, ""),
                    num_room: Number(key)
                };
                cur_class.table.push(tmp);
            }
            callback();
        });
    }

    findFreeNum() {
        if (!this.list_rooms) {
            return 0;
        }
        for (let i = 0; i < this.list_rooms.length; ++i) {
            if (!this.list_rooms[i]) {
                return i;
            }
        }
        return this.list_rooms.length;
    }

    createRoom(num, name, max_num) {
        firebase.database().ref(ConnectEnum.ROOMS + num).set({
            host: name,
            cur_num: 1,
            max_num: max_num,
            users: {0:  name}
        });
    }

    connectToRoom(num, name) {
        let cur_class = this;
        let u = this.list_rooms[num].users;
        u[1] = name;
        console.log("users in room", u);
        firebase.database().ref(ConnectEnum.ROOMS + num).update({
            cur_num: cur_class.list_rooms[num].cur_num + 1,
            users: u
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