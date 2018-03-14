import { Character } from './../js/character.js';
import { Inventory } from './../js/inventory.js';


describe('Character', function() {
  let char;
  let energydrink;
  beforeEach(function() {
    char = new Character("basement hacker");
    energydrink = new Inventory("energy drink", 5, [0,2,0,0]);
  });

  it('should add array of stats to stat array', function() {
    char.addStats([1,0,0,1]);
    expect(char.stats).toEqual([11,8,1,3]);
  });

  it('should subtract array of stats from stat array', function() {
    char.removeStats([1,0,0,1]);
    expect(char.stats).toEqual([9,8,1,1]);
  });

  it('should add experience and level up character', function() {
    char.addExperience(32);
    expect(char.experience).toEqual(7);
    expect(char.level).toEqual(3);
    expect(char.nextLevel).toEqual(22);
  });

  it('should add money, purchase item, and change stats', function() {
    char.addMoney(10);
    expect(char.money).toEqual(10);
    char.buyInv(energydrink);
    expect(char.money).toEqual(5);
    expect(char.stats).toEqual([10,10,1,2]);
  });
});
