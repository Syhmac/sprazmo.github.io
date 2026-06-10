const { getDatabase } = require('../lib/database');

class Car {
  constructor() {
    this.id = null;
    this.manufacturer = null;
    this.model = null;
    this.year = null;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id === null || id === undefined ? null : Number(id);
    return this;
  }

  getManufacturer() {
    return this.manufacturer;
  }

  setManufacturer(manufacturer) {
    this.manufacturer = manufacturer;
    return this;
  }

  getModel() {
    return this.model;
  }

  setModel(model) {
    this.model = model;
    return this;
  }

  getYear() {
    return this.year;
  }

  setYear(year) {
    this.year = year === null || year === undefined ? null : Number(year);
    return this;
  }

  static fromArray(array) {
    const car = new Car();
    return car.fill(array);
  }

  fill(array) {
    if (Object.prototype.hasOwnProperty.call(array, 'id') && this.getId() === null) {
      this.setId(array.id);
    }

    if (Object.prototype.hasOwnProperty.call(array, 'manufacturer')) {
      this.setManufacturer(array.manufacturer);
    }

    if (Object.prototype.hasOwnProperty.call(array, 'model')) {
      this.setModel(array.model);
    }

    if (Object.prototype.hasOwnProperty.call(array, 'year')) {
      this.setYear(array.year);
    }

    return this;
  }

  static findAll() {
    const database = getDatabase();
    const carsArray = database.prepare('SELECT * FROM car').all();

    return carsArray.map((carArray) => Car.fromArray(carArray));
  }

  static find(id) {
    const database = getDatabase();
    const carArray = database.prepare('SELECT * FROM car WHERE id = :id').get({ id });

    if (!carArray) {
      return null;
    }

    return Car.fromArray(carArray);
  }

  save() {
    const database = getDatabase();

    if (!this.getId()) {
      const result = database.prepare(
        'INSERT INTO car (manufacturer, model, year) VALUES (:manufacturer, :model, :year)',
      ).run({
        manufacturer: this.getManufacturer(),
        model: this.getModel(),
        year: this.getYear(),
      });

      this.setId(result.lastInsertRowid);
      return;
    }

    database.prepare(
      'UPDATE car SET manufacturer = :manufacturer, model = :model, year = :year WHERE id = :id',
    ).run({
      manufacturer: this.getManufacturer(),
      model: this.getModel(),
      year: this.getYear(),
      id: this.getId(),
    });
  }

  delete() {
    const database = getDatabase();
    database.prepare('DELETE FROM car WHERE id = :id').run({
      id: this.getId(),
    });

    this.setId(null);
    this.setManufacturer(null);
    this.setModel(null);
    this.setYear(null);
  }
}

module.exports = Car;
