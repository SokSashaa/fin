import { stat } from "../helpers/statistics.js";

export default class Button {
    constructor(scene) {
        this.render = (x, y, description) => {
            this.img = scene.add.image(x, y, description).setInteractive().setScale(0.17*stat.koeff, 0.17*stat.koeff);
            this.width = this.img.width*0.17*stat.koeff;
            this.height = this.img.height*0.17*stat.koeff;
            this.x = x;
            this.y = y;
            this.bought = false;
            this.img.on('pointerdown', function() {
                if (this.bought === false){
                    scene.createWindow(description);
                }
            }, this);
            return this.img;
        }
        
    }

}