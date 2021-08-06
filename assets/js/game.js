import Cards from './cards.js';
import _ from './select.js';

export default class Game {

    constructor() {
        this.interval = null;
        this.stars = _.qAll('.star');
        this.heading = _.q('h1');
    };

    new() {
        this.time = 0;
        this.heading = 'SNAP!';
        this.cards = new Cards();
        this.cards.reset();
        this.cards.shuffle();
        this.cards.render();
        this.setStars(3, .5, 'white');
        this.listeners();
        this.timer();
    };

    reset() {
        clearInterval(this.interval);
        this.new();
    };

    listeners() {
        _.q('#reset').onclick = () => this.reset();
        _.qAll('.card').forEach((card, i) => card.addEventListener('click', event => {
            if (this.cards.check(event, i, this.interval)) this.done();
        }));
    };

    timer() {
        this.interval = setInterval(() => {
            _.q('#timer').innerText = `${Math.floor(this.time / 60)} Mins ${this.time % 60} Secs`;
            this.time++;
        }, 1000);
    };

    done() {
       const rating = this.cards.moves > 18
        ? 1
        : this.cards.moves > 12
            ? 2
            : 3
        
        clearInterval(this.interval);
        this.heading.innerText = 'You Won!'
        this.setStars(rating, 1, 'gold');
    };

    setStars(rating, opacity, color) {
        for (let i = 0; i < rating; i++) {
            this.stars[i].style.opacity = opacity;
            this.stars[i].style.color = color;
        };
    };
};