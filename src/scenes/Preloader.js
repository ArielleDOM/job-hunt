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
		this.load.audio('level1Music', 'assets/TitleScreen/Kreuzberg_Nights.mp3')

		this.load.image('controls', 'assets/directions/arrowKeys.png')
		
		this.load.image('bg_1', 'assets/Level1/scroll-bg.png')
		this.load.spritesheet('player','assets/Level1/dude.png', { frameWidth: 68.23529, frameHeight: 76})
        this.load.spritesheet('playerJump', 'assets/Level1/jump.png', { frameWidth: 50.2, frameHeight: 79});
        this.load.spritesheet('punch', 'assets/Level1/punch.png', { frameWidth: 75, frameHeight: 76})
		this.load.image('ground', 'assets/Level1/groundLong.png')
		this.load.image('citySky', 'assets/Level1/citySky.jpg')
		this.load.image('dumpster', 'assets/Level1/dumpster.png')
		this.load.image('fire', 'assets/Level1/fire.png')
		this.load.image('case', 'assets/Level1/case.png')
		this.load.image('barrier', 'assets/Level1/barrier.png')
		this.load.image('bonusCase', 'assets/Level1/bonusCase.png')
        this.load.image('platform', 'assets/Level1/platform.png')
		this.load.audio('die', 'assets/Level1/die.mp3')
		this.load.audio('alive', 'assets/Level1/alive.mp3')
		this.load.audio('collect', 'assets/Level1/collect.mp3')

		this.load.spritesheet('aceEnding','assets/endings/ace.png', { frameWidth: 270, frameHeight: 260})
		this.load.audio('aceMusic', 'assets/endings/Robot_City.mp3')

		this.load.spritesheet('gotEnding','assets/endings/got.png', { frameWidth: 200, frameHeight: 266})
		this.load.audio('gotMusic', 'assets/endings/Twelve_Speed.mp3')

		this.load.spritesheet('dreamEnding','assets/endings/dream.png', { frameWidth: 231, frameHeight: 200})
		this.load.audio('dreamMusic', 'assets/endings/Wild_Pogo.mp3')

		this.load.spritesheet('bossEnding','assets/endings/boss.png', { frameWidth: 300, frameHeight: 300})
		this.load.audio('bossMusic', 'assets/endings/Cologne_1983.mp3')

		this.load.spritesheet('cheaterEnding','assets/endings/cheater.png', { frameWidth: 300, frameHeight: 300})
		this.load.audio('cheaterMusic', 'assets/endings/Searching_For_You.mp3')

		this.load.audio('gameOverMusic', 'assets/endings/Game_Over.mp3')
	}

	create()
	{
		this.scene.start('titleScreen')
	}
}