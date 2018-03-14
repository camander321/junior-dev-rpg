class Terminal {
  constructor(id) {
    this.html = document.createElement('div');
		this.html.className = 'Terminal';
		if (typeof(id) === 'string') { this.html.id = id }

		this._innerWindow = document.createElement('div');
		this._output = document.createElement('p');
		this._inputLine = document.createElement('span'); //the span element where the users input is put
		this._cursor = document.createElement('span');
		this._input = document.createElement('p');

    this._shouldBlinkCursor = true;
  }
}
