var express = require('express');
var router = express.Router();
const {index, addHc, listado, paciente, login, processLogin, destroy, logout,processEdit, edit} = require('../controllers/indexcontroller.js');
const Validations = require('../validations/index.js')
const ValidationsLogin = require('../validations/login.js')
const loginCheck = require('../middleware/loginCheck');
const url = require('../middleware/url');

/* GET home page. */
router.get('/', url, index);
router.post('/', Validations, url, addHc);
router.get('/listado', url, listado)
router.get('/hc/:id', url, paciente)
router.get('/login', url, login);
router.post('/login', ValidationsLogin, url, processLogin);
router.get('/logout', url,logout)
router.put('/hc/delete/:id',loginCheck, url, destroy);
router.get('/hc/edit/:id', loginCheck, url, edit);
router.put('/hc/edit/:id', loginCheck,  url,processEdit);


module.exports = router;
 