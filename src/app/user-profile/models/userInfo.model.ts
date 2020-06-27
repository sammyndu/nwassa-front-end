export class UserInfo{
    constructor(
        public id?: string,
        public firstName?: string,
        public lastName?: string,
        public phoneNumber?: string,
        public email?: string,
        public bvn?: string,
        public passportPhoto?: string,
        public validIdPhoto?: string
    ) {}

    public fromdto(dto: any) {
        this.id = dto.id;
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
        this.phoneNumber = dto.phoneNumber;
        this.email = dto.email;
        this.bvn = dto.bvn;
    }
}
