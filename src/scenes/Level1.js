import Phaser from 'phaser'
import WebFontLoader from './WebFont'

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
        this.dieEffect = this.sound.add('die').setVolume(.7)
        this.aliveEffect = this.sound.add('alive').setVolume(.5)
        this.collectEffect = this.sound.add('collect').setVolume(.4)

        const width = this.scale.width
        const height = this.scale.height
        this.score = 0
        
        this.cursors = this.input.keyboard.createCursorKeys()

        this.bg_2 = this.add.tileSprite(0, 0, width, height, "citySky").setOrigin(0, 0).setScrollFactor(0)
        this.bg_1 = this.add.tileSprite(0, 0, width, height, "bg_1").setOrigin(0, 0).setScrollFactor(0)
        
        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, 575, 'ground').setScale(2).refreshBody();

        this.fires = this.physics.add.group()
        this.platforms = this.physics.add.staticGroup()
        this.barriers = this.physics.add.staticGroup()

        this.barriers.create(-20, 250, 'barrier')
        this.barriers.create(3250, 250, 'barrier')


        this.platforms.create(120, 250, 'platform');
        this.platforms.create(400, 400, 'platform');

        this.platforms.create(900, 140, 'platform');
        this.platforms.create(900, 300, 'platform');
        this.platforms.create(900, 460, 'platform');
       
        
        this.platforms.create(1425, 360, 'platform');
        this.platforms.create(2200, 250, 'platform');
        this.platforms.create(3015, 160, 'platform');


        this.fires.create(120, 150, 'fire').setScale(.2).setBounce(1).setVelocity(Phaser.Math.Between(-200, 200), 20)
        this.fires.create(400, 300, 'fire').setScale(.2).setBounce(1).setVelocity(Phaser.Math.Between(-200, 200), 20)
        this.fires.create(900, 300, 'fire').setScale(.2).setBounce(1).setVelocity(Phaser.Math.Between(-200, 200), 20)
        this.fires.create(1425, 360, 'fire').setScale(.2).setBounce(1).setVelocity(Phaser.Math.Between(-200, 200), 20)
        this.fires.create(3015, 160, 'fire').setScale(.2).setBounce(1).setVelocity(Phaser.Math.Between(-200, 200), 20)

        this.player = this.physics.add.sprite(100, 460, 'player').setScale(.75);

        this.player.body.setSize(this.player.width, this.player.height, true)
        this.player.tint= 0xff0000

        this.floorCases = this.physics.add.group({
            key: 'case',
            repeat: 39,
            setXY: { x: 20, y: Math.floor(Math.random() * 500), stepX: 70 }
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
        this.myCam.startFollow(this.player);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.ground)
        this.physics.add.collider(this.floorCases, this.platforms);
        this.physics.add.collider(this.floorCases, this.ground)
        this.physics.add.collider(this.bonusCases, this.platforms);
        this.physics.add.collider(this.bonusCases, this.ground)
        this.physics.add.collider(this.fires, this.platforms);
        this.physics.add.collider(this.fires, this.ground)
        this.physics.add.collider(this.fires, this.barriers)


        this.hurt = this.physics.add.overlap(this.player, this.fires, this.hitFire, null, this);
        this.physics.add.overlap(this.player, this.floorCases, this.collectFloorCases, null, this);
        this.physics.add.overlap(this.player, this.bonusCases, this.collectBonusCases, null, this);
        
        this.initialTime = 5;
        this.timeText = this.add.text(32, 32, 'TIME: ' + this.initialTime,  playTextStyle).setScrollFactor(0);
        this.scoreText = this.add.text(32, 64, 'SCORE: 0',  playTextStyle).setScrollFactor(0)
        this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.music.play()
    }



    update(){

        const width = this.scale.width

        let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        
        if (this.cursors.left.isDown  && this.player.x > 0 && !this.cursors.down.isDown && !keyA.isDown)
        {
            this.player.setVelocityX(-234)
            this.player.anims.play('left', true);

        }else if (this.cursors.right.isDown  && this.player.x < width * 4 && !this.cursors.down.isDown && !keyA.isDown){
            
            this.player.setVelocityX(234)
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

    onEvent(){
        this.timeText.setText('TIME: ' + this.initialTime);

        if(this.initialTime === 0){
            this.scene.start('titleScreen')
            this.music.stop()
        }else{
            this.initialTime -= 1;
        }
    }

    collectFloorCases(player, cases){
        
        cases.disableBody(true, true);
        this.score += 10
        this.scoreText.setText('SCORE:' + this.score)
        this.collectEffect.play()


        if(this.floorCases.countActive(true) === 0){

            this.floorCases.children.iterate(function(child){
                child.enableBody(true, child.x , Math.floor(Math.random() * 500), true, true)
            })

            var x = (player.x < 1200) ? Phaser.Math.Between(0, 1200) : Phaser.Math.Between(1200, 2400)

            var fire = this.fires.create(x, 16, 'fire').setScale(.2)
            fire.setBounce(1)
            fire.setVelocity(Phaser.Math.Between(-200, 200), 20)
        }
    }

    collectBonusCases(player, cases){
        cases.disableBody(true, true);
        this.score += 100
        this.scoreText.setText('SCORE:' + this.score)
        this.collectEffect.play()
        
    }

    hitFire(){
        this.player.disableBody(true, true);

        if(this.hurt.active){
            this.dieEffect.play()
        }

        this.hurt.active = false
        
        
        if(this.score <= 50){
            this.score = 0
            this.scoreText.setText('SCORE:' + this.score)
        }else if(this.score > 50){
            this.score -= 50
            this.scoreText.setText('SCORE:' + this.score)
        }

        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
          });

          this.time.addEvent({ 
            delay: 2200, 
            callback: () => {
                this.player.alpha = 1
                this.hurt.active = true
            }, 
            callbackScope: this, 
            loop: false 
        });
    }

    resetPlayer(){
        this.player.enableBody(true, this.player.x, this.player.y, true, true)
        this.aliveEffect.play();

        this.tweens.add({
          targets: this.player,
          ease: 'Power1',
          duration: 1500,
          repeat:3,
          onComplete: function(){
            this.player.alpha = .7;
          },
          callbackScope: this
        });
      }   
}