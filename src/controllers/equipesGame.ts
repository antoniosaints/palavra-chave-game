type Equipe = {
    id: number
    nome: string
    cor: string
}
interface IEquipesGame {
    getEquipes(): Equipe[]
}
class EquipesGame implements IEquipesGame {
    constructor() { }

    getEquipes(): Equipe[] {
        return [
            {
                id: 1,
                nome: "Azul",
                cor: "blue"
            },
            {
                id: 2,
                nome: "Vermelho",
                cor: "red"
            }
        ]
    }
}