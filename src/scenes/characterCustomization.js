import Color from '../helpers/color.js';
import { stat_record, stat } from '../helpers/statistics.js';

export default class characterCustomization extends Phaser.Scene {
    constructor() {
        super({
            key: 'characterCustomization'
        });
        this.colors = [
            'green',
            'grey',
            'blue',
            'brown',
            'black',
            'blonde',
            'ginger',
            'brown'
        ]
    }

    preload() {
        this.load.image('bg_chcu', 'src/assets/common/bg.png');
        this.load.image('back_chcu', 'src/assets/common/back.png');
        this.load.image('appCustom_chcu', 'src/assets/characterCustomization/appereanceCustomization.png');
        this.load.image('apply_chcu', 'src/assets/characterCustomization/apply.png');
        this.load.image('continue_chcu', 'src/assets/characterCustomization/continue.png');
        this.load.image('black', 'src/assets/characterCustomization/black.png');
        this.load.image('blonde', 'src/assets/characterCustomization/blonde.png');
        this.load.image('blue', 'src/assets/characterCustomization/blue.png');
        this.load.image('brown', 'src/assets/characterCustomization/brown.png');
        this.load.image('ginger', 'src/assets/characterCustomization/ginger.png');
        this.load.image('green', 'src/assets/characterCustomization/green.png');
        this.load.image('grey', 'src/assets/characterCustomization/grey.png');
        this.load.image('platform', 'src/assets/characterCustomization/platform.png');
        this.load.image('1_blue_black', 'src/assets/characterCustomization/1/blue_black.png');
        this.load.image('1_blue_blonde', 'src/assets/characterCustomization/1/blue_blonde.png');
        this.load.image('1_blue_brown', 'src/assets/characterCustomization/1/blue_brown.png');
        this.load.image('1_blue_ginger', 'src/assets/characterCustomization/1/blue_ginger.png');
        this.load.image('1_brown_black', 'src/assets/characterCustomization/1/brown_black.png');
        this.load.image('1_brown_blonde', 'src/assets/characterCustomization/1/brown_blonde.png');
        this.load.image('1_brown_brown', 'src/assets/characterCustomization/1/brown_brown.png');
        this.load.image('1_brown_ginger', 'src/assets/characterCustomization/1/brown_ginger.png');
        this.load.image('1_green_black', 'src/assets/characterCustomization/1/green_black.png');
        this.load.image('1_green_blonde', 'src/assets/characterCustomization/1/green_blonde.png');
        this.load.image('1_green_brown', 'src/assets/characterCustomization/1/green_brown.png');
        this.load.image('1_green_ginger', 'src/assets/characterCustomization/1/green_ginger.png');
        this.load.image('1_grey_black', 'src/assets/characterCustomization/1/grey_black.png');
        this.load.image('1_grey_blonde', 'src/assets/characterCustomization/1/grey_blonde.png');
        this.load.image('1_grey_brown', 'src/assets/characterCustomization/1/grey_brown.png');
        this.load.image('1_grey_ginger', 'src/assets/characterCustomization/1/grey_ginger.png');
        }

    create(data) {
        this.appereance = data['appereance'];
        this.add.sprite(innerWidth/2, innerHeight/2, 'bg_chcu').setScale(1*stat.koeffX, 0.866*stat.koeffY);
        var appCustom = this.add.sprite(innerWidth*0.75, innerHeight/2, 'appCustom_chcu').setScale(0.8*stat.koeff, 0.8*stat.koeff);
        var back = this.add.image(innerWidth/23, innerHeight/12, 'back_chcu').setScale(0.1*stat.koeff, 0.1*stat.koeff).setInteractive();
        for (let i = 0; i < 4; i++){
            var tmp = new Color(this, 1, this.colors[i]);
            tmp.render(innerWidth*(0.67+0.0825*i), innerHeight/3, this.colors[i]);
        }
        for (let i = 0; i < 4; i++){
            var tmp = new Color(this, 2, this.colors[i+4]);
            tmp.render(innerWidth*(0.67+0.0825*i), innerHeight*0.6, this.colors[i+4]);
        }
        this.add.image(innerWidth*0.675, innerHeight*0.86, 'apply_chcu').setScale(0.18*stat.koeff, 0.18*stat.koeff).setInteractive();
        var cont = this.add.image(innerWidth*0.87, innerHeight*0.86, 'continue_chcu').setScale(0.18*stat.koeff, 0.18*stat.koeff).setInteractive();
        this.add.image(innerWidth*0.275, innerHeight*0.9, 'platform').setScale(0.4*stat.koeff, 0.4*stat.koeff).setInteractive();
        this.character = this.add.image(innerWidth*0.275, innerHeight*0.5, this.appereance).setScale(0.14*stat.koeff, 0.14*stat.koeff).setInteractive();

        back.on('pointerdown', function (event) {
            this.scene.scene.start("characterChoice");
        });

        cont.on('pointerdown', function (event) {
            stat.character = this.scene.appereance;
            stat.character_chosed = true;
            this.scene.scene.start("mainMenu");
        });
    }

    update() {

    }

}