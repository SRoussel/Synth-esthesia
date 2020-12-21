/**
 * An interactive music and visual art creator.
 *
 * The system is a synthesis between visual and musical art. The user is able to choose
 * their notes/chords and colors, as well as their volume and stroke width. They can draw/erase
 * a visual image and record music, saving each to a file as they wish.
 *
 * @author Sam Roussel
 */

let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j']
let music, visual, slider, inconsolata

const MIN_STROKE = 1
const MAX_STROKE = 20

/**
 * Preloads fonts and other asynchronous processes; called before setup and draw.
 */
function preload() {
	inconsolata = loadFont('assets/inconsolata.ttf')
}

/**
 * Sets up the canvas, the music and visual classes, and creates UI elements.
 */
function setup() {
	createCanvas(windowWidth, windowHeight)
	music = new Music()
	visual = new Visual()
	slider = createSlider(MIN_STROKE, MAX_STROKE).style('width', '80px')
	createButton('Start Audio Recording').mousePressed(music.startRecording)
	createButton('Stop Audio Recording').mousePressed(music.stopRecording)
	createButton('Playback Audio').mousePressed(music.playback)
	createButton('Save Audio').mousePressed(music.save)
	createButton('Toggle Note/Chord').mousePressed(music.togglePlayChords)
	createButton('Toggle Erase').mousePressed(visual.toggleErase)
	createButton('Save Visual').mousePressed(visual.save)
	textFont(inconsolata)
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
