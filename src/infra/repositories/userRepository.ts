import { Database } from "../../domain/adapters/database";
import { IUserRepository, User } from "../../domain/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  private connection;
  constructor(readonly database: Database) {
    this.connection = database.getConnection();
  }
  save(user: User) {
    if (!this.connection.status) return console.log("Connection failed");
    console.log(
      `User saved using ${this.connection.host}:${this.connection.port}`
    );
  }
  list() {
    return [];
  }
  get(id: number) {
    return {
      id,
      name: "John",
      email: "XwJ9A@example.com",
      password: "123456",
    };
  }
  delete(id: number) {
    return true;
  }
}
