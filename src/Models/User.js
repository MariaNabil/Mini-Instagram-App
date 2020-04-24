export default class User {

    constructor(userObj) {
        /*this.id = Id;
        this.email = Email;
        this.password = Password;*/
        this.id = userObj.id;
        this.email = userObj.email;
        this.password = userObj.password;
    }

    set setId(val) {
        this.id = val;
    }

    get getId() {
        return this.id;
    }

    set setEmail(val) {
        this.email = val;
    }

    get getEmail() {
        return this.email;
    }

    set setPassword(val) {
        this.password = val;
    }

    get getPassword() {
        return this.password;
    }
}