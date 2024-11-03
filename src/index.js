import mainMenu from './scenes/mainMenu.js';
import Level1 from './scenes/level1.js';
import Level2 from './scenes/level2.js';
import Level3 from './scenes/level3.js';
import Window from './scenes/modalWindow.js';
import Description from './scenes/description.js';
import MonthEnd from './scenes/monthEnd.js';
import levelChoice from './scenes/levelChoice.js';
import Borrow from './scenes/borrow.js';
import Bonus from './scenes/bonus.js';
import Save from './scenes/save.js';
import LevelFinish from './scenes/levelFinish.js';
import Level1Finish from './scenes/level1Finish.js';
import Level2Finish from './scenes/level2Finish.js';
import Level3Finish from './scenes/level3Finish.js';
import characterChoice from './scenes/characterChoice.js';
import characterCustomization from './scenes/characterCustomization.js';
import RandomWindow from './scenes/randomWindow.js';
import BonusWindow from './scenes/bonusWindow.js';
import Rule from './scenes/rule.js';

const config = {
  type: Phaser.WEBGL,
  parent: 'phaser-example',
  width: innerWidth,
  height: innerHeight,
  scene: [
    mainMenu,
    characterChoice,
    Level1,
    Level1Finish,
    levelChoice,
    Level2,
    Level3,
    Window,
    Description,
    MonthEnd,
    LevelFinish,
    RandomWindow,
    Borrow,
    Save,
    Bonus,
    BonusWindow,
    Rule,
    Level2Finish,
    Level3Finish,
    characterCustomization,
  ],
};
const game = new Phaser.Game(config);
