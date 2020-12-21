/**
 * An interactive music and visual art creator.
 *
 * The system is a synthesis between visual and musical art. The user is able to choose
 * their notes/chords and colors, as well as their volume and stroke width. They can draw/erase
 * a visual image and record music, saving each to a file as they wish.
 *
 * @author Sam Roussel
 */

let buttonLabels = ['Start Audio Recording', 'Stop Audio Recording', 'Playback Audio', 'Save Audio',
	'Toggle Note/Chord', 'Toggle Erase', 'Save Visual']
let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j']
let music, visual, slider

const MIN_STROKE = 1
const MAX_STROKE = 20

/**
 * Sets up the canvas, the music and visual classes, and creates UI elements.
 */
function setup() {
	createCanvas(windowWidth, windowHeight)
	music = new Music()
	visual = new Visual()
	slider = createSlider(MIN_STROKE, MAX_STROKE).style('width', '80px')

	let callbacks = [music.startRecording, music.stopRecording, music.playback, music.save, music.togglePlayChords,
		visual.toggleErase, visual.save]

	for (var i = 0; i < buttonLabels.length; ++i) {
		makeButton(buttonLabels[i], callbacks[i])
	}

	textFont('monaco')
	textSize(17)
	textAlign(CENTER, CENTER)
	text('Welcome! Interact with buttons at the bottom of the page to manage your recording.\
		\nChange the note/chord and color by pressing "a" through "j" on the keyboard.', windowWidth / 2, windowHeight / 2)
	setTimeout(() => { noStroke(); rect(0, 0, windowWidth, windowHeight - 20) }, 5000) // clear text after 5 seconds
}

/**
 * Draws to the canvas based on user input.
 */
function draw() {
	if (mouseIsPressed) {
		stroke(visual.color)
		strokeWeight(slider.value())

		if (visual.isMouseValid()) {
		  line(mouseX, mouseY, pmouseX, pmouseY)
		}
	}
}

/**
 * Called when a touch is started; plays the selected note/chord.
 */
function touchStarted() {
	if (visual.isMouseValid()) {
		// Map volume from the slider value to [0, 1]
		let volume = map(slider.value(), MIN_STROKE, MAX_STROKE, 0, 1)
		music.play(volume)
	}
}

/**
 * Called when the mouse is released; ends the current sound.
 */
function mouseReleased() {
	music.stop()
}

/**
 * Called when a key is typed; configures color and note.
 */
function keyTyped() {
	if (keys.includes(key)) {
		let index = keys.indexOf(key)
		music.setTonic(index)
		visual.setColor(index)
	}
}

/**
 * Helper function to make a button.
 */
function makeButton(text, callback) {
	let button = createButton(text)
	button.mousePressed(callback)
	button.style('font-family', 'monaco')
}

