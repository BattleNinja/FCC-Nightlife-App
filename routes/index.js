var express = require('express');
var router = express.Router();
var User = require('../models/user');
var storeSchema = require('../models/store');


router.get('/', function (req, res) {
    // if (req.user) {
    //     console.log(req.user.id);
    // }
    res.render('home')
});
module.exports = router;


// 得到 用户 的商店 喜欢 列表
router.get('/storelist', function (req, res) {
    User.findOne({id: req.user.id}, function (err, user) {
        if (err) throw err;
        res.send(user.likelist);
    });
});

// 得到 用户 的 商店 喜欢列表

router.get('/:id', function (req, res) {
    User.findOne({id: req.params.id.toString()}, function (err, user) {
        if (err) console.log(err);
        res.send(user.likelist);
    });
});


// 添加 或者 删除 用户 的 商店 喜欢 列表 到 数据库
router.put('/:id', function (req, res) {
    // console.log(req.params.id);
    // console.log(req.query.name);
    User.findOne({id: req.params.id.toString()}, function (err, user) {
        if (err) console.log(err);
        // console.log(user.username);
        var index = user.likelist.indexOf(req.query.name);
        if (index > -1) {
            user.likelist.splice(index, 1);
            user.save(function (err, data) {
                if (err) console.log(err);
                // console.log(data);
                res.send(data.likelist)
            });
        } else {
            user.likelist.push(req.query.name);
            user.save(function (err, data) {
                if (err) console.log(err);
                // console.log(data.likelist);
                res.send(data.likelist);
            });
        }

    });
});
