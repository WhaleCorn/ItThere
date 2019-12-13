var express = require('express');
var router = express.Router();
var connection = require('../config/dbConnection');
router.post('/changeProfile', function(request, response) {
	
	var new_password = request.body.new_password;
	var new_name = request.body.new_name;
	
	connection.query('update customers set c_pw=?, c_name=? where c_id=?', [new_password, new_name, request.session.username], function(error) {
		if(error) { console.log(error); }
		else { 
			var result='수정이 완료되었습니다.';
			response.send({result:result});
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
                        username:request.session.username,
                        keyword:keyword
                    });
                } else {
                    response.redirect('/User_market');
                }
            });
        }else{
            response.render('User_market', {
                data: null,
                username:request.session.username,
                keyword:null
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
                        username:request.session.username
                    })
                } else {
                    response.redirect('/');
                }
                response.end();
            });
        } else {
            response.render('User_search5', {
                data: null
            });
        }
    }
    else {
        response.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/"; </script>');

    }

});
module.exports = router;