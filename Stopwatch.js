//
//
function Stopwatch(elem) {
	// On/Off Switch*
	// - default: off
	this.isOn = false;

	// Time starts at '0';
	var time = 0;

	// How often it updates (in miliseconds);
	var interval;

	// How much time has passed (in miliseconds);
	var offset;

	// Time Adder
	// - adds time passed to time; prints formatted time to index.html;
	function update() {
		time += delta();
		elem.textContent = timeFormatter(time);
	}

	// Time Passed*
	// - finds current time; subtracts previous 'time' to get timePassed; resets 'offset"; sends result to update();
	function delta() {
		var now = Date.now();
		var timePassed = now - offset;
		offset = now;
		return timePassed;
	}

	// Time Formatter
	// - formats time to '00 : 00 . 000';
	function timeFormatter(time) {
		// Total Milliseconds*
		// - plugs time('in miliseconds') into the date.
		var time = new Date(time);

		// Time Strings*
		// - converts 'time' variables to Strings so their length can be used to determine the Zeroes Placeholder;
		var minutes = time.getMinutes().toString();
		var seconds = time.getSeconds().toString();
		var milliseconds = time.getMilliseconds().toString();

		// Zeroes Placeholder*
		// - minutes get two places; seconds get two places; miliseconds gets three places;
		if (minutes.length < 2) {
			minutes = "0" + minutes;
		}
		if (seconds.length < 2) {
			seconds = "0" + seconds;
		}
		while (milliseconds.length < 3) {
			milliseconds = "0" + milliseconds;
		}

		// returns all the correctly formated time variables together.
		//
		return minutes + " : " + seconds + " . " + milliseconds;
	}

	// Start Stopwatch*
	//  - checks if Stopwatch() is 'off'; interval updates every '.0010sec'; resets 'offset'; keeps Stopwatch() switched 'on';
	this.start = function () {
		if (!this.isOn) {
			interval = setInterval(update.bind(this), 10);
			offset = Date.now();
			this.isOn = true;
		}
	};

	// Stop Stopwatch*
	// - checks if Stopwatch() is 'on'; disables interval; makes interval 'null'; turns Stopwatch() 'off';
	this.stop = function () {
		if (this.isOn) {
			clearInterval(interval);
			interval = null;
			this.isOn = false;
		}
	};

	// Reset Stopwatch*
	// - sets time back to '0';
	this.reset = function () {
		time = 0;
	};
}
