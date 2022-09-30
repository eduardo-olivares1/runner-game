let documentHeight = document.documentElement.scrollHeight * .90;

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-game',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: documentHeight * 1.3333333,
            height: documentHeight,
        },
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }
        }
    }
};

let game = new Phaser.Game(config);

game.scene.add('load', Load);
game.scene.add('main-menu', MainMenu);
game.scene.add('play', Play);

game.scene.start('load');
