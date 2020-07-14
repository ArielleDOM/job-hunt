import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import TweenHelper from './TweenHelper'

export default class TitleScreen extends Phaser.Scene
{
	constructor()
	{
		super('titleScreen')
	}

	preload()
    {
        const fonts = new WebFontLoader(this.load, 'Press Start 2P')
        this.load.addFile(fonts)
    }

    create(){
        this.createTitle()
        this.scene.start('controls')
    }

    createTitle(){

        this.background = this.add.sprite(400, 400, 'bg') 
        this.logo = this.add.image(400, 200, 'logo')
        this.cursors = this.input.keyboard.createCursorKeys()

        this.music = this.sound.add('titleMusic')


        const playTextStyle = {
            fontFamily: '"Press Start 2P"'
        }

        const playText = this.add.text(225, 300, 'PRESS SPACE TO FIND A JOB', playTextStyle)
        playText.setShadow(3, 1, 'rgba(0, 51, 204)', 0)
        TweenHelper.flashElement(this, playText)

        this.anims.create({
            key: 'intro-bg',
            frames: this.anims.generateFrameNumbers('bg', {start:0, end: 7}),
            frameRate: 20,
            repeat: -1
        })

        this.logo.setScale(3.5)
        this.background.anims.play('intro-bg')
        // this.music.play()
    }

    update(){
        if (this.cursors.space.isDown){
            this.scene.start('controls')
            this.music.stop()
        }
    }
}
