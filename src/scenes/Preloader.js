import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
	{
        this.load.spritesheet('bg', 'assets/TitleScreen/intro-bg.jpg', {frameWidth: 800, frameHeight: 600})
        this.load.image('logo', 'assets/TitleScreen/logo.png')
		this.load.audio('titleMusic', 'assets/TitleScreen/Lands_Unknown.mp3')
		
		this.load.image('bg_1', 'assets/Level1/scroll-bg.png')
        this.load.spritesheet('player','assets/Level1/dude.png', { frameWidth: 68.23529, frameHeight: 76})
        this.load.spritesheet('playerJump', 'assets/Level1/jump.png', { frameWidth: 50.2, frameHeight: 79});
        this.load.spritesheet('punch', 'assets/Level1/punch.png', { frameWidth: 75, frameHeight: 76})
		this.load.image('ground', 'assets/Level1/groundLong.png')
		this.load.image('citySky', 'assets/Level1/citySky.jpg')
		this.load.image('dumpster', 'assets/Level1/dumpster.png')
		this.load.image('fire', 'assets/Level1/fire.png')
		this.load.image('case', 'assets/Level1/case.png')
		this.load.image('bonusCase', 'assets/Level1/bonusCase.png')
        this.load.image('platform', 'assets/Level1/platform.png')
        this.load.audio('level1Music', 'assets/TitleScreen/Kreuzberg_Nights.mp3')
	}

	create()
	{
		this.scene.start('titleScreen')
	}
}