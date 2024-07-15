type ConfigHost = {
    host: string,
    port: number,
    status: boolean
}
export interface IConfig {
    getConfig(): ConfigHost
}