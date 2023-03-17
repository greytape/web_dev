export default class App extends Phaser.GameObjects.Container {
  constructor(data) {
    const { scene, appName, x, y } = data;
    super(scene, x, y, );
    this.scene = scene;

    this.display = scene.add.sprite(0, 0, 'personal_computer');
    this.display.displayWidth = 50;
    this.display.displayHeight = 50;
    this.setSize(this.display.width, this.display.height);

    this.label = scene.add.text(0, 0, appName, { fontSize: '12px', fill: '#fff' });

    this.add(this.display);
    this.add(this.label);

    this.makeDraggable();
    this.setupMessageSender();
  }

  setupMessageSender() {
    this.setInteractive({ useHandCursor: true });

    this.on('pointerdown', () => {
      this.emit('messageSent', this);
    });
  }

  makeDraggable() {
    this.setInteractive({ draggable: true });

    // Define drag variables
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // When the circle is pointer-down, start dragging
    this.on('pointerdown', (pointer) => {
      dragging = true;
      offsetX = pointer.x - this.x;
      offsetY = pointer.y - this.y;
    });

    // When the pointer is moved, update the circle position if dragging
    this.scene.input.on('pointermove', (pointer) => {
      if (dragging) {
        this.x = pointer.x - offsetX;
        this.y = pointer.y - offsetY;
      }
    });

    // When the pointer is released, stop dragging
    this.scene.input.on('pointerup', () => {
      dragging = false;
    });
  }
}