import MainScene from "./main-scene.js"

const config = {
  width: 512,
  height: 512,
  backgroundColor: '#3A6421',
  type: Phaser.AUTO,
  parent: 'web-dev',
  scene:[MainScene],
  scale: {
    zoom: 2,
  },
  physics: {
    default: 'arcade'
  }
}

new Phaser.Game(config)