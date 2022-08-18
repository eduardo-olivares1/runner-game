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
    }
};

let game = new Phaser.Game(config);

game.scene.add('main', Main);
game.scene.start('main')
