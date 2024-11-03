import {stat} from '../helpers/statistics.js';

export default class Window extends Phaser.Scene {
    constructor() {
        super({
            key: 'Window',
        });
        this.tries = 0;
        this.errorMsg = '';
        this.help_tries = {
            range_diapason: 0, // было 3
            range_larger: 2,
        };
    }

    preload() {
        this.load.image(
            `bg_mw_${stat.active_level}_${stat.lvl2_active_cell}`,
            `src/assets/windows/bgs/${stat.active_level}/${stat.lvl2_active_cell}.png`
        );
        this.load.image('pay_mw', 'src/assets/windows/pay.png');
        this.load.image('cross_mw', 'src/assets/common/cross.png');
        this.load.image('input_mw', 'src/assets/level2/save/input.png');
        this.load.image('help_mw', 'src/assets/windows/help.png');
        if (stat.lvl2_active_cell !== 'kids') {
            this.load.image(
                `hint_mw_${stat.active_level}_${stat.lvl2_active_cell}`,
                `src/assets/level2/hints/${stat.active_level}/${stat.lvl2_active_cell} common.png`
            );
            this.load.image(
                `hint_uni_mw_${stat.active_level}_${stat.lvl2_active_cell}`,
                `src/assets/level2/hints/${stat.active_level}/${stat.lvl2_active_cell} unique.png`
            );
        } else {
            this.load.image(
                `hint_mw_${stat.active_level}_${stat.lvl2_active_cell}_${stat.month}`,
                `src/assets/level2/hints/${stat.active_level}/${stat.lvl2_active_cell} ${stat.month}.png`
            );
        }
    }

    create(data) {
        this.clicked = false;
        this.par = data.par.scene;
        this.errorMsg = '';
        var bg = this.add
            .image(
                innerWidth / 3,
                innerHeight / 12,
                `bg_mw_${stat.active_level}_${stat.lvl2_active_cell}`
            )
            .setScale(0.6 * stat.koeff, 0.6 * stat.koeff)
            .setOrigin(0)
            .setInteractive();
        var bg_width = bg.width * 0.6 * stat.koeff;
        var bg_height = bg.height * 0.6 * stat.koeff;
        this.cameras.main.setViewport(0, 0, innerWidth, innerHeight);
        var pay = null;
        var error = null;
        var cross = this.add
            .image(bg.x + bg_width * 0.97, bg.y * 1.05, 'cross_mw')
            .setScale(0.09 * stat.koeff, 0.09 * stat.koeff)
            .setInteractive();


        if (data.type.split('_').length > 1) {
            var input = this.add
                .image(bg.x + bg_width * 0.41, bg.y + bg_height * 0.75, 'input_mw')
                .setScale(0.22 * stat.koeff, 0.22 * stat.koeff);
            var textEntry = this.add.text(
                bg.x + bg_width * 0.2,
                bg.y + bg_height * 0.715,
                '',
                {font: `${58 * stat.koeff}px Courier`, fill: '#000000'}
            );
            pay = this.add
                .image(bg.x + bg_width * 0.5, bg.y + bg_height * 0.88, 'pay_mw')
                .setInteractive()
                .setScale(0.22 * stat.koeff, 0.22 * stat.koeff);

            error = this.add.text(
                bg.x + bg_width * 0.12,
                bg.y + bg_height * 0.66,
                '',
                {font: `${40 * stat.koeff}px Courier`, fill: '#000000'}
            );

            this.input.keyboard.on('keydown', function (event) {
                error.setText('');
                if (event.keyCode === 8 && textEntry.text.length > 0) {
                    var tmp = textEntry.text.substr(0, textEntry.text.length - 1);
                    textEntry.setText(tmp);
                } else if (event.keyCode >= 48 && event.keyCode < 58) {
                    textEntry.setText(textEntry.text + event.key);
                }
            });
        } else {
            pay = this.add
                .image(bg.x + bg_width * 0.3, bg.y + bg_height * 0.475, 'pay_mw')
                .setInteractive()
                .setScale(0.22 * stat.koeff, 0.22 * stat.koeff);
            var notpay = this.add
                .image(bg.x + bg_width * 0.3, bg.y + bg_height * 0.525, 'pay_mw')
                .setInteractive()
                .setScale(0.22 * stat.koeff, 0.22 * stat.koeff);
        }
        var help = this.add
            .image(bg.x + bg_width * 0.85, bg.y + bg_height * 0.75, 'help_mw')
            .setInteractive()
            .setScale(0.08 * stat.koeff, 0.08 * stat.koeff)
        // .setTint(0x696969);


        var hint;
        if (stat.lvl2_active_cell === 'kids') {
            hint = this.add
                .image(
                    bg.x + bg_width * 1.35,
                    bg.y + bg_height * 0.68,
                    `hint_mw_${stat.active_level}_${stat.lvl2_active_cell}_${stat.month}`
                )
                .setScale(0, 0);
        } else if (
            data.par.scene.month === data.par.scene.unique_hints[data.description]
        ) {
            hint = this.add
                .image(
                    bg.x + bg_width * 1.35,
                    bg.y + bg_height * 0.68,
                    `hint_uni_mw_${stat.active_level}_${stat.lvl2_active_cell}`
                )
                .setScale(0, 0);
        } else {
            hint = this.add
                .image(
                    bg.x + bg_width * 1.35,
                    bg.y + bg_height * 0.68,
                    `hint_mw_${stat.active_level}_${stat.lvl2_active_cell}`
                )
                .setScale(0, 0);
        }

        cross.on(
            'pointerdown',
            function () {
                let par = data.par.scene;
                par.scene.stop('Window');
                par.scene.resume();
            },
            this
        );

        pay.on(
            'pointerdown',
            function () {
                this.tries += 1;
                let par = data.par.scene;
                if (data.type.split('_').length > 1) {
                    var number = parseInt(textEntry.text);
                    var range =
                        par.range_payments[data.type.split('_')[1] + par.month][
                            data.description
                            ];
                    if (
                        typeof range !== 'number' &&
                        number >= range[0] &&
                        number <= range[1] &&
                        number <= par.players_money
                    ) {
                        if (this.tries <= this.help_tries[data.type]) {
                            par.score += 1;
                        }
                        par.players_money -= number;
                        par.money.setText(par.players_money);
                        par.score_txt.setText(par.score);
                        this.tries = 0;

                        // stat_record.sendAnswer({
                        //     'correct': true
                        // });
                        // stat_record.enterLevel({
                        //     'answer_number': 1
                        // });

                        this.move(par);
                    } else if (number >= range && number <= par.players_money) {
                        if (this.tries <= this.help_tries[data.type]) {
                            par.score += 1;
                        }
                        par.players_money -= number;
                        par.money.setText(par.players_money);
                        par.score_txt.setText(par.score);
                        this.tries = 0;

                        // stat_record.sendAnswer({
                        //     'correct': true
                        // });
                        // stat_record.enterLevel({
                        //     'answer_number': 1
                        // });

                        this.move(par);
                    } else if ( number > par.players_money) {
                        error.setText('Недостаточно средств');
                    } else {
                        error.setText('Попробуйте еще раз');
                    }
                    textEntry.setText('');
                }

                // stat_record.sendAnswer({
                //     'correct': false
                // });
                // stat_record.enterLevel({
                //     'answer_number': 1
                // });

                if (this.tries === this.help_tries[data.type]) {
                    // help.setTint(0xffffff);
                }
            },
            this
        );

        help.on(
            'pointerdown',
            function (event) {
                if (
                    this.clicked === false //&&
                    // this.tries >= this.help_tries[data.type]
                ) {
                    hint.setScale(0.2 * stat.koeff, 0.2 * stat.koeff);
                    this.clicked = true;
                } else {
                    hint.setScale(0, 0);
                    this.clicked = false;
                }
            },
            this
        );
    }

    update() {
    }

    move(par) {
        par.cells[par.active_cell].img.active = false;
        par.cells[par.active_cell].img.setTint(0x696969);
        par.active_cell++;

        if (par.active_cell != null) {
            par.cells[par.active_cell].img.active = true;
            par.cells[par.active_cell].img.setTint(0xffffff);
        }

        par.opened = false;
        par.scene.stop('Window');
        par.scene.resume();
    }
}
