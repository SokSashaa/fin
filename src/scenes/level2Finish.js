import { stat } from "../helpers/statistics.js";

let clicked = false;

export default class Level2Finish extends Phaser.Scene{
    constructor()
    {
        super({
            key: 'Level2Finish'
        });
    }

    preload() {
        this.load.image('bg_l2f', 'src/assets/level2/resultfail.png');
        this.load.image('bgsuccess_l2f', 'src/assets/level2/resultsuccess.png');
        this.load.image('home_l2f', 'src/assets/common/home.png');
        this.load.image('replay_l2f', 'src/assets/common/replay.png');
        this.load.image('complete_l2f', 'src/assets/common/complete.png');
        this.load.image('bg_l2fs', 'src/assets/level2/resultfail1.png')
    }

    create(data) {
        var bg;
        var bg_width;
        var bg_height;
        stat.month = null;
        if(data.par.players_money===0 && data.par.players_borrow>0){
            bg = this.add.image(innerWidth*0.35, innerHeight/20, 'bg_l2fs').setScale(0.4*stat.koeff, 0.4*stat.koeff).setOrigin(0);
            bg_width = bg.width*0.4*stat.koeff;
            bg_height = bg.height*0.4*stat.koeff;
            var comp = this.add.image(bg.x+bg_width*0.78, bg.y+bg_height*0.88, 'complete_l2f').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive().setTint(0x696969);
            stat.lvl2_score = this.score;
        }
        else if (data.par.score < 25){
            bg = this.add.image(innerWidth*0.35, innerHeight/20, 'bg_l2f').setScale(0.4*stat.koeff, 0.4*stat.koeff).setOrigin(0);
            bg_width = bg.width*0.4*stat.koeff;
            bg_height = bg.height*0.4*stat.koeff;
            var comp = this.add.image(bg.x+bg_width*0.78, bg.y+bg_height*0.88, 'complete_l2f').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive().setTint(0x696969);
            stat.lvl2_score = this.score;
        }
        else{
            bg = this.add.image(innerWidth*0.35, innerHeight/20, 'bgsuccess_l2f').setScale(0.4*stat.koeff, 0.4*stat.koeff).setOrigin(0);
            bg_width = bg.width*0.4*stat.koeff;
            bg_height = bg.height*0.4*stat.koeff;
            var comp = this.add.image(bg.x+bg_width*0.78, bg.y+bg_height*0.88, 'complete_l2f').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
            stat.lvl2_score = this.score;
            stat.lvl2_completed = true;

            comp.on('pointerdown', function(event) {
                data.par.scene.stop('Level2Finish');
                data.par.scene.stop();
                data.par.scene.launch("Rule", {description: '5', sc:'Level3', par: this.scene, bg: true});
            }, this);
        };
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        this.add.text(bg.x+bg_width*0.55, bg.y+bg_height*0.34, data.par.score, { font: `${100*stat.koeff}px Courier`, fill: '#000000' });
        var home = this.add.image(bg.x+bg_width*0.22, bg.y+bg_height*0.88, 'home_l2f').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
        var replay = this.add.image(bg.x+bg_width*0.5, bg.y+bg_height*0.88, 'replay_l2f').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
        
        home.on('pointerdown', function(event) {
            data.par.scene.stop('Level2Finish');
            data.par.scene.stop('Level2');
            data.par.scene.start("mainMenu");
        }, this);
        
        replay.on('pointerdown', function(event) {
            data.par.scene.stop('Level2Finish');
            data.par.scene.stop();
            data.par.scene.start("Level2");
        }, this);
    }

    update() {
        
    }

}