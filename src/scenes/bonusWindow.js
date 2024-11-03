import { stat } from "../helpers/statistics.js";

export default class BonusWindow extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'BonusWindow'
        });
        this.click = null;
    }

    preload() {
        if (stat.active_level === 'level2')
        {
            this.load.image('skiing_bw', 'src/assets/level2/bonusWindow/level2/skiing.png');
            this.load.image('karting_bw', 'src/assets/level2/bonusWindow/level2/karting.png');
            this.load.image('voucher_bw', 'src/assets/level2/bonusWindow/level2/voucher.png');
            this.load.image('golf_bw', 'src/assets/level2/bonusWindow/level2/golf.png');
            this.load.image('lasertag_bw', 'src/assets/level2/bonusWindow/level2/lasertag.png');
            this.load.image('ship_bw', 'src/assets/level2/bonusWindow/level2/ship.png');
        }
        else{
            this.load.image('bike_bw', 'src/assets/level2/bonusWindow/level3/bike.png');
            this.load.image('cottage_bw', 'src/assets/level2/bonusWindow/level3/cottage.png');
            this.load.image('oceanarium_bw', 'src/assets/level2/bonusWindow/level3/oceanarium.png');
            this.load.image('planetarium_bw', 'src/assets/level2/bonusWindow/level3/planetarium.png');
            this.load.image('restaurant_bw', 'src/assets/level2/bonusWindow/level3/restaurant.png');
            this.load.image('ship_bw', 'src/assets/level2/bonusWindow/level3/ship.png');
        };
        this.load.image('input_bw', 'src/assets/level2/bonusWindow/input.png');
        this.load.image('anything_bw', 'src/assets/level2/bonusWindow/anything.png');
        this.load.image('saving_bw', 'src/assets/level2/bonusWindow/saving.png');
        this.load.image('pay_bw', 'src/assets/level2/bonusWindow/pay.png');
        this.load.image('pay1_bw', 'src/assets/level2/bonusWindow/pay1.png');
        this.load.image('complete_bw', 'src/assets/level2/bonusWindow/complete.png');
        this.load.image('cross_bw', 'src/assets/common/cross.png');
    }

    create(data) {
        var comp = null;
        var pay = null;
        var cross = null;
        if (data.bg === 'saving_b'){
            data.bg = data.bg.split('_')[0];
            var bg = this.add.image(innerWidth*0.2, innerHeight*0.1, data.bg+'_bw').setScale(0.58*stat.koeff, 0.58*stat.koeff).setOrigin(0);
            var bg_width = bg.width*0.58*stat.koeff;
            var bg_height = bg.height*0.58*stat.koeff;
            this.add.text(bg.x+bg_width*0.61, bg.y+bg_height*0.39, data.par.scene.players_saving, { font: `${80*stat.koeff}px Courier`, fill: '#000000' });
            this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
            comp = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.74, 'complete_bw').setScale(0.475*stat.koeff, 0.475*stat.koeff).setInteractive();
            var cross = this.add.image(bg.x+bg_width*0.965, bg.y+bg_height*0.02, 'cross_bw').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();
        }
        else if(data.bg === 'anything'){
            var bg = this.add.image(innerWidth*0.3, innerHeight*0.03, data.bg+'_bw').setScale(0.4*stat.koeff, 0.4*stat.koeff).setOrigin(0);
            var bg_width = bg.width*0.4*stat.koeff;
            var bg_height = bg.height*0.4*stat.koeff;
            this.add.text(bg.x+bg_width*0.6, bg.y+bg_height*0.17, data.par.scene.players_saving, { font: `${60*stat.koeff}px Courier`, fill: '#000000' });
            this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
            var inp = this.add.image(bg.x+bg_width*0.43, bg.y+bg_height*0.415, 'input_bw').setScale(0.27*stat.koeff, 0.27*stat.koeff).setInteractive();
            this.goal = this.add.text(bg.x+bg_width*0.18, bg.y+bg_height*0.39, '', { font: `${50*stat.koeff}px Courier`, fill: '#000000' });
            var inp1 = this.add.image(bg.x+bg_width*0.43, bg.y+bg_height*0.61, 'input_bw').setScale(0.27*stat.koeff, 0.27*stat.koeff).setInteractive();
            this.price = this.add.text(bg.x+bg_width*0.18, bg.y+bg_height*0.585, '', { font: `${50*stat.koeff}px Courier`, fill: '#000000' });
            pay = this.add.image(bg.x+bg_width*0.43, bg.y+bg_height*0.73, 'pay1_bw').setScale(0.27*stat.koeff, 0.27*stat.koeff).setInteractive();
            comp = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.875, 'complete_bw').setScale(0.32*stat.koeff, 0.32*stat.koeff).setInteractive();
            cross = this.add.image(bg.x+bg_width*0.965, bg.y+bg_height*0.02, 'cross_bw').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();

            inp.on('pointerdown', function() {
                this.click = 'goal';
            }, this);

            inp1.on('pointerdown', function() {
                this.click = 'price';
            }, this);

            pay.on('pointerdown', function() {
                let par = data.par.scene;
                var number = parseInt(this.price.text);
                if (par.players_saving >= number){
                    par.players_saving -= number;

                    if (number < 500 && number !== 0){
                        par.score += 0.5;
                    }
                    else{
                        par.score += number/500;
                    };
                    par.score_txt.setText(par.score);
                    par.saving.setText(par.players_saving);
                    data.but.bought = true;
                    data.but.img.setTint(0x696969);
                    data.but.img.scene.score_txt.setText(par.score);
                    par.scene.stop("BonusWindow");
                    par.scene.resume('Bonus');
                }
                
            }, this);

            this.input.keyboard.on('keydown', function (event) {
                if (this.click === 'price'){
                    if (event.keyCode === 8 && this.price.text.length > 0)
                    {
                        var tmp = this.price.text.substr(0, this.price.text.length - 1);
                        this.price.setText(tmp);
                    }
                    else if (event.keyCode >= 48 && event.keyCode < 58)
                    {
                        this.price.setText(this.price.text+event.key);
                    }
                }
                else if (this.click === 'goal'){
                    if (event.keyCode === 8 && this.price.text.length > 0)
                    {
                        var tmp = this.goal.text.substr(0, this.goal.text.length - 1);
                        this.goal.setText(tmp);
                    }
                    else if(event.keyCode > 64 && event.keyCode < 123){
                        this.goal.setText(this.goal.text+event.key);
                    }
                };

            }, this);
        }
        else{
            var bg = this.add.image(innerWidth*0.3, innerHeight*0.05, data.bg+'_bw').setScale(0.46*stat.koeff, 0.46*stat.koeff).setOrigin(0);
            var bg_width = bg.width*0.46*stat.koeff;
            var bg_height = bg.height*0.46*stat.koeff;
            this.add.text(bg.x+bg_width*0.62, bg.y+bg_height*0.335, data.par.scene.players_saving, { font: `${70*stat.koeff}px Courier`, fill: '#000000' });
            this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
            pay = this.add.image(bg.x+bg_width*0.425, bg.y+bg_height*0.65, 'pay_bw').setScale(0.3*stat.koeff, 0.3*stat.koeff).setInteractive();
            comp = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.835, 'complete_bw').setScale(0.37*stat.koeff, 0.37*stat.koeff).setInteractive();
            cross = this.add.image(bg.x+bg_width*0.965, bg.y+bg_height*0.02, 'cross_bw').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();
        
            pay.on('pointerdown', function() {
                let par = data.par.scene;
                if (par.players_saving >= data.price){
                    par.players_saving -= data.price;

                    if (data.price < 500){
                        par.score += 0.5;
                    }
                    else{
                        par.score += data.price/500;
                    };
                    par.score_txt.setText(par.score);
                    par.saving.setText(par.players_saving);
                    data.but.bought = true;
                    data.but.img.setTint(0x696969);
                    data.but.img.scene.score_txt.setText(par.score);
                    par.scene.stop("BonusWindow");
                    par.scene.resume('Bonus');
                }
                
            }, this);
        };
        

        comp.on('pointerdown', function() {
            let par = data.par.scene;
            if (par.players_saving < 500 && par.players_saving !== 0){
                par.score += 0.5;
            }
            else{
                par.score += par.players_saving/500;
            };
            par.players_saving = 0;
            par.score_txt.setText(par.score);
            par.saving.setText(par.players_saving);
            if (stat.active_level === 'level2'){
                par.scene.launch("Level2Finish", {par: par});
            }
            else{
                par.scene.launch("Level3Finish", {par: par});
            };
            par.scene.stop("BonusWindow");
            par.scene.stop('Bonus');
            par.scene.stop('LevelFinish');
        }, this);
    
        cross.on('pointerdown', function() {
            let par = data.par.scene;
            par.scene.stop("BonusWindow");
            par.scene.resume('Bonus');
        }, this);
    }

    update() {
        
    }

}