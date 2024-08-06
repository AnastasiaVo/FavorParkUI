export class User {
    constructor(
        public Id :string,
        public FirstName :string,
        public LastName: string,
        public PhoneNumber: string,
        public Email: string,
        public Admin: boolean
    ){}
}