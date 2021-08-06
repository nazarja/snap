import cards from '../json/cards.json' assert { type: "json" };
import _ from './select.js';

export default class Cards {

    constructor() {
        this.moves = 0;
        this.container = _.q('#game-container');
        this.movesContainer = _.q('#moves');
        this.cards = [...cards, ...cards];
    }

    shuffle() {
        this.cards.forEach((card, i, cards) => {
            const randomIndex = Math.floor(Math.random() * i);
            [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
        });
    };

    render() {
        for (let card of this.cards) 
            this.container.innerHTML += this.new(card);
    };

    new(card) {
        return (
            `
            <div class="card" data-ref="${card.ref}">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="assets/img/devicon.png">
                    </div>
                    <div class="card-back">
                        <img src="assets/img/${card.filename}.png">
                    </div>
                </div>
            </div>
            `
        );
    };

    check(event) {
        const ref = event.currentTarget.dataset.ref;
        console.log(ref);
        this.setMoves();
    };

    setMoves() {
        _.q('#moves').innerText = `${++this.moves} Moves`;
    };

    reset() {
        while (this.container.firstChild)
            this.container.removeChild(this.container.firstChild);
            
        this.movesContainer.innerText = '0 Moves';
    };
}