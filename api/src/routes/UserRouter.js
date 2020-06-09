const express = require('express');
const uniqid = require('uniqid');
const User = require('../models/User');

const router = express();

router.post('/new', async function (req, res) {

    let insertData = {
        'userID': uniqid(),
        'email': req.body.email,
        'password': req.body.password,
        'role': 'USER',
        'createAt': Date.now(),
        'acceptPolicy': req.body.acceptPolicy,
        'acceptNewsletters': req.body.acceptNewsletters
    };
    let user = new User();
    let insertResult = await user.insertUser(insertData);
    res.send(insertResult);

});

router.get('/email/:email/password/:password', async function (req, res) {
    let email = req.params.email;
    let password = req.params.password;

    let user = new User();
    let userResult = await user.getUser(email, password);
    res.send(userResult);
});

router.get('/userID/:userID', async function (req, res) {
    let userID = req.params.userID;

    let user = new User();
    let userResult = await user.getUserByID(userID);
    res.send(userResult);
});

module.exports = router;