export class BeggingGame {
    public numberOfCards: number;
    private words: string[] = [
        "ABOBORA",
        "CEBOLA",
        "ICE",
        "CARVÃO",
        "VIAGEM",
        "LUTA",
        "DESTINO",
        "CAMINHAR",
        "CIDADE",
        "ALMOÇO",
        "VELHO",
        "LULA",
        "CREATINA",
        "SUCO",
        "CIDADANIA",
        "OUVIDO",
        "VERDADE",
        "COPO",
        "COMPUTADOR",
        "PRATO",
        "ÓCULOS",
        "FONE",
        "MOUSE",
        "PERFUME",
        "CADEIRA",
        "CASA",
        "FILHO",
        "PAIS",
        "FAMILIA",
        "ESCOLA",
        "PAPEL",
        "TAMANHO",
        "CAIXA",
        "EMANUEL"
    ];
    constructor() {
        this.numberOfCards = 25;
    }

    public defineWords(words = []): void {
        this.words.push(...words);
    }

    public getWords(): string[] {
        return this.words;
    }
}