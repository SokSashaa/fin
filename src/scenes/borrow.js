import { stat_record, stat } from '../helpers/statistics.js';

let clicked = false;

export default class Borrow extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Borrow'
        });
        this.tries = 0;
    }

    preload() {
        this.load.image('bg_borrow', `src/assets/level2/borrow/bg.png`);
        this.load.image('borrow_borrow', 'src/assets/level2/borrow/borrow.png');
        this.load.image('cross_borrow', 'src/assets/common/cross.png');
        this.load.image('input_borrow', 'src/assets/level2/save/input.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth/3, innerHeight/12, 'bg_borrow').setScale(0.33*stat.koeff, 0.33*stat.koeff).setOrigin(0).setInteractive();
        var bg_width = bg.width*0.33*stat.koeff;
        var bg_height = bg.height*0.33*stat.koeff;
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var input = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.72, 'input_borrow').setScale(0.27*stat.koeff, 0.27*stat.koeff);
        var textEntry = this.add.text(bg.x+bg_width*0.2, bg.y+bg_height*0.68, '', { font: `${58*stat.koeff}px Courier`, fill: '#000000' });
        var borrow = this.add.image(bg.x+bg_width*0.43, bg.y+bg_height*0.87, 'borrow_borrow').setInteractive().setScale(0.22*stat.koeff, 0.22*stat.koeff);
        var cross = this.add.image(bg.x+bg_width*0.97, bg.y*1.05, 'cross_borrow').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                var tmp = textEntry.text.substr(0, textEntry.text.length - 1);
                textEntry.setText(tmp);
            }
            else if (event.keyCode >= 48 && event.keyCode < 58)
            {
                textEntry.setText(textEntry.text+event.key);
            };

        });

        borrow.on('pointerdown', function() {
            let par = data.par.scene;
            let number = parseInt(textEntry.text);
            if (par.players_borrow + number <= 3000 && number > 0)
            {
                par.score -= (number/500)*0.5 + 0.5; 
                par.players_borrow += number;
                par.players_debt += number;
                par.players_money += number;
                par.money.setText(par.players_money);
                par.debt.setText(par.players_debt);
                par.score_txt.setText(par.score);
                par.scene.stop("Borrow");
                par.scene.resume();
            }
        }, this);

        cross.on('pointerdown', function() {
            let par = data.par.scene;
            par.scene.stop("Borrow");
            par.scene.resume();
        }, this);
    }

    update() {
        
    }
}