import cards from './cards.json' assert { type: "json" };

export default class Cards {
    constructor() {
        this.gameContainer = document.querySelector('#game-container');
        this.cards = [...cards, ...cards];
    }

    shuffleCards() {
        this.cards.forEach((card, i) => {
            const randomIndex = Math.floor(Math.random() * i);
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
        });
    }

    createHTML() {
        for (let i of this.cards) {
            this.gameContainer.innerHTML += this.createCard(i);
        };
    }

    createCard(i) {
        return (
            `
            <div class="card" data-ref="${i.ref}">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="assets/img/devicon.png">
                    </div>
                    <div class="card-back">
                        <img src="assets/img/${i.filename}.png">
                    </div>
                </div>
            </div>
            `
        );
    }

    flipCard(event) {
        console.log(event.currentTarget.dataset.ref)
    }
}