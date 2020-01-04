import * as Yup from 'yup';
import { parseISO, isBefore, addMonths } from 'date-fns';

import Student from '../models/Student';
import PaymentPlan from '../models/PaymentPlan';
import Registration from '../models/Registration';

import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class RegistrationController {
  async index(req, res) {
    const page = req.query.page || 1;

    const registrations = await Registration.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
      ],
      limit: 20,
      offset: 20 * page - 20,
    });

    return res.json(registrations);
  }

  async show(req, res) {
    const registration = await Registration.findByPk(req.params.id, {
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
      ],
    });

    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const registrationExists = await Registration.findOne({
      where: {
        student_id,
        plan_id,
        start_date,
      },
    });

    if (registrationExists) {
      return res.status(400).json({ error: 'Registration already exists.' });
    }

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Invalid past date.' });
    }

    if (!(await Student.findByPk(student_id))) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const paymentPlan = await PaymentPlan.findByPk(plan_id);

    if (!paymentPlan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    const price = paymentPlan.duration * paymentPlan.price;

    const end_date = addMonths(parseISO(start_date), paymentPlan.duration);

    const registration = await Registration.create(
      {
        ...req.body,
        end_date,
        price,
      },
      {
        include: [
          {
            model: Student,
            attributes: ['id', 'name', 'email'],
          },
          {
            model: PaymentPlan,
            attributes: ['id', 'title', 'duration', 'price'],
          },
        ],
      }
    );

    await registration.reload();

    await Queue.add(RegistrationMail.key, {
      registration,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { start_date, plan_id } = req.body;

    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found.' });
    }

    // Queries/uses either a newly-passed plan id/start date or existing one
    const resolvedPlan = plan_id || registration.plan_id;
    const resolvedDate = parseISO(start_date) || registration.start_date;

    const paymentPlan = await PaymentPlan.findByPk(resolvedPlan);

    // Evaluates only if param plan_id exists
    if (plan_id && !paymentPlan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    // Evaluates only if param start_date exists
    if (start_date && isBefore(resolvedDate, new Date())) {
      return res.status(400).json({ error: 'Invalid past date.' });
    }

    // Ending date and price both needs to be recalculated upon start date or
    // plan change.
    const end_date = addMonths(resolvedDate, paymentPlan.duration);
    const price = paymentPlan.duration * paymentPlan.price;

    await registration.update({ ...req.body, end_date, price });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration not found.' });
    }

    await registration.destroy();

    return res.send();
  }
}

export default new RegistrationController();
