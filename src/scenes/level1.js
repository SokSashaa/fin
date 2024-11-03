import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';
import {getRandomInt, sleep} from '../helpers/functions.js';
import {stat} from '../helpers/statistics.js';

('../helpers/functions.js');

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level1',
        });

        this.len = 19;
    }

    preload() {
        this.load.image('bg_l1', 'src/assets/common/bg.png');
        this.load.image('complete_l1', 'src/assets/common/complete.png');
        this.load.image('help_l1', 'src/assets/common/help.png');
        // this.load.image('progress_l1', 'src/assets/common/progress.png');
        this.load.image('statistics_l1', 'src/assets/common/statistics.png');
        this.load.image('score_l1', 'src/assets/common/score.png');
        this.load.image('expense_0', 'src/assets/level1/expense0.png');
        this.load.image('expense_1', 'src/assets/level1/expense1.png');
        this.load.image('expense_2', 'src/assets/level1/expense2.png');
        this.load.image('expense_3', 'src/assets/level1/expense3.png');
        this.load.image('expense_4', 'src/assets/level1/expense4.png');
        this.load.image('expense_5', 'src/assets/level1/expense5.png');
        this.load.image('expense_6', 'src/assets/level1/expense6.png');
        this.load.image('expense_7', 'src/assets/level1/expense7.png');
        this.load.image('expense_8', 'src/assets/level1/expense8.png');
        this.load.image('expense_9', 'src/assets/level1/expense9.png');
        this.load.image('income_0', 'src/assets/level1/income0.png');
        this.load.image('income_1', 'src/assets/level1/income1.png');
        this.load.image('income_2', 'src/assets/level1/income2.png');
        this.load.image('income_3', 'src/assets/level1/income3.png');
        this.load.image('income_4', 'src/assets/level1/income4.png');
        this.load.image('income_5', 'src/assets/level1/income5.png');
        this.load.image('income_6', 'src/assets/level1/income6.png');
        this.load.image('income_7', 'src/assets/level1/income7.png');
        this.load.image('income_8', 'src/assets/level1/income8.png');
        this.load.image('income_9', 'src/assets/level1/income9.png');
        this.load.image('income', 'src/assets/level1/income.png');
        this.load.image('expense', 'src/assets/level1/expense.png');
        this.load.image('exitLev1', 'src/assets/common/home.png')
        // this.load.image(
        //   'avatar',
        //   `src/assets/appereance/${stat.gender}/${stat.character.split('_')[0]}/${
        //     stat.character
        //   }.png`
        // );
    }

    create() {
        stat.active_level = 'level1';
        // stat_record.enterLevel({
        //   answer_number: 0,
        // });

        this.score = 0;
        this.tmp = 0;

        this.cards = new Array(
            'income_0',
            'income_1',
            'income_2',
            'income_3',
            'income_4',
            'income_5',
            'income_6',
            'income_7',
            'income_8',
            'income_9',
            'expense_0',
            'expense_1',
            'expense_2',
            'expense_3',
            'expense_4',
            'expense_5',
            'expense_6',
            'expense_7',
            'expense_8',
            'expense_9'
        );

        var bg = this.add
            .sprite(innerWidth / 2, innerHeight / 2, 'bg_l1')
            .setScale(1 * stat.koeffX, 0.866 * stat.koeffY)
            .setInteractive();
        // добавление картинки персонажа
        // this.add
        //   .image(innerWidth * 0.945, innerHeight * 0.15, 'avatar')
        //   .setScale(0.2 * stat.koeff, 0.2 * stat.koeff);
        // this.add
        //     .sprite(innerWidth * 0.96, innerHeight * 0.4, 'help_l1')
        //     .setScale(0.1 * stat.koeff, 0.1 * stat.koeff).setInteractive();
        // this.add
        //   .sprite(innerWidth * 0.96, innerHeight * 0.55, 'progress_l1')
        //   .setScale(0.1 * stat.koeff, 0.1 * stat.koeff);
        var rules = this.add
            .sprite(innerWidth * 0.96, innerHeight * 0.6, 'statistics_l1')
            .setScale(0.1 * stat.koeff, 0.1 * stat.koeff)
            .setInteractive();

        var exitLevel = this.add
            .sprite(innerWidth * 0.96, innerHeight * 0.75, 'exitLev1')
            .setScale(0.09 * stat.koeff, 0.09 * stat.koeff)
            .setInteractive();

        this.add
            .sprite(innerWidth * 0.09, innerHeight * 0.08, 'score_l1')
            .setScale(0.15 * stat.koeff, 0.15 * stat.koeff);
        var textEntry = this.add.text(
            innerWidth * 0.09,
            innerHeight * 0.045,
            this.score,
            {font: `${75 * stat.koeff}px Courier`, fill: '#ffede4'}
        );

        let index = getRandomInt(this.len);
        let card = new Card(this, this.cards[index].split('_')[0]);
        card.render(innerWidth * 0.12, innerHeight * 0.45, this.cards[index]);
        this.cards.splice(index, 1);
        index = getRandomInt(this.len - 1);
        card = new Card(this, this.cards[index].split('_')[0]);
        card.render(innerWidth * 0.2925, innerHeight * 0.45, this.cards[index]);
        this.cards.splice(index, 1);

        rules.on('pointerdown', function () {
            this.scene.launch("Rule", {description: '2', sc: 'Level1', par: this.scene});
        }, this);

        exitLevel.on('pointerdown', function () {
            this.scene.stop('level1')
            this.scene.start("mainMenu");
        }, this);

        // help.on('pointerdown', function () {
        //     this.scene.launch("Rule", {description: '2', sc: 'help_inLevel1', par: this.scene});
        // }, this);

        // bg.on('pointerdown', function() {
        //     stat_record.sendMissClick();
        // }, this);

        this.dealCards = (x, y, interval, a, n) => {
            for (let i = a; i < n; i++) {
                index = getRandomInt(this.len - i - 2);
                card = new Card(this, this.cards[index].split('_')[0]);
                card.render(x - (i + 1) * interval, y, this.cards[index]);
                this.cards.splice(index, 1);
            }
        };

        this.dealCards(
            innerWidth * 0.81,
            innerHeight * 0.45,
            innerWidth * 0.019,
            0,
            17
        );

        card = new Card(this, this.cards[0].split('_')[0]);
        card.render(innerWidth * 0.465, innerHeight * 0.45, this.cards[0]);
        this.cards.splice(0, 1);

        let income = new Zone(this, 'income');
        income.renderZone(innerWidth * 0.7, innerHeight * 0.885, 'income');

        let expense = new Zone(this, 'expense');
        expense.renderZone(innerWidth * 0.15, innerHeight * 0.885, 'expense');

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on(
            'dragstart',
            function (pointer, gameObject) {
                this.children.bringToTop(gameObject);
            },
            this
        );

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            dropZone.setTint(0xd4d6af);
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            dropZone.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.setScale(0);

            gameObject.input.enabled = false;

            if (dropZone.texture.key === gameObject.texture.key.split('_')[0]) {
                sleep(0)
                    .then((_) => {
                        dropZone.setTint(0x1ad300);
                        return sleep(300);
                    })
                    .then((_) => {
                        dropZone.clearTint();
                    });

                this.scene.score += 1;
                textEntry.setText(this.scene.score);

                // stat_record.sendAnswer({
                //     'correct': true
                // });
            } else {
                sleep(0)
                    .then((_) => {
                        dropZone.setTint(0xdf1616);
                        return sleep(300);
                    })
                    .then((_) => {
                        dropZone.clearTint();
                    });

                // stat_record.sendAnswer({
                //     'correct': false
                // });
            }

            // stat_record.enterLevel({
            //     'answer_number': 0
            // });

            this.scene.tmp += 1;
            dropZone.clearTint();
            if (this.scene.tmp === 20) {
                this.scene.scene.launch('Level1Finish', {par: this.scene});
            }
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });
    }

    update() {
    }
}
