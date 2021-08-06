import Cards from './cards.js';


export default class Game {
    constructor() {
        this.cards = new Cards();
    }

    new() {
        this.cards.shuffleCards();
        this.cards.createHTML();
        this.addListeners();
    }

    addListeners() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, i) => card.addEventListener('click', this.cards.flipCard));
    }
};