/**
 * Helps draw user input.
 *
 * @author Sam Roussel
 */

class Visual {
	constructor() {
		this.colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
		this.color = this.colors[0]
		this.isErasing = false
	}

	/**
	 * Saves the canvas.
	 */
 	save() {
		saveCanvas('output.png')
	}

	/**
	 * Returns whether the mouse position is valid.
	 */
	isMouseValid() {
		return mouseY < windowHeight - 20
	}

	/**
	 * Sets the color to draw with.
	 */
	setColor = (index) => {
		this.color = this.colors[index]
	}

	/**
	 * Toggles erasing mode.
	 */
	toggleErase = () => {
		this.isErasing = !this.isErasing

		if (this.isErasing) {
			erase()
		} else {
			noErase()
		}
	}
}
