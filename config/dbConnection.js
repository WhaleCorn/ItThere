var mysql = require('mysql');
var dbInfo = require('./dbInfo');
var db = mysql.createConnection(dbInfo);
module.exports = db;