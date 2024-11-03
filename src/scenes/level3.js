import Cell from '../helpers/cell.js';
import {stat} from '../helpers/statistics.js';
import {getRandomInt} from '../helpers/functions.js';

('../helpers/functions.js');

export default class Level3 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level3',
        });
        this.win_i = 0;
        this.active_cell = 0;
        this.players_money = 0;
        this.players_debt = 0;
        this.players_saving = 0;
        this.cells_description = [
            'startend cell',
            'range_diapason public_utilities',
            'range_diapason internet',
            'range_larger products',
            'question expense',
            'range_larger transport',
            'range_larger household',
            'question sidejob',
            'range_larger pharmacy',
            'range_larger clothes',
            'question entertainment',
            'range_larger kids',
            'startend cell',
        ];
        this.cells = [];
        this.month = 1;

        this.unique_hints = {
            public_utilities: 3,
            internet: 3,
            products: null,
            transport: 2,
            household: 1,
            pharmacy: 3,
            clothes: 2,
        };

        this.range_payments = {
            diapason1: {
                public_utilities: [5500, 6000],
                internet: [1400, 1500],
            },
            larger1: {
                products: 12000,
                transport: 3000,
                household: 3500,
                pharmacy: 2100,
                clothes: 6000,
                kids: 2650,
            },
            diapason2: {
                public_utilities: [5500, 6000],
                internet: [1400, 1500],
            },
            larger2: {
                products: 12000,
                transport: 4000,
                household: 600,
                pharmacy: 1500,
                clothes: 4000,
                kids: 2890,
            },
            diapason3: {
                public_utilities: [5500, 6000],
                internet: [1400, 1500],
            },
            larger3: {
                products: 12000,
                transport: 3000,
                household: 600,
                pharmacy: 2500,
                clothes: 6000,
                kids: 3000,
            },
        };

        this.random_windows = {
            expense: [1000, 1000, 700, 300, 2000, 600, 700, 500, 1000, 1000],
            sidejob: [2000, 2000, 1000, 2000, 900, 1000, 1000],
            entertainment: [1500, 2100, 1800, 1200, 900, 1500, 1500, 1500, 700, 1000],
        };

        this.score = 0;

        this.opened = true;
    }

    preload() {
        this.load.image('bg_l3', 'src/assets/common/bg.png');
        this.load.image('cell', 'src/assets/level2/cell.png');
        this.load.image('bomb', 'src/assets/level2/bomb.png');
        this.load.image('clothes', 'src/assets/level2/clothes.png');
        this.load.image('internet', 'src/assets/level2/internet.png');
        this.load.image('moneybox', 'src/assets/level2/moneybox.png');
        this.load.image('pharmacy', 'src/assets/level2/pharmacy.png');
        this.load.image('products', 'src/assets/level2/products.png');
        this.load.image(
            'public_utilities',
            'src/assets/level2/public_utilities.png'
        );
        this.load.image('household', 'src/assets/level2/household.png');
        this.load.image('question', 'src/assets/level2/question.png');
        this.load.image('transport', 'src/assets/level2/transport.png');
        this.load.image('money', 'src/assets/level2/money.png');
        this.load.image('debt', 'src/assets/level2/debt.png');
        this.load.image('kids', 'src/assets/level2/kids.png');
        this.load.image('saving', 'src/assets/level2/saving.png');
        this.load.image('month1', 'src/assets/level2/month1.png');
        this.load.image('month2', 'src/assets/level2/month2.png');
        this.load.image('month3', 'src/assets/level2/month3.png');
        this.load.image('complete_l3', 'src/assets/common/complete.png');
        // this.load.image('help_l3', 'src/assets/common/help.png');
        // this.load.image('progress_l3', 'src/assets/common/progress.png');
        this.load.image('statistics_l3', 'src/assets/common/statistics.png');
        this.load.image('score_l3', 'src/assets/common/score.png');
        this.load.image('exitLev3', 'src/assets/common/home.png')
        // this.load.image('character_l3', 'src/assets/common/character.png');
        // this.load.image(
        //   'avatar',
        //   `src/assets/appereance/${stat.gender}/${stat.character.split('_')[0]}/${
        //     stat.character
        //   }.png`
        // );
    }

    create() {
        stat.active_level = 'level3';
        // stat_record.enterLevel({
        //     'answer_number': 2
        // });

        this.cells = [];
        this.win_i = 0;
        this.active_cell = 0;
        this.players_money = 0;
        this.players_debt = 0;
        this.players_saving = 0;
        this.players_borrow = 0;
        this.month = 1;
        stat.month = 1;
        this.score = 0;

        var bg = this.add
            .sprite(innerWidth / 2, innerHeight / 2, 'bg_l3')
            .setScale(1 * stat.koeffX, 0.866 * stat.koeffY)
            .setInteractive();
        // this.add
        //   .image(innerWidth * 0.945, innerHeight * 0.15, 'avatar')
        //   .setScale(0.2 * stat.koeff, 0.2 * stat.koeff);
        // this.add
        //   .sprite(innerWidth * 0.96, innerHeight * 0.38, 'help_l3')
        //   .setScale(0.09 * stat.koeff, 0.09 * stat.koeff);
        // this.add
        //   .sprite(innerWidth * 0.96, innerHeight * 0.5, 'progress_l3')
        //   .setScale(0.09 * stat.koeff, 0.09 * stat.koeff);
        var rules = this.add
            .sprite(innerWidth * 0.96, innerHeight * 0.5, 'statistics_l3')
            .setScale(0.09 * stat.koeff, 0.09 * stat.koeff)
            .setInteractive();

        var exitLevel = this.add
            .sprite(innerWidth * 0.96, innerHeight * 0.65, 'exitLev3')
            .setScale(0.09 * stat.koeff, 0.09 * stat.koeff)
            .setInteractive();
        // this.add
        //   .sprite(innerWidth * 0.96, innerHeight * 0.74, 'character_l3')
        //   .setScale(0.09 * stat.koeff, 0.09 * stat.koeff);
        this.add
            .sprite(innerWidth * 0.09, innerHeight * 0.08, 'score_l3')
            .setScale(0.15 * stat.koeff, 0.15 * stat.koeff);
        this.score_txt = this.add.text(
            innerWidth * 0.09,
            innerHeight * 0.055,
            this.score,
            {font: `${55 * stat.koeff}px Courier`, fill: '#ffede4'}
        );
        this.add
            .sprite(innerWidth * 0.26, innerHeight * 0.08, 'money')
            .setScale(0.15 * stat.koeff, 0.15 * stat.koeff);
        this.money = this.add.text(
            innerWidth * 0.24,
            innerHeight * 0.06,
            this.players_money,
            {font: `${50 * stat.koeff}px Courier`, fill: '#ffede4'}
        );
        this.add
            .sprite(innerWidth * 0.42, innerHeight * 0.08, 'saving')
            .setScale(0.15 * stat.koeff, 0.15 * stat.koeff);
        this.saving = this.add.text(
            innerWidth * 0.41,
            innerHeight * 0.065,
            this.players_saving,
            {font: `${45 * stat.koeff}px Courier`, fill: '#ffede4'}
        );
        this.add
            .sprite(innerWidth * 0.6, innerHeight * 0.08, 'debt')
            .setScale(0.15 * stat.koeff, 0.15 * stat.koeff);
        this.debt = this.add.text(
            innerWidth * 0.585,
            innerHeight * 0.065,
            this.players_debt,
            {font: `${45 * stat.koeff}px Courier`, fill: '#ffede4'}
        );
        this.month_view = this.add
            .sprite(innerWidth * 0.78, innerHeight * 0.08, 'month' + this.month)
            .setScale(0.15 * stat.koeff, 0.15 * stat.koeff);

        let cell = new Cell(this);
        this.cells.push(cell);
        cell.render(innerWidth / 10, innerHeight / 3.5, this.cells_description[0]);
        cell.img.description = 'start';
        for (let i = 0; i < 4; i++) {
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x + cell.width, cell.y, this.cells_description[i + 1]);
            cell = tmp;
        }
        for (let i = 0; i < 3; i++) {
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x, cell.y + cell.height, this.cells_description[i + 5]);
            cell = tmp;
        }
        for (let i = 0; i < 4; i++) {
            let tmp = new Cell(this);
            this.cells.push(tmp);
            tmp.render(cell.x - cell.width, cell.y, this.cells_description[i + 8]);
            cell = tmp;
        }
        let tmp = new Cell(this);
        this.cells.push(tmp);
        tmp.render(
            cell.x,
            cell.y - cell.height,
            this.cells_description[this.cells_description.length - 1]
        );
        tmp.img.description = 'end';
        this.cells[this.active_cell].img.setTint(0xffffff);
        this.cells[this.active_cell].img.active = true;
        stat.lvl2_active_cell = this.cells_description[this.active_cell];
        var borrow = this.add
            .sprite(innerWidth / 2.2 - cell.width, innerHeight * 0.58, 'bomb')
            .setScale(0.17 * stat.koeff, 0.17 * stat.koeff)
            .setInteractive();
        var save = this.add
            .sprite(innerWidth / 2.2, innerHeight * 0.58, 'moneybox')
            .setScale(0.17 * stat.koeff, 0.17 * stat.koeff)
            .setInteractive();

        rules.on('pointerdown', function () {
            this.scene.launch("Rule", {description: '5', sc: 'Level3', par: this.scene});
        }, this);

        exitLevel.on('pointerdown', function () {
            this.scene.stop('level3')
            this.scene.start("mainMenu");
        }, this);


        borrow.on(
            'pointerdown',
            function () {
                this.scene.launch('Borrow', {par: this.scene});
                this.scene.pause();
            },
            this
        );

        save.on(
            'pointerdown',
            function () {
                this.scene.launch('Save', {par: this.scene});
                this.scene.pause();
            },
            this
        );

        this.scene.launch('Description', {par: this.scene});
        this.scene.pause();

        bg.on(
            'pointerdown',
            function () {
                // stat_record.sendMissClick();
            },
            this
        );
    }

    update() {
        var tmp = this.cells[this.active_cell].img;
        if (this.players_money === 0 && this.players_borrow > 0 && tmp.description !== 'end') {
            this.scene.launch('Level3Finish', {par: this.scene.scene});
            this.scene.pause('Level3');
        } else if (this.active_cell !== null && this.opened === false) {
            this.createWindow(tmp.type, tmp.description);
        }
    }

    createWindow(type, description) {
        this.opened = true;
        if (description === 'end') {
            this.players_saving += this.players_money;
            this.players_money = 0;
            this.money.setText(this.players_money);
            this.saving.setText(this.players_saving);
            if (this.month < 3) {
                this.scene.launch('MonthEnd', {par: this.scene});
            } else {
                this.scene.launch('LevelFinish', {par: this.scene});
            }
            this.scene.pause();
        } else if (description === 'start') {
            this.scene.launch('Description', {par: this.scene});
            this.scene.pause();
        } else if (type === 'random') {
            description =
                description +
                ' ' +
                getRandomInt(this.random_windows[description].length);
            stat.lvl2_active_cell = description;
            this.scene.launch('RandomWindow', {
                par: this.scene,
                type: type,
                description: description,
            });
        } else {
            var range =
                this.range_payments[type.split('_')[1] + this.month][description];
            let number = 0;
            if (typeof range == 'number') {
                number = range;
            } else {
                number = range[0];
            }
            if (
                this.players_borrow === 3000 &&
                this.players_saving + this.players_money < number
            ) {
                this.cells[this.active_cell].img.active = false;
                this.cells[this.active_cell].img.setTint(0x696969);
                this.active_cell = null;
                var comp = this.add
                    .sprite(innerWidth * 0.96, innerHeight * 0.93, 'complete_l3')
                    .setScale(0.08 * stat.koeff, 0.08 * stat.koeff)
                    .setInteractive()
                    .setTint(0x800000);
                comp.on(
                    'pointerdown',
                    function () {
                        this.score -= (this.players_debt / 500) * 0.5 + 0.5;
                        this.saving.setText(this.players_saving);
                        this.debt.setText(this.players_debt);
                        this.score_txt.setText(this.score);
                        this.scene.launch('Level3Finish', {par: this.scene.scene});
                    },
                    this
                );
            } else {
                stat.lvl2_active_cell = description;
                this.scene.launch('Window', {
                    par: this.scene,
                    type: type,
                    description: description,
                });
                this.scene.pause();
            }
        }
    }
}
