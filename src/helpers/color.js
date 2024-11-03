import { stat } from '../helpers/statistics.js';

export default class Color {
    constructor(scene, place, color) {
        this.place = place;
        this.color = color;
        this.scene = scene;
        this.render = (x, y, sprite) => {
            let color = scene.add.image(x, y, sprite).setScale(0.14*stat.koeff, 0.14*stat.koeff).setInteractive();
            color.on('pointerdown', function (event) {
                var l = this.scene.appereance.split('_');
                l[this.place] = this.color;
                var newAppereance = l.join('_');
                if (newAppereance != this.scene.appereance){
                    this.scene.appereance = newAppereance;
                    this.scene.character.destroy();
                    this.scene.character = this.scene.add.image(innerWidth*0.275, innerHeight*0.5, this.scene.appereance).setScale(0.14*stat.koeff, 0.14*stat.koeff).setInteractive();
                }
            }, this);
            return color;
        }
    }
}