import { stat } from '../helpers/statistics.js';

export default class Cell {
    constructor(scene) {
        this.render = (x, y, description) => {
            var desc = description.split(' ');
            if (desc[0] == 'question'){
                this.img = scene.add.image(x, y, desc[0]).setInteractive().setScale(0.17*stat.koeff, 0.17*stat.koeff);
                this.img.type = 'random';
                this.img.description = desc[1];
            }
            else{
                this.img = scene.add.image(x, y, desc[1]).setInteractive().setScale(0.17*stat.koeff, 0.17*stat.koeff);
                this.img.type = desc[0];
                this.img.description = desc[1];
            };
            this.img.active = false;  
            this.img.setTint(0x696969);
            this.img.on('pointerdown', function () {
                if (this.active){
                    scene.createWindow(this.type, this.description);
                };
            });
            this.width = this.img.width*0.17*stat.koeff;
            this.height = this.img.height*0.17*stat.koeff;
            this.x = x;
            this.y = y;
            return this.img;
        }
    }

}