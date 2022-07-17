const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const findUsersByUsernameAndPassword = (username, password) => {
  const filePath = path.join(__dirname, 'users.txt');
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const users = JSON.parse(data);
  return users.find((user) => user.username === username && user.password === password);
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/dang-nhap', async (req, res) => {
  const { usernameValue: username, passwordValue: password, isRememberMe } = req.body;
  const user = findUsersByUsernameAndPassword(username, password);
  if (user) {
    const { password, ...restInfo } = user;
    return res.status(200).json({
      message: 'Login successfully!',
      data: {
        ...restInfo,
        isRememberMe,
      },
    });
  } else {
    return res.status(404).json({
      message: 'Login failed. Please check your account infomation!',
    });
  }
});

app.get('/login', (_, res) => {
  return res.status(200).header('Content-Type', 'text/html').sendFile(path.join(__dirname, 'index.html'));
});

app.get('/profile', (_, res) => {
  return res.status(200).header('Content-Type', 'text/html').sendFile(path.join(__dirname, 'profile.html'));
});

app.get('*', (_, res) => {
  return res.redirect('/login');
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
