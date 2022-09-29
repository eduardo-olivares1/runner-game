class MainMenu {
    create(data) {

        let timeCompleted = data.timeCompleted ? data.timeCompleted : 0;

        this.add.image(400, 300, 'main-menu-background');

        // Game title
        let nameLabel = this.add.text(400, -50, 'Tea Zone', { font: '50px Silkscreen', fill: 'black' });
        nameLabel.setOrigin(0.5, 0.5);
        this.tweens.add({ targets: nameLabel, y: 200, duration: 1000, ease: 'bounce.out' })

        // Call to action
        let startText = 'press <<Enter>> to start';
        let startLabel = this.add.text(400, 300, startText, { font: '25px Silkscreen', fill: 'black' });
        startLabel.setOrigin(0.5, 0.5);

        // Game time score
        let scoreText = 'Last Time: ' + timeCompleted;
        let scoreLabel = this.add.text(400, 400, scoreText, { font: '25px Silkscreen', fill: 'black' });
        scoreLabel.setOrigin(0.5, 0.5);

        this.enterKey = this.input.keyboard.addKey('enter');
    }

    update() {
        if (this.enterKey.isDown) {
            this.scene.start('play');
        }
    }
}