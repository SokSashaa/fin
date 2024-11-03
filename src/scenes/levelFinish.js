import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class LevelFinish extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'LevelFinish'
        });
    }

    preload() {
        this.load.image('bg_lf', 'src/assets/level2/levelFinish/bg.png');
        this.load.image('input_lf', 'src/assets/level2/levelFinish/input.png');
        this.load.image('pay_lf', 'src/assets/level2/levelFinish/pay.png');
        this.load.image('finish_lf', 'src/assets/level2/levelFinish/finish.png');
        this.load.image('bonus_lf', 'src/assets/level2/levelFinish/bonus.png');
    }

    create(data) {
        var bg = this.add.image(innerWidth*0.28, innerHeight/20, 'bg_lf').setScale(0.33*stat.koeff, 0.33*stat.koeff).setOrigin(0);
        var bg_width = bg.width*0.33*stat.koeff;
        var bg_height = bg.height*0.33*stat.koeff;
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        this.add.image(bg.x+bg_width*0.42, bg.y+bg_height*0.51, 'input_lf').setScale(0.22*stat.koeff, 0.22*stat.koeff);
        var textEntry = this.add.text(bg.x+bg_width*0.22, bg.y+bg_height*0.48, '', { font: `${stat.koeff*58}px Courier`, fill: '#000000' });
        var pay = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.63, 'pay_lf').setScale(0.27*stat.koeff, 0.27*stat.koeff).setInteractive();
        var bonus = this.add.image(bg.x+bg_width*0.425, bg.y+bg_height*0.755, 'bonus_lf').setScale(0.22*stat.koeff, 0.22*stat.koeff).setInteractive();
        var cont =  this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.88, 'finish_lf').setInteractive().setScale(0.27*stat.koeff, 0.27*stat.koeff);
        this.score = this.add.text(bg.x+bg_width*0.42, bg.y+bg_height*0.215, data.par.scene.score, { font: `${stat.koeff*50}px Courier`, fill: '#000000' });
        this.saving = this.add.text(bg.x+bg_width*0.6, bg.y+bg_height*0.295, data.par.scene.players_saving, { font: `${stat.koeff*50}px Courier`, fill: '#000000' });
        this.debt = this.add.text(bg.x+bg_width*0.4, bg.y+bg_height*0.365, data.par.scene.players_debt, { font: `${stat.koeff*50}px Courier`, fill: '#000000' });

        this.par = data.par.scene;

        if (this.par.players_debt != 0 || this.par.players_saving === 0){
            bonus.setTint(0x696969);
        };

        cont.on('pointerdown', function() {
            this.par.players_borrow = 0;
            if (this.par.players_saving === 0 &&  0 < this.par.players_debt){
                this.par.score -= (this.par.players_debt/500)*0.5 + 0.5;
                this.par.saving.setText(this.par.players_saving);
                this.par.debt.setText(this.par.players_debt);
                this.saving.setText(this.par.players_saving);
                this.debt.setText(this.par.players_debt);
            }
            else if (this.par.players_saving < this.par.players_debt){
                this.par.players_debt -= this.par.players_saving;
                this.par.players_saving = 0;
                this.par.score -= (this.par.players_debt/500) + 1;
                this.par.saving.setText(this.par.players_saving);
                this.par.debt.setText(this.par.players_debt);
                this.saving.setText(this.par.players_saving);
                this.debt.setText(this.par.players_debt);
            }
            else if (this.par.players_saving > this.par.players_debt){
                this.par.players_saving -= this.par.players_debt;
                this.par.players_debt = 0;
                if (this.par.players_saving < 1000){
                    this.par.score += 0.5;
                }
                else{
                    this.par.score += this.par.players_saving/1000;
                };
                this.par.saving.setText(this.par.players_saving);
                this.par.debt.setText(this.par.players_debt);
                this.saving.setText(this.par.players_saving);
                this.debt.setText(this.par.players_debt);
            };
            this.par.cells[this.par.active_cell].img.active = false;
            this.par.cells[this.par.active_cell].img.setTint(0x696969);
            this.par.active_cell = null;
            this.par.opened = false;
            this.par.scene.stop("LevelFinish");
            if (stat.active_level === 'level2'){
                this.par.scene.launch("Level2Finish", {par: this.par});
            }
            else{
                this.par.scene.launch("Level3Finish", {par: this.par});
            };
        }, this);

        bonus.on('pointerdown', function() {
            if (this.par.players_debt === 0 && this.par.players_saving > 0){
                this.par.scene.launch('Bonus', {par: this.par});
                this.par.scene.pause("LevelFinish");
            };
        }, this);

        pay.on('pointerdown', function() {
            let par = data.par.scene;
            let number = parseInt(textEntry.text);
            if (par.players_saving >= number && par.players_debt >= number && number != 0){
                par.players_saving -= number;
                par.players_debt -= number;
                par.saving.setText(par.players_saving);
                par.debt.setText(par.players_debt);
                this.saving.setText(par.players_saving);
                this.debt.setText(par.players_debt);
                textEntry.setText('');
                if (this.par.players_debt === 0 && this.par.players_saving > 0){
                    bonus.setTint(0xffffff);
                };

                if (par.players_borrow != 0 && par.players_borrow > number){
                    let tmp = this.borrow_payed;
                    this.borrow_payed += number;
                    if (tmp === 0){
                        par.score += 0.5;
                    }
                    par.score += (Math.floor(this.borrow_payed/500))*0.5 - (Math.floor(tmp/500))*0.5; 
                    par.players_borrow -= number;
                }
                else if(par.players_borrow != 0){
                    let tmp = this.borrow_payed;
                    this.borrow_payed = this.borrow_payed + par.players_borrow;
                    if (tmp === 0){
                        par.score += 0.5;
                    }
                    par.score += (Math.floor(this.borrow_payed/500))*0.5 - (Math.floor(tmp/500))*0.5;
                    par.players_borrow = 0;
                };
                par.score_txt.setText(par.score);
                this.score.setText(par.score);
            }
        }, this);

        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                var tmp = textEntry.text.substr(0, textEntry.text.length - 1);
                textEntry.setText(tmp);
            }
            else if (event.keyCode >= 48 && event.keyCode < 58)
            {
                textEntry.setText(textEntry.text+event.key);
            }
        });
    }

    update() {
        
    }

}