export default class Post {

    constructor(id, image, place, user) {
        this.id = id;
        this.image = image;
        this.place = place;
        this.user = user;
    }

    set setId(val) {
        this.id = val;
    }

    get getId() {
        return this.id;
    }

    set setImage(val) {
        this.image = val;
    }

    get getImage() {
        return this.image;
    }

    set setPlace(val) {
        this.place = val;
    }

    get getPlace() {
        return this.place;
    }

    set setUserId(val) {
        this.place = val;
    }

    get getUserId() {
        return this.userId;
    }
}