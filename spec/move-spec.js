import { Character } from './../js/character.js';
import { Project } from './../js/project.js';
import { Move } from './../js/move.js';

describe('Move', function() {
  let char;
  let move;
  let project;
  beforeEach(function() {
    char = new Character("basement hacker");
    project = new Project("test project", 1);
    move = new Move("Ask for help", function(character, project) {
      project.progress += character.stats[2];
    });
  });

  it('should use move to add progress to project', function() {
    expect(project.progress).toEqual(0);
    move.use(char, project);
    expect(project.progress).toEqual(1);
  });
});
