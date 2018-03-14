class Game {
  constructor(devClass) {
    player = new Character(devClass)
    let move = new Move("Ask for help", function(character, project) {
      project.progress += character.stats[2];
    });
  }
  createProject() {
    names = ["test project", "another project", "one more project"];
    name = name[Math.floor(Math.random() * names.length)];
    difficulty = player.level;
    project = new Project(name, difficulty);
  }
  battle() {
    this.createProject();
    
  }
}
