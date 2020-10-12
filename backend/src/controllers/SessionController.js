const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, password });
    }

    return res.json(user);
  },

  async login(req, res) {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).send('Not found');
    }
    else if (user.password != password) {
      res.status(401).send('Incorrect password');
    }
    else {
      return res.json(user);
    }
  }
};
