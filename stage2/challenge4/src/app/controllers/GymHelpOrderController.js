import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

import Queue from '../../lib/Queue';
import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

class GymHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(req.params.id, {
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order not found.' });
    }

    if (helpOrder.answer) {
      return res
        .status(400)
        .json({ error: 'Help Order has already being answered.' });
    }

    helpOrder.answer = answer;
    helpOrder.answer_at = new Date();

    await helpOrder.save();

    await Queue.add(HelpOrderAnswerMail.key, {
      helpOrder,
    });

    return res.json(helpOrder);
  }
}

export default new GymHelpOrderController();
