/**
 * Plays music based on user input.
 *
 * @author Sam Roussel
 */

class Music {
	constructor() {
		this.notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A5', 'B5']
		this.tonic = 0
	  this.synth = new p5.PolySynth()
		this.isRecording = false
		this.playChords = false
		this.recorder = new p5.SoundRecorder()
		this.mic = new p5.AudioIn()
		this.soundFile = new p5.SoundFile()

	  this.mic.start()
	  this.recorder.setInput(this.mic)
	  userStartAudio()
	}

	/**
	 * Sets the tonic, which is the note or root of the chord to be played.
	 */
	setTonic = (index) => {
	   this.tonic = index
	}

	/**
	 * Plays a chord or note.
	 */
	play = (volume) => {
		if (this.playChords) {
			// Forms a chord, assuming notes.length is 7
			this.synth.noteAttack(this.notes[this.tonic], volume)
			this.synth.noteAttack(this.notes[(this.tonic + 2) % this.notes.length], volume)
			this.synth.noteAttack(this.notes[(this.tonic + 4) % this.notes.length], volume)
		} else {
			this.synth.noteAttack(this.notes[this.tonic], volume)
		}
	}

	/**
	 * Stops playing music.
	 */
	stop = () => {
		this.synth.noteRelease()
	}

	/**
	 * Sets recording audio.
	 */
	startRecording = () => {
		if (!this.isRecording) {
			this.recorder.record(this.soundFile)
			this.isRecording = true
		}
	}

	/**
	 * Stops recording audio.
	 */
	stopRecording = () => {
		if (this.isRecording) {
			this.recorder.stop()
			this.isRecording = false
		}
	}

	/**
	 * Plays back the currently recorded audio.
	 */
	playback = () => {
		this.soundFile.play()
	}

	/**
	 * Saves the currently recorded audio.
	 */
	save = () => {
		save(this.soundFile, 'output.wav')
	}

	/**
	 * Toggles between playing chords and playing notes
	 */
	togglePlayChords = () => {
		this.playChords = !this.playChords
	}
}
