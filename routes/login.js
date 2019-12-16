var express = require('express');
var router = express.Router();
var connection = require('../config/dbConnection');

router.get('/user', function (request, response) {
    if(!request.session.username){
    request.session.login_mode = "1";
    response.render('login', { success: "로그인 페이지" });
    }
    else{
        response.send('<script type="text/javascript">alert("잘못된 접근입니다."); history.go(-1);</script>')
    }

});
router.get('/manager', function (request, response) {
    if(!request.session.username){
        request.session.login_mode = "2";
        response.render('login', { success: "로그인 페이지" });
        }
        else{
            response.send('<script type="text/javascript">alert("잘못된 접근입니다.");history.go(-1);</script>')
        }
    
    });

router.post('/process', function (request, response) {
    var username = request.body.username;
    var userpw = request.body.userpw;

        if (request.session.login_mode == "1") {
            connection.query('SELECT * FROM customers WHERE c_id=? and c_pw=?', [username, userpw], function (error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/');
                } else {
                    response.send('<script type="text/javascript">alert("아이디 또는 비밀번호가 존재하지 않습니다."); window.location="/login/user"; </script>');
                }
            })
        }
        else if (request.session.login_mode == "2") {
            connection.query('SELECT * FROM managers WHERE m_id=? and m_pw=?', [username, userpw], function (error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/manager');
                } else {
                    response.send('<script type="text/javascript">alert("아이디 또는 비밀번호가 존재하지 않습니다."); window.location="/login/manager"; </script>');
                }
            })
        }
})
module.exports = router;