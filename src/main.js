import { Terminal } from './../js/terminal.js';
import { Game } from './../js/game.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

var terminal = loadTerminal();
var classes = ['basement hacker', 'bro coder', 'gandalf', 'code cowboy'];

function loadTerminal() {
  var term = new Terminal('terminal_3');
  term.setHeight("100%");
  term.setWidth('100%');
  term.setBackgroundColor('black');
  $("#terminal").append(term.html);
  return term;
}
//
// function gameLoop() {
//   setTimeout(gameLoop, 1000);
// }

function askForInput() {
  terminal.print("Choose your class: ");
  classes.forEach(function(devClass, i) {
    terminal.print('[' + i + '] ' + devClass);
  });
  terminal.input('', function(input) {
    terminal.clear();
    if (input.match(/^[0-9]+$/) && parseInt(input) < classes.length) {
      var choice = parseInt(input);
      var devClass = classes[choice];
      var game = new Game(devClass, terminal);
      game.mainMenu();
    } else {
      terminal.print("Choose a valid input");
      askForInput();
    }
  });
}

$(document).ready(function() {
  terminal.printPre();
  askForInput();
});
