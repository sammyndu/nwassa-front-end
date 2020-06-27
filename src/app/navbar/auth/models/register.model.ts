export class RegisterModel {
    constructor(
        public email?: string,
        public phoneNumber?: string,
        public password?: string,
        public confirmPassword?: string,
        public firstName?: string,
        public lastName?: string) {}
}
