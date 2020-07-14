import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import TweenHelper from './TweenHelper'

export default class Cheater extends Phaser.Scene
{
	constructor()
	{
		super('cheater')
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

        this.player = this.add.sprite(375, 325, 'cheaterEnding').setScale(.8);

        this.cheaterMusic = this.sound.add('cheaterMusic').setVolume(.6)
        this.cheaterMusic.play()

        const playTextStyle = {
            fontFamily: '"Press Start 2P"',
            align: "center"
        }

        this.anims.create({
            key: 'cheater',
            frames: this.anims.generateFrameNumbers('cheaterEnding', { start: 0, end: 5}),
            frameRate: 15,
            repeat: -1
        });

        this.player.play('cheater')


        this.add.text(250, 165, 'YOU CHEATED', {
            fontFamily: '"Press Start 2P"',
            fontSize: "25px",
            align: "center"
        })

        this.time.addEvent({
            delay: 4000,
            callback: () => {
                const playText = this.add.text(220, 475, 'PRESS SPACE TO REALLY PLAY', playTextStyle)
                TweenHelper.flashElement(this, playText)
            },
            callbackScope: this,
            loop: false
          });

    }

    update(){
        if (this.cursors.space.isDown){
            this.scene.start('titleScreen')
            this.cheaterMusic.stop()
        }
    }
}