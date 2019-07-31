import User from '../models/User';

class UserController {
  async store(req, res) {
    // check if user exists to validate field uniqueness
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, email, name } = await User.create(req.body);

    return res.json({ id, email, name });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, email, name });
  }
}

export default new UserController();
