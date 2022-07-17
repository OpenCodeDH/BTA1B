const path = require('path');
const http = require('http');
const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/vehicle-plate-number', (req, res) => {
  const filePath = path.join(__dirname, 'vehicle-plates.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: `Read file failed: + err.message. Please contact to administrator!`,
      });
    }
    const vehiclePlatesData = JSON.parse(data);
    return res.status(200).json({
      data: vehiclePlatesData.vehiclePlates,
    });
  });
});

app.get('/vehicle-plate-number/:provinceId', (req, res) => {
  const provinceId = req.params.provinceId;
  const filePath = path.join(__dirname, 'vehicle-plates.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: `Read file failed: + ${ err.message }. Please contact to administrator!`,
      });
    }
    const vehiclePlatesData = JSON.parse(data);
    const vehiclePlate = vehiclePlatesData.vehiclePlates.find((item) => item.id === provinceId);
    if (vehiclePlate) {
      return res.status(200).json({
        data: {
          vehiclePlateNumber: vehiclePlate.vehiclePlateNumber,
        },
      });
    } else {
      return res.status(404).json({
        message: 'No vehicle plates found'
      });
    }
  });
});

app.get('*', (_, res) => {
  return res.header('Content-Type', 'text/html').status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening at ${ PORT }`);
});
