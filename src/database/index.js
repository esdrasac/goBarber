const Sequelize = require('sequelize');
const dataBaseConfig = require('../config/database');
const User = require('../app/models/Users');

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models.map((model) => model.init(this.connection));
  }
}

module.exports = new Database();
