var express = require('express');
var router = express.Router();
var connection = require('../config/dbConnection');
router.get('/search', function (request, response) {
    if (request.session.username) {
        var keyword = request.query.keyword;

        if (keyword) {
            connection.query('SELECT g_idx FROM goods WHERE g_name = ?', [keyword], function (error, results, fields) {
                if (results.length > 0) {
                    response.redirect('/search/success');
                } else {
                    response.redirect('/search/success');
                }
                response.end();
            });
        } else {
            response.end();
        }
    }
    else {
        response.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/"; </script>');

    }

});
router.get('/success', function (request, response) {
    response.render('User_search5');
});
module.exports = router;