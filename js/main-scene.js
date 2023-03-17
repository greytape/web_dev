import App from './app.js';
import Network from './network.js'

export default class MainScene extends Phaser.Scene {
  constructor(){
    super('MainScene');
  }

  preload() {
    this.load.image('file', 'assets/images/file.png');
    this.load.image('personal_computer', 'assets/images/personal_computer.gif');
  }

  create() {
    this.physics.systems.start('arcade');

    const clientA = new App({ scene: this, appName: 'clientA', x: this.randomSpot(), y: this.randomSpot() });
    const clientB = new App({ scene: this, appName: 'clientB', x: this.randomSpot(), y: this.randomSpot() });
    const clientC = new App({ scene: this, appName: 'clientC', x: this.randomSpot(), y: this.randomSpot() });
    const serverA = new App({ scene: this, appName: 'serverA', x: this.randomSpot(), y: this.randomSpot() });
    this.network = new Network({ scene: this, nodes: [clientA, clientB, clientC, serverA] });

    this.add.existing(clientA);
    this.add.existing(clientB);
    this.add.existing(clientC);
    this.add.existing(serverA);
  }

  update() {
    this.network.update()
  }

  randomSpot() {
    return Math.floor(Math.random() * 400);
  }
}