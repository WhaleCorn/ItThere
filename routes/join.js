var express = require('express');
var router = express.Router();
var connection = require('../config/dbConnection');

router.get('/', function (request, response) {
    response.render('join', { success: "회원가입 페이지" });
});


router.post('/process', function (request, response) {
    var userId = request.body.userId;
    var userPw = request.body.userPw;
    var userName = request.body.userName;
    var setting = request.body.r3;

    if (setting == "1") {
        connection.query('INSERT INTO customers(c_id, c_pw, c_name) values(?,?,?)', [userId, userPw, userName], function (error, results) {
            if (error) throw error;
        });
    }
    else if (setting == "2") {
        connection.query('INSERT INTO managers(m_id, m_pw, m_name) values(?,?,?)', [userId, userPw, userName], function (error, results) {
            if (error) throw error;
        });
    }

    response.redirect('/');
});

module.exports = router;