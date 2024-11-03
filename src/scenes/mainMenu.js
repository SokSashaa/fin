import {stat} from '../helpers/statistics.js';

export default class mainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainMenu',
        });
        // stat_record.gameStart();
    }

    preload() {
        this.load.image('bg', 'src/assets/common/bg.png');
        this.load.image('play', 'src/assets/mainMenu/play.png');
        this.load.image('exit', 'src/assets/mainMenu/exit.png');
        this.load.image('rules', 'src/assets/mainMenu/rules.png');
        // this.load.image('statistics', 'src/assets/mainMenu/statistics.png');
    }

    create() {
        this.add
            .sprite(innerWidth / 2, innerHeight / 2, 'bg')
            .setScale(1 * stat.koeffX, 0.866 * stat.koeffY);
        var play = this.add
            .image(innerWidth / 2, innerHeight / 4, 'play')
            .setScale(0.25 * stat.koeff, 0.25 * stat.koeff)
            .setInteractive();
        var rules = this.add
            .image(innerWidth / 2, (innerHeight / 4) * 2, 'rules')
            .setScale(0.25 * stat.koeff, 0.25 * stat.koeff)
            .setInteractive();
        // this.add
        //   .image(innerWidth / 2, (innerHeight / 5) * 3, 'statistics')
        //   .setScale(0.25 * stat.koeff, 0.25 * stat.koeff);
        var exit = this.add
            .image(innerWidth / 2, (innerHeight / 4) * 3, 'exit')
            .setScale(0.25 * stat.koeff, 0.25 * stat.koeff);
        play.on(
            'pointerdown',
            function (event) {
                this.scene.start('levelChoice');
            },
            this
        );

        // exit.on(
        //     'pointerdown',
        //     function (event) {
        //         // stat_record.gameEnd();
        //         // stat_record.sendLeaveGame();
        //     },
        //     this
        // );

        rules.on(
            'pointerdown',
            function (event) {
                this.scene.launch('Rule', {sc: '', par: this.scene});
            },
            this
        );
    }

    update() {
    }
}
