import Cards from './cards.js';


export default class Game {
    constructor() {
        this.cards = new Cards();
    }

    new() {
        this.cards.shuffleCards();
        this.cards.createHTML();
    }
};