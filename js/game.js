import { Character } from './../js/character.js';
import { Project } from './../js/project.js';
import { Inventory, Store } from './../js/Inventory.js';
import { Move } from './../js/move.js';

export class Game {
  constructor(devClass, terminal) {
    this.player = new Character(devClass);
    this.player.addMove(new Move("Write some code", function(character, project) {
      project.progress += character.stats[1];
    }));

    this.player.addMove(new Move("Ask for help", function(character, project) {
      project.progress += character.stats[2];
    }));

    this.player.addMove(new Move("Refactor", function(character, project) {
      project.progress += character.stats[0];
    }));

    this.player.addMove(new Move("Unit testing", function(character, project) {
      project.progress += character.stats[3];
    }));

    this.player.addMove(new Move("Pull all-nighter", function(character, project) {
      project.progress += (character.stats[3] + character.stats[1]) / 2;
    }));

    var fedora = new Inventory("Fedora", 50, [2, 2, 2, 2]);
    var energy = new Inventory("Energy drink", 5, [1, 1, 0, 0]);
    var keyboard = new Inventory("Ergonomic keyboard", 6, [0, 1, 0, 1]);
    var donuts = new Inventory("Box of donuts", 10, [0, -1, 3, 0]);
    var glasses = new Inventory("Nerdy glasses", 7, [2, 0, 0, 0]);
    var scarf = new Inventory("Kayla's scarf", 100, [0, 0, 0, 0]);
    this.store = new Store();
    this.store.listOfItems.push(fedora, energy, keyboard, donuts, glasses, scarf);

    this.terminal = terminal;
  }
  createProject() {
    var names = ["Write an RPG Game in Javascript", "Create a Javascript Blockchain", "Open Source project", "Build a house in PHP", "Create a Node package"];
    var name = names[Math.floor(Math.random() * names.length)];
    var difficulty = this.player.level;
    this.project = new Project(name, difficulty);
  }
  showProgress() {
    this.terminal.print("Progress: " + this.project.progress + "% / 100%");
  }
  showLevel() {
    this.terminal.print("Level: " + this.player.level);
  }
  showBalance() {
    this.terminal.print("Balance: " + this.player.money + " BTC");
  }
  showItems() {
    var term = this.terminal;
    this.terminal.print("************ ITEMS ************");
    this.player.inventory.forEach(function(item, i) {
      term.print("[" + i + "] " + item.item + " - " + (item.price/2) + " BTC" );
    });
    this.terminal.print("*******************************");
  }
  showCharacter() {
    this.terminal.clear();
    this.terminal.print("********** Class: " + this.player.devClass + " **********");
    this.showLevel();
    this.showBalance();
    this.terminal.print('Exp: ' + this.player.experience + ' / ' + this.player.nextLevel);
    this.terminal.print("************ STATS ************");
    this.terminal.print("Intelligence: " + this.player.stats[0]);
    this.terminal.print("Productivity: " + this.player.stats[1]);
    this.terminal.print("Social skill: " + this.player.stats[2]);
    this.terminal.print("Code quality: " + this.player.stats[3]);
    this.terminal.print("*******************************");
    this.terminal.print(".");
  }

  showMoves() {
    var term = this.terminal;
    this.terminal.print("************ MOVES ************");
    this.player.moves.forEach(function(move, i) {
      term.print(move.name + ' [' + i + ']');
    });
    this.terminal.print("*******************************");
  }

  startOfBattle() {
    this.terminal.clear();
    this.createProject();
    this.terminal.print(this.project.name);
    this.battle();
  }

  battleWin() {
    this.terminal.print("You completed the project!!!");
    this.player.addMoney(this.project.moneyReward);
    this.player.addExperience(this.project.reward);
    this.terminal.print("You received " + this.project.reward + " XP");
    this.terminal.print("You received " + this.project.moneyReward + " BTC");
    this.mainMenu();
  }

  chooseMove() {
    var self = this;
    this.showMoves();
    this.terminal.input("pick a move to use", function(input) {
      self.terminal.clear();
      if (input.match(/^[0-9]+$/)) {
        var choice = parseInt(input);
        if (choice < self.player.moves.length) {
          self.player.moves[choice].use(self.player, self.project);
          self.showProgress();
          self.battle();
        } else {
          self.terminal.print("this is not a valid move");
          self.chooseMove();
        }
      } else {
        self.terminal.print("this is not a valid move");
        self.chooseMove();
      }

    });
  }

  battle() {
    if (this.project.progress < 100) {
      this.chooseMove();
    } else {
      this.battleWin();
    }
    this.terminal.print();
  }

  sell() {
    var self = this;
    self.terminal.clear();
    self.terminal.print("******** WELCOME TO THE STORE ********");
    self.showBalance();
    self.showItems();
    self.terminal.input("Choose the item you want to sell or press [Q] to get to main menu", function(input) {
      self.terminal.clear();
      if (input.match(/^[0-9]+$/)) {
        var choice = parseInt(input);
        if (choice < self.player.inventory.length) {
          var itemName = self.player.inventory[choice].item;
          self.player.sellInv(self.player.inventory[choice]);
          self.terminal.print("You sold " + itemName);
          self.shop();
        } else {
          self.terminal.print("this is not a valid option");
          self.sell();
        }
      } else if (input === "q" || input === "Q") {
        self.mainMenu();
      }
      else {
        self.terminal.print("this is not a valid option");
        self.sell();
      }
    });
  }

  buy() {
    var self = this;
    self.terminal.clear();
    self.terminal.print("******** WELCOME TO THE STORE ********");
    self.showBalance();
    this.store.listOfItems.forEach(function(position, i) {
      self.terminal.print("[" + i + "] " + position.price + " BTC - " + position.item);
    });
    self.terminal.print('**************************************');
    self.terminal.input("Choose the item you want to buy or press [Q] to get to main menu", function(input) {
      self.terminal.clear();
      if (input.match(/^[0-9]+$/)) {
        var choice = parseInt(input);
        if (choice < self.store.listOfItems.length) {
          if (self.player.buyInv(self.store.listOfItems[choice])) {
            self.terminal.print("You bought " + self.store.listOfItems[choice].item);
            self.shop();
          } else {
            self.terminal.print("You were unable to purchase the item. Make sure you have enough BTC and space on your desk.");
            self.buy();
          }
        } else {
          self.terminal.print("this is not a valid option");
          self.buy();
        }
      } else if (input === "q" || input === "Q") {
        self.mainMenu();
      }
      else {
        self.terminal.print("this is not a valid option");
        self.buy();
      }
    });
  }

  shop() {
    var self = this;
    this.terminal.print("******** WELCOME TO THE STORE ********");
    this.showBalance();

    self.terminal.input("Do you want to [sell] or [buy] an item? Or press [Q] to go back to main menu", function(choice) {
      if (choice === 'sell' || choice === 'SELL') {
        self.sell();
      } else if (choice === 'buy' || choice === 'BUY') {
        self.buy();
      } else if (choice === "Q" || choice === "q") {
        self.terminal.clear();
        self.mainMenu();
      } else {
        self.terminal.clear();
        self.terminal.print(choice + " is not a recognized command");
        self.shop();
      }
    })

  }

  mainMenu() {
    var self = this;
    this.terminal.print("What would you like to do?");
    this.terminal.input("start project [0] | shop [1] | see character [2]", function(input) {
      switch (input) {
        case '0':
          self.startOfBattle();
          break;
        case '1':
          self.terminal.clear();
          self.shop();
          break;
        case '2':
          self.showCharacter();
          self.mainMenu();
          break;
        default:
          self.terminal.print("unknown command");
          self.mainMenu();
      }
    });
  }
}
