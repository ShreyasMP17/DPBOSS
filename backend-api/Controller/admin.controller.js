const AdminLottery = require('../Model/admin.model')
const adminLogin = require('../Model/admin_login.model')

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = [
        { username: "hello@gmail.com", password: "1234" },
    ]
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  
    res.status(200).json({ message: "Login successful", token });
  });

  module.exports = { adminLogin, AdminLottery }