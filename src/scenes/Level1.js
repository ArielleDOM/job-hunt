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
    }

    create(){
        this.createLevel()
    }

    createLevel(){
        // const playTextStyle = {
        //     fontFamily: '"Press Start 2P"'
        // }

        this.music = this.sound.add('level1Music')

        const width = this.scale.width
        const height = this.scale.height
        
        this.cursors = this.input.keyboard.createCursorKeys()

        this.bg_1 = this.add.tileSprite(0, 0, width, height, "bg_1").setOrigin(0, 0).setScrollFactor(0)
        // this.health = this.add.text(20, 20, 'Health: 100', playTextStyle)



        
        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, 575, 'ground').setScale(2).refreshBody();

        // this.ground = this.add.tileSprite(0, 0, width, 48, "ground");
        // this.ground.setOrigin(0, 0);
        // this.ground.setScrollFactor(0);
        // this.ground.y = 555;
        // this.physics.add.existing(this.ground, false)
        // this.ground.body.setCollideWorldBounds(true)
        // this.ground.body.immovable = true


        
        let platforms = this.physics.add.staticGroup()

        platforms.create(400, 400, 'platform');
        platforms.create(50, 250, 'platform');
        platforms.create(750, 220, 'platform');

        this.player = this.physics.add.sprite(200,300, 'player').setScale(.75);

        this.player.body.setSize(this.player.width, this.player.height, true)

        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 16 }),
            frameRate: 15,
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
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [ { key: 'playerJump', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'hurt',
            frames: [ { key: 'playerJump', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'fist',
            frames: this.anims.generateFrameNumbers('punch', { start: 1, end: 6}),
            frameRate: 10,
            repeat: -1,
        });

        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, width * 4, height);
    
        // making the camera follow the player
        this.myCam.startFollow(this.player);

        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, this.ground)
        

        // this.music.play()
    }

    update(){

        const width = this.scale.width
        const height = this.scale.height

        let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        
        if (this.cursors.left.isDown  && this.player.x > 0 && !this.cursors.down.isDown && !keyA.isDown )
        {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);

        }else if (this.cursors.right.isDown  && this.player.x < width * 4 && !this.cursors.down.isDown && !keyA.isDown ){
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);

        }else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-370);
            this.player.anims.play('jump')
        }

        if (this.cursors.down.isDown){
            this.player.setVelocityY(330);
        }

        // if (this.cursors.down.isDown && this.player.body.touching.down){
        //     this.player.setVelocityY(330);
        //     this.player.anims.play('hurt')
        // }

        if (keyA.isDown && this.player.body.touching.down ){
            this.player.setVelocityX(0);
            this.player.anims.play('fist', true)
        }

        if(!this.player.body.touching.down){
            this.player.anims.play('jump')
        }

        this.bg_1.tilePositionX = this.myCam.scrollX * 1;
    }

    
}