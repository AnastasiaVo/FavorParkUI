export class RegisterUser {
  constructor(
    public email: string,
    public password: string,
    public confirmPassword: string,
    public phoneNumber: string,
    public firstName: string,
    public lastName: string
  ) { }
}