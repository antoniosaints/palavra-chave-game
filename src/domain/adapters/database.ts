import { IConfig } from "../contracts/IConfig";

export class Database {
  constructor(private readonly config: IConfig) {}
  getConnection() {
    const config = this.config.getConfig();
    return config;
  }
}
