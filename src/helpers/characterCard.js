import { stat } from '../helpers/statistics.js';

export default class characterCard {
    constructor(scene) {
        this.render = (x, y, sprite, index) => {
            this.img = scene.add.image(x, y, sprite).setScale(0.3*stat.koeff, 0.3*stat.koeff).setInteractive();
            this.index = index;
            if (this.index === scene.activeChar){
                this.img.setScale(0.35*stat.koeff, 0.35*stat.koeff);
            }
            this.img.on('pointerdown', function (event) {
                if (this.index === scene.activeChar){
                    this.img.setScale(0.3*stat.koeff, 0.3*stat.koeff);
                    scene.activeChar = null;
                }
                else{
                    this.img.setScale(0.35*stat.koeff, 0.35*stat.koeff);
                    if (scene.activeChar !== null){
                        scene.characters[scene.activeChar].img.setScale(0.3*stat.koeff, 0.3*stat.koeff);
                    }
                    scene.activeChar = this.index;
                }
            }, this);
            return this.img;
        }
    }
}