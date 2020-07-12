import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import Level1 from './scenes/Level1'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	render: {
		pixelArt: true,
	},
	scene: [TitleScreen, Level1]
}

const game = new Phaser.Game(config)

export default game
