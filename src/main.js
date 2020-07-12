import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'

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
	scene: [TitleScreen]
}

export default new Phaser.Game(config)
