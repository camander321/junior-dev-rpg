export class Inventory {
  constructor(item, price, stats) {
    this.item = item;
    this.price = price;
    this.stats = stats;
  }
}

export class Store {
  constructor() {
    this.listOfItems = [];
  }
}
