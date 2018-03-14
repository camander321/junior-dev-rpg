export class Move {
  constructor(name, effect) {
    this.name = name;
    this.effect = effect;
  }

  use(character, project) {
    this.effect(character, project);
  }
}
