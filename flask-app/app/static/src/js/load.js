class Load {
    preload() {
        this.load.setBaseURL(window.location.origin);
        this.load.image('main-menu-background', './static/assets/background.png');
        this.load.image('background', './static/assets/sky.png');
        this.load.image('ground', './static/assets/platform.png');
        this.load.image('collectible', './static/assets/boba_pearl.png');
        this.load.image('black-pixel', './static/assets/black-pixel.png');
        this.load.spritesheet('player', './static/assets/woof.png',
            { frameWidth: 32, frameHeight: 32 }
        );

        this.loadLabel = this.add.text(250, 170, 'loading', { font: '30px Silkscreen', fill: '#fff' });
        this.loadLabel.setOrigin(0.5, 0.5);
    }

    create() {
        this.scene.start('main-menu');
    }

    update() {
        this.loadLabel.angle += 5;
    }
}