const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const user = req.body;

    let user = await User.findOne({ email: user.email });

    if (!user) {
      user = await User.create(user);
    }

    return res.json(user);
  },

  async login(req, res) {
    const { email, senha } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).send('Not found');
    }
    else if (user.password != senha) {
      res.status(401).send('Incorrect password');
    }
    else {
      return res.json(user);
    }
  }
};
