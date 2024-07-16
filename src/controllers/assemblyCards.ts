import { BeggingGame } from "./beggingGame";
import { bgColorBlue, bgColorRed, defaultBG, ISESPIAO } from "./constantsGame";

export class AssemblyCards {
    constructor() { }
    private getAssemblyCards() {
        const begginGame = new BeggingGame()
        const words = begginGame.getWords();
        const selectedWords = [];

        const copyWorlds = [...words];
        for (let i = 0; i < begginGame.numberOfCards; i++) {
            const randomIndex = Math.floor(Math.random() * copyWorlds.length);
            selectedWords.push(copyWorlds[randomIndex]);
            copyWorlds.splice(randomIndex, 1);
        }

        return selectedWords;
    }

    public getCardsWithColors() {
        let isEspiao = false;
        const selectedWord = this.getAssemblyCards();
        const wordsWithColors = selectedWord.map((word: string, index: number) => {
            let color;
            let classe;
            let classeDefined;
            let equipeId;
            if (index < 8) {
                color = bgColorBlue;
                classe = !isEspiao ? 'is-random' : 'is-blue-simple';
                classeDefined = 'is-blue';
                equipeId = 1;
            } else if (index < 16) {
                color = bgColorRed;
                classe = !isEspiao ? 'is-random' : 'is-red-simple';
                classeDefined = 'is-red';
                equipeId = 2;
            } else if (index < 17) {
                color = 'black';
                classe = !isEspiao ? 'is-random' : 'is-black-simple';
                classeDefined = 'is-black';
                equipeId = 3;
            } else {
                color = defaultBG;
                classe = 'is-random';
                classeDefined = 'is-other';
                equipeId = 4;
            }
            return { word, color, classe, classeDefined, equipeId };
        });
        wordsWithColors.sort(() => Math.random() - 0.5);

        return wordsWithColors;
    }
}