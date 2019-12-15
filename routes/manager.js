var express = require('express');
var router = express.Router();
var connection = require('../config/dbConnection');
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'uploads/market/');
    },
    filename: function (request, file, callback) {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1 < 10) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
        var date = (now.getDate() < 10) ? '0' + now.getDate() : now.getDate();
        var hour = (now.getHours() < 10) ? '0' + now.getHours() : now.getHours();
        var minute = (now.getMinutes() < 10) ? '0' + now.getMinutes() : now.getMinutes();
        var second = (now.getSeconds() < 10) ? '0' + now.getSeconds() : now.getSeconds();
        var millisecond = now.getMilliseconds();
        callback(null, file.fieldname + '_' + year + month + date + '_' + hour + minute + second + millisecond + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });
router.get('/', function (request, response) {
    response.render('manager');
});
router.get('/profile', function (request, response) {
    if (request.session.username) {
        response.render('manager_profile', { username: request.session.username });
    } else {
        response.redirect('/login/manager');
    }
});
router.get('/checkProfile', function (request, response) {
    var checkId = request.session.username;
    var checkPw = request.query.checkPw;
    connection.query('SELECT * FROM managers WHERE m_id = ? AND m_pw = ?', [checkId, checkPw], function (error, results, fields) {
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

    connection.query('SELECT * from managers where m_id=?', [request.session.username], function (error, result) {
        if (error) { console.log(error); }
        else {
            response.send({ username: request.session.username, result: result, login_mode: request.session.login_mode });
        }
    });
});

router.post('/changeProfile', function (request, response) {

    var new_password = request.body.new_password;
    var new_name = request.body.new_name;

    connection.query('update managers set m_pw=?, m_name=? where m_id=?', [new_password, new_name, request.session.username], function (error) {
        if (error) { console.log(error); }
        else {
            var result = '수정이 완료되었습니다.';
            response.send({ result: result });
        }
    });
})

router.get('/getMarketList', function (request, response) {
    var userId = request.session.username;
    connection.query('SELECT * FROM stores WHERE m_name = ?', [userId], function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                response.send(results);
            }
        }
    })
});

router.get('/chatting', function (request, response) {
    var market = request.query.market;
    if (request.session.username && request.session.login_mode == "2") {
        response.render('manager_chatting', { market: market });
    } else {
        response.redirect('/login/manager');
    }
});

router.post('/products', function (request, response) {
    var storeIndex = request.body.storeIndex;
    var userId = request.session.username;
    connection.query('SELECT * FROM stores WHERE s_idx = ? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        }
        response.render('manager_products', { username: userId, market: results[0].s_idx, market_name: results[0].s_name });
    });
});

router.get('/products', function (request, response) {
    //
    var username = request.session.username;
    if (username) {
        connection.query('SELECT * FROM stores WHERE s_idx=(SELECT min(s_idx) FROM stores where s_idx>0 and m_name=?)', [username], function (error, result) {
            if (error) {
                throw error;
            }
            if (result.length > 0) {

                response.render('manager_products', { username: username, market: result[0].s_idx, market_name: result[0].s_name, username: request.session.username, login_mode: request.session.login_mode });
            }
            else {
                response.render('manager_products', { username: username, market: 0, market_name: '보유한 매장이 없습니다.' });
            }
        })
    }
    else {
        response.redirect('/login/manager');

    }

});

router.get('/getProductList', function (request, response) {
    var storeIndex = request.query.storeIndex;
    var beforeStoreIndex, afterStoreIndex;
    var userId = request.session.username;
    var storeName;
    connection.query('SELECT s_name FROM stores WHERE s_idx = ? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        }
        storeName = results[0].s_name;
    });
    connection.query('SELECT max(s_idx) maxIndex FROM stores WHERE s_idx<? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results.length == 1) {
            beforeStoreIndex = results[0].maxIndex;
        }
        else {
            beforeStoreIndex = 0;
        }
    });
    connection.query('SELECT min(s_idx) minIndex FROM stores WHERE s_idx>? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results.length == 1) {
            afterStoreIndex = results[0].minIndex;
        }
        else {
            afterStoreIndex = 0;
        }
    });
    connection.query('SELECT * FROM goods WHERE g_s_idx = ?', [storeIndex], function (error, results, fields) {
        if (error) {
            throw error;
        }
        response.send({
            beforeStoreIndex: beforeStoreIndex,
            afterStoreIndex: afterStoreIndex,
            storeName: storeName,
            result: results
        })
    });
});
// 마켓 정보
router.get('/getMarketInfo', function (request, response) {
    var storeIndex = request.query.storeIndex;
    var beforeStoreIndex, afterStoreIndex;
    var userId = request.session.username;
    var storeName;
    connection.query('SELECT s_name FROM stores WHERE s_idx = ? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results.length > 0) {
            storeName = results[0].s_name;
        } else {
            storeName = null;
        }
    });
    connection.query('SELECT max(s_idx) maxIndex FROM stores WHERE s_idx<? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results.length == 1) {
            beforeStoreIndex = results[0].maxIndex;
        }
        else {
            beforeStoreIndex = 0;
        }
    });
    connection.query('SELECT min(s_idx) minIndex FROM stores WHERE s_idx>? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        }
        if (results.length == 1) {
            afterStoreIndex = results[0].minIndex;
        }
        else {
            afterStoreIndex = 0;
        }
    });

    connection.query('SELECT * FROM stores WHERE s_idx = ? AND m_name = ?', [storeIndex, userId], function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            if (results.length > 0) {
                response.send({
                    beforeStoreIndex: beforeStoreIndex,
                    afterStoreIndex: afterStoreIndex,
                    storeName: storeName,
                    result: results
                });
            }
        }
    })
})

router.get('/market', function (request, response) {
    //
    if (request.session.username) {
        var username = request.session.username;
        connection.query('SELECT * FROM stores WHERE s_idx=(SELECT min(s_idx) FROM stores where s_idx>0 and m_name=?)', [username], function (error, result) {
            if (error) {
                throw error;
            }
            if (result.length > 0) {

                response.render('manager_market', { username: username, market: result[0].s_idx, market_name: result[0].s_name });
            }
            else {
                response.render('manager_market', { username: username, market: 0, market_name: '보유한 매장이 없습니다.' });
            }
        });
    } else {
        response.redirect('/login/manager');
    }
});

router.get('/market/insert', function (request, response) {
    if (request.session.username) {
        response.render('manager_market_insert', { username: request.session.username });
    } else {
        response.redirect('/login/manager');
    }
});
router.post('/insertMarket', upload.single('storeImage'), function (request, response) {
    var userId = request.session.username;
    var storeName = request.body.storeName;
    var storeAddress = request.body.storeAddress;
    var storeDetailAddress = request.body.storeDetailAddress;
    var storeTell = request.body.storeTell;
    var storeLocationLong = request.body.storeLocationLong;
    var storeLocationLat = request.body.storeLocationLat;
    var storeImagePath = '';
    if (request.file) {
        storeImagePath = '/files/market/' + request.file.filename;
    }
    else {
        storeImagePath = '/files/market/default.jpg';
    }
    connection.query('SELECT m_idx FROM managers WHERE m_id = ?', [userId], function (error1, results, fields) {
        if (error1) {
            throw error1;
        }
        var s_m_idx = results[0].m_idx;
        connection.query('INSERT INTO stores (s_name, s_location, s_location_detail, s_tell,s_m_idx, s_location_long, s_location_lat, m_name, storeImage) VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)', [storeName, storeAddress, storeDetailAddress, storeTell, s_m_idx, storeLocationLong, storeLocationLat, userId, storeImagePath], function (error2, results, fields) {
            if (error2) {
                throw error2;
            } else {
                response.redirect('/manager/market');
            }
        })
    });

});


router.get('/market/modify', function (request, response) {
    var marketIndex = request.query.marketIndex;
    if (request.session.username) {
        connection.query('SELECT * FROM stores WHERE s_idx = ?', [marketIndex], function (error, results, fields) {
            if (error) {
                throw error;
            }
            response.render('manager_market_modify', {
                username: request.session.username,
                storeName: results[0].s_name,
                storeDetailAddress: results[0].s_location_detail,
                storeAddress: results[0].s_location,
                storeLocationLong: results[0].s_location_long,
                storeLocationLat: results[0].s_location_lat,
                storeTell: results[0].s_tell,
                storeImage: results[0].storeImage
            });
        });
    } else {
        response.redirect('/login/manager');
    }
 
});
router.post('/modifyMarket', upload.single('storeImage'), function (request, response) {
    var userId = request.session.username;
    var storeName = request.body.storeName;
    var storeAddress = request.body.storeAddress;
    var storeDetailAddress = request.body.storeDetailAddress;
    var storeTell = request.body.storeTell;
    var storeLocationLong = request.body.storeLocationLong;
    var storeLocationLat = request.body.storeLocationLat;

    connection.query('SELECT s_idx FROM stores WHERE m_name = ?', [userId], function (error1, results, fields) {
        if (error1) {
            throw error1;
        }
        var s_idx = results[0].s_idx;
        if (request.file) {
            var storeImagePath = '/files/market/' + request.file.filename;
            connection.query('UPDATE stores SET s_name = ?, s_location = ?, s_location_detail =?, s_tell = ?, s_location_long = ?, s_location_lat = ?, storeImage =? WHERE m_name =? AND s_idx = ?', [storeName, storeAddress, storeDetailAddress, storeTell, storeLocationLong, storeLocationLat, storeImagePath, userId, s_idx], function (error, results, fields) {
                if (error) {
                    throw error;
                }
            })

        }
        else {
            connection.query('UPDATE stores SET s_name = ?, s_location = ?, s_location_detail =?, s_tell = ?, s_location_long = ?, s_location_lat = ? WHERE m_name =? AND s_idx = ?', [storeName, storeAddress, storeDetailAddress, storeTell, storeLocationLong, storeLocationLat, userId, s_idx], function (error, results, fields) {
                if (error) {
                    throw error;
                }
            })
        }
        response.redirect('/manager/market');

    });
})



router.get('/modifyProduct', function (request, response) {
    var goodsIndex = request.query.goodsIndex;
    var newStockNum = request.query.newStockNum;
    if (goodsIndex && newStockNum) {
        connection.query('UPDATE goods SET g_stock_num = ? WHERE g_idx = ?', [newStockNum, goodsIndex], function (error, results, fields) {
            if (error) {
                throw error;
            }
        });
    }
})

router.get('/getBarcodeInfo', function (request, response) {
    var newGoodsBarcode = request.query.newGoodsBarcode;
    if (newGoodsBarcode) {
        connection.query('SELECT * FROM barcode WHERE b_num = ?', [newGoodsBarcode], function (error, results, fields) {
            if (error) {
                throw error;
            }
            if (results.length == 1) {
                response.send({
                    message: 'success',
                    newGoodsCategory: results[0].b_g_category,
                    newGoodsName: results[0].b_g_name,
                    newGoodsPrice: results[0].b_g_price
                });
            } else {
                response.send({
                    message: 'failed'
                })
            }
        });
    }
})
router.post('/insertProduct', function (request, response) {
    var userId = request.session.username;
    var newGoodsCategory = request.body.newGoodsCategory;
    var newGoodsName = request.body.newGoodsName;
    var newGoodsPrice = request.body.newGoodsPrice;
    var newGoodsStockNum = request.body.newGoodsStockNum;
    var s_idx = request.body.s_idx;
    connection.query('SELECT * FROM goods WHERE g_category =? AND g_name = ? AND g_account = ? AND g_s_idx = ?', [newGoodsCategory, newGoodsName, newGoodsPrice, s_idx], function (error1, results, fields) {
        if (error1) {
            throw error1;
        }
        if (results.length == 0) {
            connection.query('INSERT INTO goods (g_category, g_name, g_account, g_stock_num, g_s_idx) VALUES (?, ?, ?, ?, ?)', [newGoodsCategory, newGoodsName, newGoodsPrice, newGoodsStockNum, s_idx], function (error, results, fields) {
                if (error) {
                    throw error;
                }
                response.send({
                    message: 'success'
                });
            })
        } else {
            connection.query('UPDATE goods SET g_stock_num = g_stock_num + ? WHERE g_category =? AND g_name = ? AND g_account = ? AND g_s_idx = ?', [newGoodsStockNum, newGoodsCategory, newGoodsName, newGoodsPrice, s_idx], function (error2, results, fields) {
                if (error2) {
                    throw error2;
                } response.send({
                    message: 'success'
                });
            })
        }
    });
})

router.get('/deleteProduct', function (request, response) {
    var goodsIndex = request.query.goodsIndex;
    if (goodsIndex) {
        connection.query('DELETE FROM goods WHERE g_idx = ?', [goodsIndex], function (error, results, fields) {
            if (error) {
                throw error;
            }
            response.send({
                message: 'success'
            });
        })
    } else {
        response.send({
            message: 'error'
        })
    }
})

router.get('/deleteMarket', function (request, response) {
    var storeIndex = request.query.storeIndex;
    connection.query('DELETE FROM stores WHERE s_idx = ?', [storeIndex], function (error, results, fields) {
        if (error) {
            throw error;
        }
        response.send({
            message: 'success'
        })
    })
})
module.exports = router;