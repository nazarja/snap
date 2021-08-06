import cards from '../json/cards.json' assert { type: "json" };
import _ from './select.js';

export default class Cards {

    constructor() {
        this.moves = 0;
        this.timeout = false;
        this.firstCard = null;
        this.container = _.q('#game-container');
        this.movesContainer = _.q('#moves');
        this.cards = [...cards, ...cards];
        this.count = 0;
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

    check(event, i) {
        if (!this.timeout) {
            const [ref, currentCard] = [event.currentTarget.dataset.ref, event.currentTarget];
            this.flip(currentCard, 180);

            if (this.firstCard === null) {
                this.firstCard = { ref: ref, index: i, card: currentCard};
                return false;
            }
            else if (this.firstCard.index === i) {
                return;
            }
            else if (this.firstCard !== null) {
                this.timeout = true;

                if (ref === this.firstCard.ref) {
                    _.q('h1').style.color = 'goldenrod';
                    setTimeout(() => _.q('h1').style.color = '#fff', 1000);
                    currentCard.style.pointerEvents = 'none';
                    this.firstCard.card.style.pointerEvents = 'none';
                    this.firstCard = null;
                    this.timeout = false;
                    this.count++;

                    if (this.count === this.cards.length / 2) return true;
                }
                else {
                    setTimeout(() => {
                        this.flip(currentCard, 0);
                        this.flip(this.firstCard.card, 0);
                        this.firstCard = null;
                        this.timeout = false;
                    }, 1500);
                };

                this.incrementMoves();
            };
        };
    };

    flip(card, degrees) {
        const inner = card.querySelector('.card-inner');
        inner.style.transform = `rotateY(${degrees}deg)`;
    }

    incrementMoves() {
        _.q('#moves').innerText = `${++this.moves} Moves`;
    };

    reset() {
        while (this.container.firstChild)
            this.container.removeChild(this.container.firstChild);

        this.movesContainer.innerText = '0 Moves';
    };
}