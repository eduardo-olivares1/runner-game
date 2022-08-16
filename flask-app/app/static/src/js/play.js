class Main {

    preload() {
        this.load.setBaseURL(window.location.origin);
        this.load.image('background', './static/assets/sky.png');
        this.load.image('ground', './static/assets/platform.png');
        this.load.image('collectible', './static/assets/boba_pearl.png');
        this.load.spritesheet('player', './static/assets/woof.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    create() {
        this.player = null;
        this.collectibles = null;
        this.platforms = null;
        this.cursors = null;
        this.wasd_keys = null;
        this.scoreText = null;
        this.amountCollected = 0;
        this.timeElapsed = 0;
        this.timeCompleted = 0;
        this.maxCollectibles = 11;
        let start = Date.now();
        this.gameTimer = setInterval(() => {
            let delta = Date.now() - start;
            this.timeElapsed = (delta / 1000).toFixed(1);
        }, 100);
        this.maxTime = 30.00;

        this.add.image(400, 300, 'background');

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(650, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'player');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd_keys = this.input.keyboard.addKeys({ W: 'W', A: 'A', S: 'S', D: 'D' });

        this.collectibles = this.physics.add.group({
            key: 'collectible',
            repeat: this.maxCollectibles - 1,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.collectibles.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.collectibles, this.platforms);
        this.physics.add.overlap(this.player, this.collectibles, this.collect, null, this);

        this.scoreText = this.add.text(16, 16, `Boba Collected: ${this.amountCollected} / ${this.maxCollectibles}`, { fontFamily: 'Silkscreen', fontSize: '32px', fill: '#000' });
        this.timerText = this.add.text(550, 16, `Time:`, { fontFamily: 'Silkscreen', fontSize: '32px', fill: '#000' });
    }

    update() {
        if (this.cursors.left.isDown || this.wasd_keys.A.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown || this.wasd_keys.D.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down || this.wasd_keys.W.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-515);
        }

        if (this.timeElapsed >= this.maxTime) {
            clearInterval(this.gameTimer);
            this.timerText.setText(`Time: MAX`);
            this.timerText.setColor('red');
        } else if (this.timeElapsed > 0) {
            this.timerText.setText(`Time: ${this.timeElapsed}`);
            this.timerText.setColor('green');
        } else {
            this.timerText.setText(`Time: ${this.timeElapsed}`);
        }
    }

    collect(player, collectible) {
        collectible.disableBody(true, true);
        this.amountCollected += 1;
        this.scoreText.setText(`Boba Collected: ${this.amountCollected} / ${this.maxCollectibles}`);

        if (this.amountCollected >= this.maxCollectibles) {
            this.timeElapsed = this.timeElapsed;
            clearInterval(this.gameTimer);
        }
    }


}