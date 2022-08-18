class MainMenu {
    create() {
        this.add.image(400, 300, 'main-menu-background');
        let nameLabel = this.add.text(400, -50, 'Tea Zone', { font: '50px Silkscreen', fill: 'black' });
        nameLabel.setOrigin(0.5, 0.5);

        this.tweens.add({ targets: nameLabel, y: 80, duration: 1000, ease: 'bounce.out' })

        let startText = 'press the Enter key to start';
        let startLabel = this.add.text(400, 300, startText, { font: '25px Silkscreen', fill: 'black' });
        startLabel.setOrigin(0.5, 0.5);

        this.enterKey = this.input.keyboard.addKey('enter');
    }

    update() {
        if (this.enterKey.isDown) {
            this.scene.start('play');
        }
    }
}