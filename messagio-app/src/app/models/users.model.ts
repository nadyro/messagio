class Users {
    _id: String;
    first_name: String;
    last_name: String;
    email: String;
    d_o_b: String;
    bio: String;
    password: String;

    constructor() {
        this.first_name = "";
        this.last_name = "";
        this.email = "";
        this.d_o_b = "";
        this.bio = "";
        this.password = "";
    }
}

export default Users;