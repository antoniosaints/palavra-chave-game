import { IConfig } from "../contracts/IConfig";

export class ConfigMySQL implements IConfig {
  getConfig() {
    return {
      host: "localhost",
      port: 3000,
      status: true,
    };
  }
}
