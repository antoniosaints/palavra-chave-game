export type User =  {
    id: number;
    name: string;
    email: string;
    password: string;
}
export interface IUserRepository {
    save(user: Omit<User, "id">): void;
    list(): User[];
    get(id: number): User;
    delete(id: number): boolean;
}