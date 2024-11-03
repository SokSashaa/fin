let clicked = false;
import {stat} from '../helpers/statistics.js';

export default class levelChoice extends Phaser.Scene {
    constructor() {
        super({
            key: 'levelChoice'
        });
    }

    preload() {
        this.load.image('bg_lc', 'src/assets/common/bg.png');
        // this.load.image('character_lc', 'src/assets/levelChoice/character.png');
        this.load.image('block_lc', 'src/assets/levelChoice/block.png');
        this.load.image('level1_lc', 'src/assets/levelChoice/level1.png');
        this.load.image('level2_lc', 'src/assets/levelChoice/level2.png');
        this.load.image('level3_lc', 'src/assets/levelChoice/level3.png');
        // this.load.image('help_lc', 'src/assets/levelChoice/help.png');
        this.load.image('hint_lc', 'src/assets/levelChoice/hint.png');
        this.load.image('exit', 'src/assets/mainMenu/exit.png')
    }

    create() {
        let self = this;
        this.add.sprite(innerWidth / 2, innerHeight / 2, 'bg_lc').setScale(1 * stat.koeffX, 0.866 * stat.koeffY);

        // отрисовка выбора персонажа и помощи 
        // var character = this.add.image(innerWidth/2, innerHeight/5, 'character_lc').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();
        // var help = this.add.image(innerWidth*2/3, innerHeight/5, 'help_lc').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();

        // отрисовка подсказки
        // var hint = this.add.image(innerWidth*3/4, innerHeight/5, 'hint_lc').setScale(0, 0);

        // если игрок выбрал персонажа, то разрешено начать первый уровень
        // if (stat.character_chosed){
        //     var level1 = this.add.image(innerWidth/2, innerHeight/5*2, 'level1_lc').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();

        //     level1.on('pointerdown', function (event) {
        //         this.scene.launch("Rule", {description: '2', sc:'Level1', par: this.scene});
        //     }, this);
        // }
        // else{
        //     this.add.image(innerWidth/2, innerHeight/5*2, 'block_lc').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();
        // }

        var level1 = this.add.image(innerWidth / 2, innerHeight / 6, 'level1_lc').setScale(0.25 * stat.koeff, 0.25 * stat.koeff).setInteractive();

        level1.on('pointerdown', function (event) {
            this.scene.launch("Rule", {description: '2', sc: 'Level1', par: this.scene});
        }, this);


        // var level2 = this.add.image(innerWidth / 2, innerHeight / 6 * 2, 'level2_lc').setScale(0.25 * stat.koeff, 0.25 * stat.koeff).setInteractive();
        //
        // level2.on('pointerdown', function (event) {
        //     this.scene.launch("Rule", {description: '5', sc: 'Level2', par: this.scene});
        //      //this.scene.launch('Bonus',{par:this.scene});
        //
        // }, this);
        //
        // var level3 = this.add.image(innerWidth / 2, innerHeight / 6 * 3, 'level3_lc').setScale(0.25 * stat.koeff, 0.25 * stat.koeff).setInteractive();
        //
        // level3.on('pointerdown', function (event) {
        //     this.scene.launch("Rule", {description: '5', sc: 'Level3', par: this.scene});
        // }, this);

        var exit = this.add.image(innerWidth / 2, innerHeight / 6 * 4, 'exit').setScale(0.25 * stat.koeff, 0.25 * stat.koeff).setInteractive();

        exit.on('pointerdown',
            function (event) {
                this.scene.start('mainMenu');
            },
            this)

        if (stat.lvl1_completed) {
            var level2 = this.add.image(innerWidth/2, innerHeight/6*2, 'level2_lc').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();

            level2.on('pointerdown', function (event) {
                this.scene.launch("Rule", {description: '5', sc:'Level2', par: this.scene});
            }, this);
        }
        else{
            this.add.image(innerWidth/2, innerHeight/6*2, 'block_lc').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();
        }

        if (stat.lvl2_completed) {
            var level3 = this.add.image(innerWidth/2, innerHeight/6*3, 'level3_lc').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();

            level3.on('pointerdown', function (event) {
                this.scene.launch("Rule", {description: '5', sc:'Level3', par: this.scene});
            }, this);
        }
        else{
            this.add.image(innerWidth/2, innerHeight/6*3, 'block_lc').setScale(0.25*stat.koeff, 0.25*stat.koeff).setInteractive();
        }


        // обработка нажатия на кнопку помощь
        // help.on('pointerdown', function (event) {
        //     if (clicked === false){
        //         hint.setScale(0.1*stat.koeff, 0.1*stat.koeff);
        //         clicked = true;
        //     }
        //     else{
        //         hint.setScale(0, 0);
        //         clicked = false;
        //     }
        // }, this);

        // обработка нажатия на кнопку персонаж
        // character.on('pointerdown', function (event) {
        //     this.scene.launch("Rule", {sc:'characterChoice', par: this.scene});
        // }, this);
    }

    update() {

    }

}