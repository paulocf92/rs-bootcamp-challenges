import * as Yup from 'yup';
import PaymentPlan from '../models/PaymentPlan';

class PaymentPlanController {
  async index(req, res) {
    const page = req.query.page || 1;

    const paymentPlans = await PaymentPlan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 20,
      offset: 20 * page - 20,
    });

    return res.json(paymentPlans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const paymentPlan = await PaymentPlan.create({
      ...req.body,
    });

    return res.json(paymentPlan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const paymentPlan = await PaymentPlan.findByPk(req.params.id);

    if (!paymentPlan) {
      return res.status(400).json({ error: "Plan doesn't exist." });
    }

    await paymentPlan.update(req.body);

    return res.json(paymentPlan);
  }

  async delete(req, res) {
    const paymentPlan = await PaymentPlan.findByPk(req.params.id);

    if (!paymentPlan) {
      return res.status(400).json({ error: "Plan doesn't exist." });
    }

    await paymentPlan.destroy();

    return res.send();
  }
}

export default new PaymentPlanController();
