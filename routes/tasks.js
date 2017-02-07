/**
 * Created by jim on 2017/2/7.
 */
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
//mongojs(connectionString, [collections])
var mycollection = 'tasks';
var db =  mongojs('mongodb://punchcard:a12345678@ds145019.mlab.com:45019/punchcard',[mycollection]);

/* 取得所有訊息 */
router.get('/', function(req, res, next) {
    //db.<collection name>.find()
    try{
        db.tasks.find(function (err, data) {
            if(err){
                res.send(err);
                console.log(err)
            }
            else{
                res.json(data);
                console.log(data)
            }
        })
    }
    catch (err) {
        res.json({"error":"Bad Data"});
        console.log(err)
    }
});

/*用_id取得單一訊息*/
router.get('/:id', function(req, res, next) {
    //db.<collection name>.findOne()
    try {
        db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function (err, data) {
            if(err){
                res.send(err);
                console.log(err)
            }
            else{
                res.json(data);
                console.log(data)
            }
        })
    }
    catch (err) {
        res.json({"error":"Bad Data"});
        console.log(err)
    }
});

/*塞入資料進入db*/
router.post('/', function(req, res, next) {
    var task=req.body;
    if(!task.title || (task.isDone+'')){
        res.status(400);
        res.json({"error":"Bad Data"});
    }
    else{
        db.tasks.save(task,function(err,data){
            if(err){
                res.send(err);
            }
            else{
                res.json(data);
            }
        })
    }
});

/*用_id刪除單一訊息*/
router.delete('/:id', function(req, res, next) {
    //db.<collection name>.findOne()
    try {
        db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, data) {
            if(err){
                res.send(err);
                console.log(err)
            }
            else{
                res.json(data);
                console.log(data)
            }
        })
    }
    catch (err) {
        res.json({"error":"Bad Data"});
        console.log(err)
    }
});

/*用_id更新單一訊息*/
router.put('/:id', function(req, res, next) {
    var task = req.body;
    var updtask ={};

    if(task.isDone){
        updtask.isDone=task.isDone;
    }
    if(task.title){
        updtask.title=task.title;
    }
    if(!updtask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        })
    }
    try {
        //db.<collection name>.findOne()
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updtask,{}, function (err, data) {
            if(err){
                res.send(err);
                console.log(err)
            }
            else{
                res.json(data);
                console.log(data)
            }
        })
    }
    catch (err) {
        res.json({"error":"Bad Data"});
        console.log(err)
    }
});

module.exports = router;