export default class Network extends Phaser.GameObjects.Container {
  constructor(data) {
    const { scene, nodes } = data
    super(scene)

    this.nodes = nodes;

    this.connections = [];
    this.nodes.forEach((node) => {
      node.on('messageSent', this.messageSender, this);
      this.nodes.forEach((otherNode) => {
        if (node === otherNode) return;

        const randomNumber = Math.random();
        console.log(randomNumber);
        if (randomNumber < 0.25) {
          console.log('connected')
          this.connections.push({ from: node, to: otherNode});
        }
      });
    });
    console.log(this.connections);

    this.messages = [{ from: nodes[0], to: nodes[1], progress: 0, direction: 1, sprite: new Phaser.GameObjects.Sprite(scene, 25, 25, 'file') }];
    this.messages.forEach((message) => {
      this.addSprite(message.sprite);
    });

    this.scene.graphics = this.scene.add.graphics();

    this.drawLine();
    this.messageAlongLine();
  }

  update() {
    this.drawLine();
    this.messageAlongLine();
  }

  drawLine() {
    this.scene.graphics.clear();
    this.connections.forEach((connection) => {
      this.scene.graphics.lineStyle(2, 0xffffff, 1);
      this.scene.graphics.lineBetween(connection.from.x, connection.from.y, connection.to.x, connection.to.y);
    });
  }

  messageAlongLine() {
    this.messages.forEach((message) => {
      if (message.progress > 0.99) {
        message.sprite.destroy();
      };

      // Update the progress value (0 to 1) based on the movingSpriteDirection
      message.progress += 0.005 * message.direction;

      // Calculate the new position of the message based on the progress
      message.sprite.x = Phaser.Math.Linear(message.from.x, message.to.x, message.progress);
      message.sprite.y = Phaser.Math.Linear(message.from.y, message.to.y, message.progress);
    });
  }

  addSprite(sprite) {
    this.scene.add.existing(sprite)
    sprite.displayWidth = 25;
    sprite.displayHeight = 25;
  }


  messageSender(sendingApp) {
    const appsToReceiveMessage = this.connections
      .filter((connection) => connection.from === sendingApp || connection.to === sendingApp)
      .map((connection) => {
        if (connection.from === sendingApp) {
          return connection.to;
        } else {
          return connection.from;
        }
      });
    appsToReceiveMessage.forEach((receivingApp) => {
      const newSprite = new Phaser.GameObjects.Sprite(this.scene, sendingApp.x, sendingApp.y, 'file')
      this.addSprite(newSprite);
      this.messages.push(
        {
          from: sendingApp,
          to: receivingApp,
          progress: 0,
          direction: 1,
          sprite: newSprite
        }
      );
    })
  }
}