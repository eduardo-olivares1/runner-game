class Load {
    preload() {
        this.load.setBaseURL(window.location.origin);
        this.load.audio('jump',['./static/assets/jump.mp3']);
        this.load.audio('consume',['./static/assets/sandra_nom_clean.mp3']);
        this.load.audio('background-music',['./static/assets/teazone.mp3']);
        this.load.image('main-menu-background', './static/assets/background.png');
        this.load.image('background', './static/assets/sky.png');
        this.load.image('ground', './static/assets/platform.png');
        this.load.image('collectible', './static/assets/boba_pearl.png');
        this.load.image('black-pixel', './static/assets/black-pixel.png');
        this.load.spritesheet('player', './static/assets/boba_tea_sheet.png',
            { frameWidth: 64, frameHeight: 96 }
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