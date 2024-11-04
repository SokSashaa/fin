import { stat } from "../helpers/statistics.js";

export default class Rule extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Rule'
        });
        this.click = null;
        this.active = 1;
    }

    preload() {
        this.load.image('bg_r', 'src/assets/rules/bg.png');
        this.load.image('_1', 'src/assets/rules/_1.png');
        this.load.image('characterChoice_1', 'src/assets/rules/characterChoice_1.png');
        this.load.image('Level1_1', 'src/assets/rules/Level1_1.png');
        this.load.image('Level2_1', 'src/assets/rules/Level2_1.png');
        this.load.image('Level3_1', 'src/assets/rules/Level2_1.png');
        this.load.image('levelChoice1', 'src/assets/rules/levelChoice1.png');
        this.load.image('left', 'src/assets/rules/left.png');
        this.load.image('right', 'src/assets/rules/right.png');
        this.load.image('start', 'src/assets/rules/start.png');
        this.load.image('cross', 'src/assets/common/cross.png');
        //this.load.image('help_inLevel1', 'src/assets/level1/help.png')
    }

    create(data) {
        console.log(data);
        if (data.bg){
            this.add.sprite(innerWidth/2, innerHeight/2, 'bg').setScale(1*stat.koeffX, 0.866*stat.koeffY);
        }
        var bg = this.add.image(innerWidth*0.15, innerHeight*0.05, 'bg_r').setScale(0.72*stat.koeff, 0.72*stat.koeff).setOrigin(0);
        var bg_width = bg.width*0.72*stat.koeff;
        var bg_height = bg.height*0.72*stat.koeff;
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var text = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.54, data.sc+'_'+this.active).setScale(0.55*stat.koeff, 0.55*stat.koeff).setInteractive();
        // var left = this.add.image(bg.x+bg_width*0.06, bg.y+bg_height*0.53, 'left').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();
        // var right = this.add.image(bg.x+bg_width*0.94, bg.y+bg_height*0.53, 'right').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();
        var cross = this.add.image(bg.x+bg_width*0.94, bg.y+bg_height*0.08, 'cross').setScale(0.09*stat.koeff, 0.09*stat.koeff).setInteractive();

        if (data.sc && data.par.key !== data.sc){
            var start = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.97, 'start').setScale(0.07*stat.koeff, 0.07*stat.koeff).setInteractive();
            start.on('pointerdown', function() {
                let par = data.par.scene;
                par.scene.stop("Rule");
                par.scene.start(data.sc);
                par.scene.stop();
            }, this);
        };

        // left.on('pointerdown', function() {
        //     if (this.active !== 1){
        //         this.active --;
        //         text.destroy();
        //         text = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.54, data.sc+'_'+this.active).setScale(0.55*stat.koeff, 0.55*stat.koeff).setInteractive();
        //     }
        // }, this);

        // right.on('pointerdown', function() {
        //     if (this.active !== 1){
        //         this.active ++;
        //         text.destroy();
        //         text = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.54, data.sc+'_'+this.active).setScale(0.55*stat.koeff, 0.55*stat.koeff).setInteractive();
        //     }
        // }, this);

        cross.on('pointerdown', function() {
            let par = data.par.scene;
            par.scene.stop("Rule");
            par.scene.resume();
        }, this);
    }

    update() {

    }

}
