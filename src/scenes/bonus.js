import { stat } from "../helpers/statistics.js";
import Button from '../helpers/button.js';

export default class Bonus extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Bonus'
        });

        this.level2buttons_img = [
            'skiing',
            'karting',
            'voucher',
            'golf',
            'ship',
            'lasertag',
            'anything',
            'saving_b'
        ];

        this.level3buttons_img = [
            'planetarium',
            'oceanarium',
            'restaurant',
            'bike',
            'ship',
            'cottage',
            'anything',
            'saving_b'
        ];

        this.level2prices = {
            'skiing': 5000,
            'karting': 4000,
            'voucher': 4000,
            'golf': 4000,
            'ship': 3000,
            'lasertag': 2500
        };

        this.level3prices = {
            'planetarium': 6000,
            'oceanarium': 7000,
            'restaurant': 4500,
            'bike': 7000,
            'ship': 9000,
            'cottage': 7500
        };

        this.buttons = {};
    }

    preload() {
        this.load.image('bg_b', 'src/assets/level2/bonus/bg.png');
        this.load.image('score_b', 'src/assets/level2/bonus/score.png');
        this.load.image('exitBonus','src/assets/windows/close.png')
        if (stat.active_level === 'level2'){
            this.load.image('skiing', 'src/assets/level2/bonus/level2/skiing.png');
            this.load.image('karting', 'src/assets/level2/bonus/level2/karting.png');
            this.load.image('voucher', 'src/assets/level2/bonus/level2/voucher.png');
            this.load.image('golf', 'src/assets/level2/bonus/level2/golf.png');
            this.load.image('lasertag', 'src/assets/level2/bonus/level2/lasertag.png');
        }
        else{
            this.load.image('bike', 'src/assets/level2/bonus/level3/bike.png');
            this.load.image('cottage', 'src/assets/level2/bonus/level3/cottage.png');
            this.load.image('oceanarium', 'src/assets/level2/bonus/level3/oceanarium.png');
            this.load.image('planetarium', 'src/assets/level2/bonus/level3/planetarium.png');
            this.load.image('restaurant', 'src/assets/level2/bonus/level3/restaurant.png');
        };
        this.load.image('ship', 'src/assets/level2/bonus/ship.png');
        this.load.image('anything', 'src/assets/level2/bonus/anything.png');
        this.load.image('saving_b', 'src/assets/level2/bonus/saving.png');
    }

    create(data) {
        this.par = data.par.scene;
        var bg = this.add.image(innerWidth*0.15, innerHeight*0.1, 'bg_b').setScale(0.7*stat.koeff, 0.7*stat.koeff).setOrigin(0);
        var bg_width = bg.width*0.7*stat.koeff;
        var bg_height = bg.height*0.7*stat.koeff;
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var exitBonus = this.add.image(bg.x+bg_width*0.875, bg.y+bg_height*0.130, 'exitBonus').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
        this.add.image(bg.x+bg_width*0.075, bg.y+bg_height*0.075, 'score_b').setScale(0.3*stat.koeff, 0.3*stat.koeff).setOrigin(0);
        this.score_txt = this.add.text(bg.x+bg_width*0.22, bg.y+bg_height*0.10, data.par.score, { font: `${50*stat.koeff}px Courier`, fill: '#ffede4' });

        exitBonus.on('pointerdown',
            function (event) {
                this.scene.launch("Level2Finish", {par:data.par});
                this.scene.stop('Bonus');
                this.scene.stop('LevelFinish');
            },
            this)

        if (stat.active_level === 'level2'){
            this.buttons_img = this.level2buttons_img;
            this.prices = this.level2prices;
        }
        else{
            this.buttons_img = this.level3buttons_img;
            this.prices = this.level3prices;
        };
        for (let i = 0; i < 4; i++){
            var tmp = new Button(this);
            tmp.render(bg.x+bg_width*(0.15+0.23*(i)), bg.y+bg_height*0.4, this.buttons_img[i]);
            this.buttons[this.buttons_img[i]] = tmp;
        };

        for (let i = 0; i < 4; i++){
            var tmp = new Button(this);
            tmp.render(bg.x+bg_width*(0.15+0.23*(i)), bg.y+bg_height*0.8, this.buttons_img[i+4]);
            this.buttons[this.buttons_img[i+4]] = tmp;
        };



    }

    update() {

    }

    createWindow(description){
        this.scene.launch('BonusWindow', {par:this.par, bg: description, price: this.prices[description], but: this.buttons[description]});
        this.scene.pause('Bonus');
    }

}