const express = require('express');
const routes = express.Router();
const {User} = require('../model/user.js');
const bcrypt = require('bcrypt');

routes.use(express.json());

routes.post('/:token', async (req, res) => {
  const token = req.params.token;
  const  {password}  = req.body;
  console.log('Params:', req.params);
  try {
    const user = await User.findOne({
      restPasswordToken: token,
      restPasswordExpries: { $gte: Date.now() },
    });
    console.log('Token:', token);
    console.log(password);
console.log('User:', user);
    if (!user) {
      return res.status(404).send({ message: 'Invalid Token' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.restPasswordToken = null;
    user.restPasswordExpries = null;

    await user.save();
    res.status(200).send({ message: 'Password Reset Successfully...' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = routes;
