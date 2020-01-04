import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import PaymentPlan from '../app/models/PaymentPlan';
import Registration from '../app/models/Registration';
import Checkin from '../app/models/Checkin';

const models = [User, Student, PaymentPlan, Registration, Checkin];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    // fires associate method for all models, resolving relationships
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
