import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import TweenHelper from './TweenHelper'

export default class Got extends Phaser.Scene
{
	constructor()
	{
		super('got')
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

        this.player = this.add.sprite(400, 325, 'gotEnding').setScale(.75);

        this.gotMusic = this.sound.add('gotMusic').setVolume(.6)
        this.gotMusic.play()

        const playTextStyle = {
            fontFamily: '"Press Start 2P"',
            align: "center"
        }

        this.anims.create({
            key: 'got',
            frames: this.anims.generateFrameNumbers('gotEnding', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.player.play('got')


        this.add.text(200, 200, 'YOU GOT THE JOB', {
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
            this.gotMusic.stop()
        }
    }
}