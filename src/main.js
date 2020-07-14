import Phaser from 'phaser'

import TitleScreen from './scenes/TitleScreen'
import Level1 from './scenes/Level1'
import Controls from './scenes/Controls'
import PreLoader from './scenes/Preloader'
import Ace from './scenes/Ace'
import Got from './scenes/Got'
import Dream from './scenes/Dream'
import Boss from './scenes/Boss'
import Cheater from './scenes/Cheater'

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
	scene: [PreLoader, TitleScreen, Controls, Level1, Ace, Got, Dream, Boss, Cheater]
}

const game = new Phaser.Game(config)

export default game
