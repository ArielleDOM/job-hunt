import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import Level1 from './scenes/Level1'
import PreLoader from './scenes/Preloader'

const config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 },
			debug: true
		}
	},
	scene: [PreLoader, TitleScreen, Level1]
}

const game = new Phaser.Game(config)

export default game
