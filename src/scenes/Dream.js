import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import TweenHelper from './TweenHelper'

export default class Dream extends Phaser.Scene
{
	constructor()
	{
		super('dream')
	}

	preload()
    {
        const fonts = new WebFontLoader(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
    }

    create(){
        this.controls()
    }

    controls(){

        this.cursors = this.input.keyboard.createCursorKeys()

        this.player = this.add.sprite(400, 325, 'dreamEnding').setScale(1);

        this.dreamMusic = this.sound.add('dreamMusic').setVolume(.6)
        this.dreamMusic.play()

        const playTextStyle = {
            fontFamily: '"Press Start 2P"',
            align: "center"
        }

        this.anims.create({
            key: 'dream',
            frames: this.anims.generateFrameNumbers('dreamEnding', { start: 0, end: 5}),
            frameRate: 15,
            repeat: -1
        });

        this.player.play('dream')


        this.add.text(125, 200, 'YOU GOT YOUR DREAM JOB', {
            fontFamily: '"Press Start 2P"',
            fontSize: "25px",
            align: "center"
        })

        this.time.addEvent({
            delay: 4000,
            callback: () => {
                const playText = this.add.text(210, 450, 'PRESS SPACE TO PLAY AGAIN', playTextStyle)
                TweenHelper.flashElement(this, playText)
            },
            callbackScope: this,
            loop: false
          });

    }

    update(){
        if (this.cursors.space.isDown){
            this.scene.start('titleScreen')
            this.dreamMusic.stop()
        }
    }
}