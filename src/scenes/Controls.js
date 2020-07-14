import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import TweenHelper from './TweenHelper'

export default class TitleScreen extends Phaser.Scene
{
	constructor()
	{
		super('controls')
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

        this.sound.add('alive').setVolume(.5).play()

        const playTextStyle = {
            fontFamily: '"Press Start 2P"',
            align: "center"
        }

        this.add.text(150, 100, 'AVOID', playTextStyle)
        this.add.image(150, 150, 'fire').setScale(.25)
        this.add.text(175, 150, '-50', playTextStyle)
        
        this.add.text(525, 100, 'COLLECT', playTextStyle)
        this.add.image(535, 150, 'case')
        this.add.text(560, 145, '+10', playTextStyle)
        this.add.image(535, 200, 'bonusCase')
        this.add.text(560, 195, '+100', playTextStyle)

        this.add.text(315, 100, 'CONTROLS', playTextStyle)
        this.add.image(375, 175, 'controls').setScale(.25)


        this.add.text(220, 300, 'COLLECT AS MANY CASES\nBEFORE TIME RUNS OUT', playTextStyle)

        this.time.addEvent({
            delay: 4000,
            callback: () => {
                const playText = this.add.text(210, 400, 'PRESS SPACE TO CONTINUE', playTextStyle)
                TweenHelper.flashElement(this, playText)
            },
            callbackScope: this,
            loop: false
          });

    }

    update(){
        if (this.cursors.space.isDown){
            this.scene.start('level1')
        }
    }
}
