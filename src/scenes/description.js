import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class Description extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Description'
        });
    }

    preload() {
        this.load.image(`bg1_d_${stat.active_level}`, `src/assets/descriptions/${stat.active_level}1.png`);
        this.load.image(`bg2_d_${stat.active_level}`, `src/assets/descriptions/${stat.active_level}2.png`);
        this.load.image(`bg3_d_${stat.active_level}`, `src/assets/descriptions/${stat.active_level}3.png`);
        this.load.image('button_d', 'src/assets/descriptions/button.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth*0.28, innerHeight/21, `bg${data.par.scene.month}_d_${stat.active_level}`).setScale(0.4*stat.koeff, 0.4*stat.koeff).setOrigin(0);
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var get =  this.add.image(bg.x+bg.width*stat.koeff*0.16, bg.y+bg.height*stat.koeff*0.35, 'button_d').setInteractive().setScale(0.27*stat.koeff, 0.27*stat.koeff);
    
        get.on('pointerdown', function() {
            let par = data.par.scene;
            if (stat.active_level === 'level2'){
                par.players_money += 20000;
            }
            else{
                par.players_money += 42000;
            }
            par.money.setText(par.players_money);

            par.cells[par.active_cell].img.active = false;
            par.cells[par.active_cell].img.setTint(0x696969);
            par.active_cell += 1;

            par.cells[par.active_cell].img.active = true;
            par.cells[par.active_cell].img.setTint(0xffffff);            
            par.opened = false;
            par.scene.stop("Description");
            par.scene.resume();
        });
    }

    update() {
        
    }

}