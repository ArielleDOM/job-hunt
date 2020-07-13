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
        const playTextStyle = {
            fontFamily: '"Press Start 2P"'
        }

        this.music = this.sound.add('level1Music')

        const width = this.scale.width
        const height = this.scale.height
        
        this.cursors = this.input.keyboard.createCursorKeys()

        this.bg_2 = this.add.tileSprite(0, 0, width, height, "citySky").setOrigin(0, 0).setScrollFactor(0)
        this.bg_1 = this.add.tileSprite(0, 0, width, height, "bg_1").setOrigin(0, 0).setScrollFactor(0)
        
        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, 575, 'ground').setScale(2).refreshBody();

        
        let platforms = this.physics.add.staticGroup()

        
        platforms.create(120, 250, 'platform');
        platforms.create(400, 400, 'platform');

        platforms.create(900, 140, 'platform');
        platforms.create(900, 300, 'platform');
        platforms.create(900, 460, 'platform');
       
        
        platforms.create(1425, 360, 'platform');
        platforms.create(2200, 250, 'platform');
        platforms.create(3015, 160, 'platform');

        this.player = this.physics.add.sprite(100, 460, 'player').setScale(.75);

        this.player.body.setSize(this.player.width, this.player.height, true)

        this.floorCases = this.physics.add.group({
            key: 'case',
            repeat: 70,
            setXY: { x: 12, y: 500, stepX: 70 }
        });

        this.bonusCases = this.physics.add.group({
            key: 'bonusCase',
            repeat: 4,
            setXY: { x: 2850, y: 0, stepX: 70 }
        });

        
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
        this.physics.add.collider(this.floorCases, platforms);
        this.physics.add.collider(this.floorCases, this.ground)
        this.physics.add.collider(this.bonusCases, platforms);
        this.physics.add.collider(this.bonusCases, this.ground)
        
        this.initialTime = 5;
        this.timeText = this.add.text(32, 32, 'TIME: ' + this.initialTime,  playTextStyle).setScrollFactor(0);
        this.scoreText = this.add.text(32, 64, 'SCORE: 0',  playTextStyle).setScrollFactor(0)
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        // this.music.play()
    }



    update(){

        const width = this.scale.width
        const height = this.scale.height

        let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        
        if (this.cursors.left.isDown  && this.player.x > 0 && !this.cursors.down.isDown && !keyA.isDown )
        {
            this.player.x -=4;
            this.player.anims.play('left', true);

        }else if (this.cursors.right.isDown  && this.player.x < width * 4 && !this.cursors.down.isDown && !keyA.isDown ){
            this.player.x +=4;
            this.player.anims.play('right', true);

        }else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if ((this.cursors.space.isDown || this.cursors.up.isDown)  && this.player.body.touching.down){
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

        this.bg_1.tilePositionX = this.myCam.scrollX * .5;
        this.bg_2.tilePositionX = this.myCam.scrollX * .3;
    }

    formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }

    onEvent(){
        this.timeText.setText('TIME: ' + this.initialTime);

        if(this.initialTime === 0){
            this.add.text(100, 100, 'I am working')
        }else{
            this.initialTime -= 1;
        }
    }

    collectCase(){

    }
    
}