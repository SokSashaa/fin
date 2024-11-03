import { stat } from '../helpers/statistics.js';

export default class Zone {
    constructor(scene, zone_type) {
        this.zone_type = zone_type;

        this.renderZone = (x, y, sprite) => {
            let dropZone = scene.add.image(x, y, sprite).setInteractive().setScale(0.25*stat.koeff, 0.25*stat.koeff);
            dropZone.input.dropZone = true;
            return dropZone;
        }
    }
}