class MainMenu {
    create(data) {
        // Game score data passed from game scene
        let timeCompleted = data.timeCompleted ? data.timeCompleted : 0;

        // If no best time set bestTime to 0
        if (localStorage.getItem('bestTime') == null) {
            localStorage.setItem('bestTime', 0);
        }

        let lastBestTime = Number(localStorage.getItem('bestTime'));

        // Set new best time
        // First score logic: If best time is set to initial value
        if (lastBestTime == 0 && timeCompleted > 0) {
            localStorage.setItem('bestTime', timeCompleted);
        } // Logic for scores after first score
        else if (timeCompleted < lastBestTime) {
            localStorage.setItem('bestTime', timeCompleted);
        }

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
        let scoreLabel = this.add.text(400, 400, scoreText, { font: '25px Silkscreen', fill: 'blue' });
        scoreLabel.setOrigin(0.5, 0.5);

        // Best time score
        let bestScoreText = 'Best Time: ' + localStorage.getItem('bestTime');
        let bestScoreLabel = this.add.text(400, 375, bestScoreText, { font: '25px Silkscreen', fill: 'green' });
        bestScoreLabel.setOrigin(0.5, 0.5);

        // Add key
        this.enterKey = this.input.keyboard.addKey('enter');
    }

    update() {
        // If user presses enter key, start game
        if (this.enterKey.isDown) {
            this.scene.start('play');
        }
    }
}