import { stat } from '../helpers/statistics.js';

export default class Card {
    constructor(scene, card_type) {
        this.card_type = card_type;
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite).setInteractive().setScale(0.4*stat.koeff, 0.4*stat.koeff);
            scene.input.setDraggable(card);
            return card;
        }
    }
}