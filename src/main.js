import { Terminal } from './../js/terminal.js';
import { Game } from './../js/game.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function loadTerminal() {
  var term = new Terminal('terminal_3');
  term.setHeight("2000px");
  term.setWidth('100%');
  term.setBackgroundColor('black');
  $("#terminal").append(term.html);
  return term;
}

$(document).ready(function() {
  console.log("this is a test");
  var game = new Game("bro coder", loadTerminal());
  game.mainMenu();
    
});
