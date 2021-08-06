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

    <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
    <div class="flip-card-back">
        <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
  </div>
</div>

    createHTML() {
        for (let card of this.cards) {
            const div = document.createElement('div');
            div.classList = 'card';
            div.innerText = card.ref;
            this.gameContainer.appendChild(div);
        }
    }
}