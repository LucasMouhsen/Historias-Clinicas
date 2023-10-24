const fs = require('fs');
const path = require('path');
const datosPath = path.join(__dirname, '../Historial/datos.txt');

module.exports = (req, res, next) => {
  /* console.log(req.connection.remoteAddress); */
  next()
}