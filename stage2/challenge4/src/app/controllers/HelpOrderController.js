import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async show(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: req.params.id,
      },
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { question } = req.body;

    const helpOrder = await HelpOrder.create({
      student_id: req.params.id,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
