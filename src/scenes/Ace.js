import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import TweenHelper from './TweenHelper'

export default class Ace extends Phaser.Scene
{
	constructor()
	{
		super('ace')
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

        this.player = this.add.sprite(400, 325, 'aceEnding').setScale(.75);

        this.aceMusic = this.sound.add('aceMusic').setVolume(.7)
        this.aceMusic.play()

        const playTextStyle = {
            fontFamily: '"Press Start 2P"',
            align: "center"
        }

        this.anims.create({
            key: 'ace',
            frames: this.anims.generateFrameNumbers('aceEnding', { start: 0, end: 20 }),
            frameRate: 15,
            repeat: -1
        });

        this.player.play('ace')


        this.add.text(130, 200, 'YOU ACED THE INTERVIEW', {
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
            this.aceMusic.stop()
        }
    }
}