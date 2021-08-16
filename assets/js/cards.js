import cards from '../json/cards.json' assert { type: "json" };
import _ from './select.js';

export default class Cards {

    constructor() {
        this.count = 0;
        this.moves = 0;
        this.paused = false;
        this.firstCard = null;
        this.container = _.q('#game-container');
        this.movesElement = _.q('#moves');
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

    check(event, i) {
        // run if game not paused
        if (!this.paused) {
            const [ref, currentCard] = [event.currentTarget.dataset.ref, event.currentTarget];
            this.flip(currentCard, 180);

            // if we have no cards chosen
            if (this.firstCard === null) {
                this.firstCard = { ref: ref, index: i, card: currentCard};
                return false;
            }
            // if the same card is clicked again - return
            else if (this.firstCard.index === i) {
                return;
            }
            // if we are choosing the second card
            else if (this.firstCard !== null) {
                // pause the game to disallow any further clicks
                this.paused = true;

                // if the cards match
                if (ref === this.firstCard.ref) {
                    _.q('h1').style.color = 'goldenrod';
                    setTimeout(() => _.q('h1').style.color = '#fff', 1000);
                    // stop turned cards from being clicked
                    currentCard.style.pointerEvents = 'none';
                    this.firstCard.card.style.pointerEvents = 'none';
                    this.firstCard = null;
                    this.paused = false;
                    this.count++;

                    // if the game is over
                    if (this.count === this.cards.length / 2) return true;
                }
                // flip both cards back over
                else {
                    setTimeout(() => {
                        this.flip(currentCard, 0);
                        this.flip(this.firstCard.card, 0);
                        this.firstCard = null;

                        // unpause game
                        this.paused = false;
                    }, 1500);
                };

                this.movesElement.innerText = `${++this.moves} Moves`;
            };
        };
    };

    flip(card, degrees) {
        const inner = card.querySelector('.card-inner');
        inner.style.transform = `rotateY(${degrees}deg)`;
    }

    reset() {
        while (this.container.firstChild)
            this.container.removeChild(this.container.firstChild);

        this.movesElement.innerText = '0 Moves';
    };
}