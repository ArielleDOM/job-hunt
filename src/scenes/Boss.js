import Phaser from 'phaser'
import WebFontLoader from './WebFont'
import TweenHelper from './TweenHelper'

export default class Boss extends Phaser.Scene
{
	constructor()
	{
		super('boss')
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

        this.player = this.add.sprite(400, 325, 'bossEnding').setScale(1);

        this.bossMusic = this.sound.add('bossMusic').setVolume(.6)
        this.bossMusic.play()

        const playTextStyle = {
            fontFamily: '"Press Start 2P"',
            align: "center"
        }

        this.anims.create({
            key: 'boss',
            frames: this.anims.generateFrameNumbers('bossEnding', { start: 0, end: 11}),
            frameRate: 15,
            repeat: -1
        });

        this.player.play('boss')


        this.add.text(115, 185, 'YOU GOT PROMOTED TO BOSS', {
            fontFamily: '"Press Start 2P"',
            fontSize: "25px",
            align: "center"
        })

        this.time.addEvent({
            delay: 4000,
            callback: () => {
                const playText = this.add.text(220, 475, 'PRESS SPACE TO PLAY AGAIN', playTextStyle)
                TweenHelper.flashElement(this, playText)
            },
            callbackScope: this,
            loop: false
          });

    }

    update(){
        if (this.cursors.space.isDown){
            this.scene.start('titleScreen')
            this.bossMusic.stop()
        }
    }
}