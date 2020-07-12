import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import game from '../main'

export default class Level1 extends Phaser.Scene
{
	constructor()
	{
		super('level1')
	}

	preload()
    {
        const fonts = new WebFontLoader(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
        this.load.spritesheet('bg_1', 'assets/Level1/scroll-bg.png', {frameWidth: 800, frameHeight: 600})
        this.load.spritesheet('player','assets/Level1/dude.png', { frameWidth: 68.23529, frameHeight: 76})
        this.load.spritesheet('playerJump', 'assets/Level1/jump.gif', { frameWidth: 51.1, frameHeight: 88});
        this.load.image('ground', 'assets/Level1/platform.png')
        this.load.audio('level1Music', 'assets/TitleScreen/Kreuzberg_Nights.mp3')
    }

    create(){
        this.createLevel()
    }

    createLevel(){
        const playTextStyle = {
            fontFamily: '"Press Start 2P"'
        }
        this.music = this.sound.add('level1Music')

        this.add.text(20, 20, 'Health: 100', playTextStyle)
        this.cursors = this.input.keyboard.createCursorKeys()

        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_1")
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setScrollFactor(0);


        const platforms = this.physics.add.staticGroup()

        this.ground = platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(400, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // this.ground = this.add.tileSprite(400, 575, game.config.width, 48, "ground");
        this.ground.setScrollFactor(0);
        this.ground.y = 12 * 16;

        this.player = this.physics.add.sprite(100, 450, 'player').setScale(.75);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 8 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [ { key: 'playerJump', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'hurt',
            frames: [ { key: 'playerJump', frame: 9 } ],
            frameRate: 20
        });

        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);
    
        // making the camera follow the player
        this.myCam.startFollow(this.player);

        this.physics.add.collider(this.player, platforms);

        this.music.play()
    }

    update(){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-200);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(200);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }

        // if (this.cursors.down.isDown)
        // {
        //     this.player.setVelocityY(330);
        // }

        // if (this.cursors.down.isDown && this.player.body.touching.down)
        // {
        //     this.player.setVelocityY(330);
        //     this.player.anims.play('hurt')
        // }

        // if(!this.player.body.touching.down){
        //     this.player.anims.play('jump')
        // }

        this.bg_1.tilePositionX = this.myCam.scrollX * 1;
        this.ground.tilePositionX = this.myCam.scrollX;
    }
}