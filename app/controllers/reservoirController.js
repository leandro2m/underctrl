var passport = require('passport');
var mongoose = require('mongoose'); //mongo connection
var sensorData = require('../models/sensorschema');


// pega aproximadamente as ultimas 12 horas pra capturar o ultimo registro de cada reservatório

module.exports.rd_data_last = function(req, res,next) {
    mongoose.model('Ws').find({}, {}, { sort: {$natural: -1}, limit: 5280}, function (err, ws) { 
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }

  
// pega toda a base de dados de reservatório, usado pra rotina de relatórios

module.exports.rd_data = function(req, res,next) {
        mongoose.model('Ws').find( {} , function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }
  
// post do registro de reservoir

module.exports.wr_data = function(req, res,next) {
    var sD= new sensorData();
    sD.datetime = req.body.datetime;
    sD.condoid = req.body.condoid;
    sD.blocoid = req.body.blocoid;
    sD.sensorid = req.body.sensorid ;
    sD.poleid = req.body.poleid ;
    sD.level1 = req.body.level1 ;
    sD.level2 = req.body.level2;
    sD.level3 = req.body.level3;
    sD.level4 = req.body.level4;
    sD.temp = req.body.temp;
    sD.humi = req.body.humi;
 
    sD.save(function (err, post) {
      if (err) { return next(err) }
           res.status(201).json({ message: 'data added to reservoir collection'});
  })

} 

module.exports.rd_data_latest = function(req, res,next) {
          mongoose.model('Ws').find({}).sort({$natural: -1}).limit(5280).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }


module.exports.rd_data_C = function(req, res,next) {
//app.get('/api/data/1/UCSCistern1', function(req, res, next) {
        mongoose.model('Ws').find({"sensorid": "UCSCistern1"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }
//API Cisterna 1  
module.exports.rd_data_C1 = function(req, res,next) {
//app.get('/api/data/1/UCSCistern1/bl2', function(req, res, next) {
        mongoose.model('Ws').find({"sensorid": "UCSCistern1", "blocoid": "2"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }
//API Cisterna 2
module.exports.rd_data_C2 = function(req, res,next) {
//app.get('/api/data/1/UCSCistern1/bl5', function(req, res, next) {
        mongoose.model('Ws').find({"sensorid": "UCSCistern1", "blocoid": "5"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    } 
  

//API Caixa D Agua Bloco 1
module.exports.rd_data_R1bl1 = function(req, res,next) {  
        mongoose.model('Ws').find({"sensorid": "UCSReserv1", "blocoid": "1"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
      }
//API Caixa D Agua Bloco 2
module.exports.rd_data_R1bl2 = function(req, res,next) {  
        mongoose.model('Ws').find({"sensorid": "UCSReserv1", "blocoid": "2"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
      }

//API Caixa D Agua Bloco 3
module.exports.rd_data_R1bl3 = function(req, res,next) {      
//app.get('/api/data/1/UCSReserv1/bl3', function(req, res, next) {
        mongoose.model('Ws').find({"sensorid": "UCSReserv1", "blocoid": "3"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
  }

    //Api Bloco 4A
module.exports.rd_data_R1bl4a = function(req, res,next) {   
        mongoose.model('Ws').find({"sensorid": "UCSReserv1", "blocoid": "4"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }
    //Api Bloco 4B
module.exports.rd_data_R1bl4b = function(req, res,next) {   
        mongoose.model('Ws').find({"sensorid": "UCSReserv2", "blocoid": "4"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }

  //Api Bloco 5A
module.exports.rd_data_R1bl5a = function(req, res,next) {   
        mongoose.model('Ws').find({"sensorid": "UCSReserv1", "blocoid": "5"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }
    //Api Bloco 5B
module.exports.rd_data_R1bl5b = function(req, res,next) {   
        mongoose.model('Ws').find({"sensorid": "UCSReserv2", "blocoid": "5"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }

        //Api Bloco 6A
module.exports.rd_data_R1bl6a = function(req, res,next) {   
        mongoose.model('Ws').find({"sensorid": "UCSReserv1", "blocoid": "6"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }

        //Api Bloco 6B
module.exports.rd_data_R1bl6b = function(req, res,next) {  
        mongoose.model('Ws').find({"sensorid": "UCSReserv2", "blocoid": "6"}).sort({$natural:-1}).exec(function (err, ws) {
              if (err) {
                  return console.error(err);
              } else {
                  res.format({
                    json: function(){
                        res.json(ws);
                    }
                });
              }     
        });
    }