const Users = require('../database/models/User');

module.exports = {
  async auth(req, res) {
    const { username, password } = req.query;

    const user = await Users.find({
      username,
      password
    });

    if (!user) return res.status(401).json({ error: 'Usuário inválido' });

    delete user.password;
    
    return res.json(user);
  }
}