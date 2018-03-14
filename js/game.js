import { Character } from './../js/character.js';
import { Project } from './../js/project.js';
import { Move } from './../js/move.js';

export class Game {
  constructor(devClass, terminal) {
    this.player = new Character(devClass);
    this.terminal = terminal;
    let move = new Move("Ask for help", function(character, project) {
      project.progress += character.stats[2];
    });
  }
  createProject() {
    var names = ["test project", "another project", "one more project"];
    var name = names[Math.floor(Math.random() * names.length)];
    var difficulty = this.player.level;
    this.project = new Project(name, difficulty);
  }
  mainMenu() {
    var self = this;
    this.terminal.input("battle", function(input) {
      if (input === 'battle') {
        self.createProject();
        debugger;
        // start battle
      } else {
        self.terminal.print("unknown command");
        self.mainMenu();
      }
    });


  }
}
