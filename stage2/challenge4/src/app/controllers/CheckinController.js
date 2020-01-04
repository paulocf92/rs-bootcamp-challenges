import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async show(req, res) {
    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
      },
      include: [
        {
          model: Student,
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const countCheckins = await Checkin.count({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (countCheckins === 5) {
      return res
        .status(400)
        .json({ error: 'You can only check in 5 times a week.' });
    }

    const checkin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
