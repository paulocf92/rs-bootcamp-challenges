import { Model, Sequelize } from 'sequelize';

class PaymentPlan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.REAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default PaymentPlan;
