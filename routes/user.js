var express = require('express');
var router = express.Router();
var connection = require('../config/dbConnection');
router.post('/changeProfile', function (request, response) {

    var new_password = request.body.new_password;
    var new_name = request.body.new_name;

    connection.query('update customers set c_pw=?, c_name=? where c_id=?', [new_password, new_name, request.session.username], function (error) {
        if (error) { console.log(error); }
        else {
            var result = '수정이 완료되었습니다.';
            response.send({ result: result });
        }
    });
})


// 마켓 검색
router.get('/searchMarket', function (request, response) {
    var keyword = request.query.keyword;
    if (request.session.username) {
        if (keyword) {
            connection.query('SELECT * FROM stores WHERE s_name LIKE ?', ['%' + keyword + '%'], function (error, results, fields) {
                if (results.length > 0) {
                    response.render('User_market', {
                        data: results,
                        username: request.session.username,
                        keyword: keyword
                    });
                } else {
                    response.redirect('/user/searchMarket');
                }
            });
        } else {
            response.render('User_market', {
                data: null,
                username: request.session.username,
                keyword: null
            })
        }
    } else {
        response.redirect('/login/user');
    }
})

// 물건 검색
router.get('/searchProduct', function (request, response) {
    if (request.session.username) {
        var keyword = request.query.keyword;
        if (keyword) {
            connection.query('SELECT * FROM goods, stores WHERE g_name LIKE ? AND g_s_idx = s_idx', ['%' + keyword + '%'], function (error, results, fields) {
                if (results.length > 0) {
                    response.render('User_search5', {
                        data: results,
                        keyword: keyword,
                        username: request.session.username
                    })
                } else {
                    response.render('User_search5', {
                        data: results,
                        keyword: keyword,
                        username: request.session.username
                    })

                }
            });
        } else {
            response.render('User_search5', {
                data: null,
                keyword: null,
                username: request.session.username
            });
        }
    }
    else {
        response.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/"; </script>');

    }

});
router.get('/myPage', function (request, response) {
    if(request.session.username){
        response.render('My_page', { username: request.session.username });
    }
    else {
        response.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login/user"; </script>');

    }
});
router.get('/checkProfile', function (request, response) {
    var checkId = request.session.username;
    var checkPw = request.query.checkPw;
    connection.query('SELECT * FROM customers WHERE c_id = ? AND c_pw = ?', [checkId, checkPw], function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results.length == 1) {
            response.send({ message: 'success' });
        } else {
            response.send({ message: 'failed' });
        }
    })
})
router.get('/getProfile', function (request, response) {

    connection.query('SELECT * from customers where c_id=?', [request.session.username], function (error, result) {
        if (error) { console.log(error); }
        else {
            response.send({ username: request.session.username, result: result, login_mode: request.session.login_mode });
        }
    });
});

module.exports = router;