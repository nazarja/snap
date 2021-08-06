import Cards from './cards.js';
import _ from './select.js';

export default class Game {

    constructor() {
        this.interval = null;
    };

    new() {
        this.time = 0;
        this.cards = new Cards();
        this.cards.reset();
        this.cards.shuffle();
        this.cards.render();
        this.listeners();
        this.timer();
    };

    reset() {
        clearInterval(this.interval);
        this.new();
    };

    listeners() {
        _.q('#reset').onclick = () => this.reset();
        _.qAll('.card').forEach(card => card.addEventListener('click', event => this.cards.check(event)));
    };

    timer() {
        this.interval = setInterval(() => {
            _.q('#timer').innerText = `${Math.floor(this.time / 60)} Mins ${this.time % 60} Secs`;
            this.time++;
        }, 1000);
    };
};