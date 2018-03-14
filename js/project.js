export class Project {
  constructor(name, difficulty) {
    this.name = name;
    this.difficulty = difficulty;
    this.reward = difficulty * difficulty;
    this.progress = 0;
    this.moneyReward = 2 * difficulty;
  }

}
