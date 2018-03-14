import { Terminal } from './../js/terminal.js';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function loadTerminal() {
  var t1 = new Termianl('terminal');
  console.log(t1);
}


$(document).ready(function() {
  console.log("this is a test");
  loadTerminal();
});
