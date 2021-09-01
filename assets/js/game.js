import Cards from './cards.js';
import _ from './select.js';

export default class Game {

    constructor() {
        this.interval = null;
        this.heading = _.q('h1');
    };

    new() {
        this.time = 0;
        this.heading.innerText = 'SNAP!';
        this.cards = new Cards();
        this.listeners();
        this.timer();
    };

    reset() {
        clearInterval(this.interval);
        this.new();
    };

    listeners() {
        _.q('#reset').onclick = () => this.reset();
        setTimeout(() => {
            _.qAll('.card').forEach((card, i) => card.addEventListener('click', event => {
                if (this.cards.check(event, i, this.interval)) this.done();
            }));
        }, 1000);
    };

    timer() {
        this.interval = setInterval(() => {
            _.q('#timer').innerText = `${Math.floor(this.time / 60)} Mins ${this.time % 60} Secs`;
            this.time++;
        }, 1000);
    };

    done() {    
        clearInterval(this.interval);
        this.heading.innerText = 'You Won!'
    };
};