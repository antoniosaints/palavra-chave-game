import { ConfigMySQL } from "../../../domain/adapters/configMysql";
import { Database } from "../../../domain/adapters/database";
import { User } from "../../../domain/repositories/IUserRepository";
import { UserRepository } from "../../../infra/repositories/userRepository";

export class CreateUserUsecase {
    async createUser(user: User) {
        const config = new ConfigMySQL();
        const database = new Database(config);
        const userRepository = new UserRepository(database);
        return userRepository.save(user);
    }

    async listUsers() {
        const config = new ConfigMySQL();
        const database = new Database(config);
        const userRepository = new UserRepository(database);
        return userRepository.list();
    }
}