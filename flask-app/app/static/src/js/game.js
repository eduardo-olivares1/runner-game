let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Global Game Variables
const maxCollectibles = 11;
const start = Date.now();
const maxTime = 30.00;

let player;
let collectibles;
let platforms;
let cursors;
let scoreText;
let amountCollected = 0;
let timeElapsed = 0;
let timeCompleted = 0;

let gameTimer = setInterval(() => {
    let delta = Date.now() - start;
    let deltaToDisplay = (delta / 1000).toFixed(1);
    timeElapsed = deltaToDisplay;

    if (deltaToDisplay >= maxTime) {
        clearInterval(gameTimer);
    } else if (amountCollected >= maxCollectibles) {
        clearInterval(gameTimer);
    }

}, 100);

let game = new Phaser.Game(config);

function preload() {
    this.load.setBaseURL(window.location.origin);
    this.load.image('background', './static/assets/sky.png');
    this.load.image('ground', './static/assets/platform.png');
    this.load.image('collectible', './static/assets/boba_pearl.png');
    this.load.spritesheet('player', './static/assets/woof.png',
        { frameWidth: 32, frameHeight: 32 }
    );
}

function create() {
    this.add.image(400, 300, 'background');

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(650, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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

    cursors = this.input.keyboard.createCursorKeys();

    collectibles = this.physics.add.group({
        key: 'collectible',
        repeat: maxCollectibles - 1,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    collectibles.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(collectibles, platforms);
    this.physics.add.overlap(player, collectibles, collect, null, this);

    scoreText = this.add.text(16, 16, `Boba Collected: ${amountCollected} / ${maxCollectibles}`, { fontFamily: 'Silkscreen', fontSize: '32px', fill: '#000' });
    timerText = this.add.text(550, 16, `Time:`, { fontFamily: 'Silkscreen', fontSize: '32px', fill: '#000' });
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-515);
    }

    if (timeElapsed >= maxTime) {
        timerText.setText(`Time: MAX`)
    } else {
        timerText.setText(`Time: ${timeElapsed}`)
    }

}

function collect(player, collectible) {
    collectible.disableBody(true, true);
    amountCollected += 1;
    scoreText.setText(`Boba Collected: ${amountCollected} / ${maxCollectibles}`);
}