var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlGourmet = require('../controllers/gourmetController');
var ctrlReservoir = require('../controllers/reservoirController');
var ctrlSwitch = require('../controllers/switchController');
var ctrlMonitor = require('../controllers/monitorController');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// reservoir Get
router.get('/data', ctrlReservoir.rd_data);
router.get('/data_last', ctrlReservoir.rd_data_last);
// Rota para Water Gauge
router.get('/data/1/latest', ctrlReservoir.rd_data_latest);
router.get('/data/1/UCSCistern1', ctrlReservoir.rd_data_C1);
//Rotas para Cisterna
router.get('/data/1/UCSCistern1/bl2', ctrlReservoir.rd_data_C1);
router.get('/data/1/UCSCistern2/bl5', ctrlReservoir.rd_data_C2);
//Rotas das Caixas D agua
//router.get('/data/1/UCSReserv1', ctrlReservoir.rd_data_R1);
router.get('/data/1/UCSReserv1/bl1', ctrlReservoir.rd_data_R1bl1); //Caixa D Agua Bloco 1
router.get('/data/1/UCSReserv1/bl2', ctrlReservoir.rd_data_R1bl2); //Caixa D Agua Bloco 2
router.get('/data/1/UCSReserv1/bl3', ctrlReservoir.rd_data_R1bl3); //Caixa D Agua Bloco 3
router.get('/data/1/UCSReserv1/bl4a', ctrlReservoir.rd_data_R1bl4a); //Caixa D Agua Bloco 4a
router.get('/data/1/UCSReserv1/bl4b', ctrlReservoir.rd_data_R1bl4b); //Caixa D Agua Bloco 4b
router.get('/data/1/UCSReserv1/bl5a', ctrlReservoir.rd_data_R1bl5a); //Caixa D Agua Bloco 5a
router.get('/data/1/UCSReserv1/bl5b', ctrlReservoir.rd_data_R1bl5b); //Caixa D Agua Bloco 5b
router.get('/data/1/UCSReserv1/bl6a', ctrlReservoir.rd_data_R1bl6a); //Caixa D Agua Bloco 6a
router.get('/data/1/UCSReserv1/bl6b', ctrlReservoir.rd_data_R1bl6b); //Caixa D Agua Bloco 6b

//Get and post para Monitoramento da Rede
router.get('/data/monitor', ctrlMonitor.rd_data_monitor); //Get arquivo JSON com resultado dos pings
router.post('/data/monitor', ctrlMonitor.wr_data_monitor); //Post arquivo JSON com resultado dos pings


// reservoir Post
router.post('/data', ctrlReservoir.wr_data);

// gourmet Get
router.get('/data1', ctrlGourmet.rd_data);
// gourmet Post
router.post('/data1', ctrlGourmet.wr_data);

// switch Get
router.get('/switchArray', ctrlSwitch.rd_SwArray);
// switch Post
router.post('/switchArray', ctrlSwitch.wr_SwArray);


module.exports = router;

