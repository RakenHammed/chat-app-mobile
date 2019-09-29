export class User {
  constructor(
    public _id?: string,
    public email?: string,
    public password?: string,
    public firstName?: string,
    public lastName?: string,
    public createdAt?: string,
    public updatedAt?: string,
  ) { }
}
