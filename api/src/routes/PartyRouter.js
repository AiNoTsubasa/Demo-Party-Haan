const express = require('express');
const uniqid = require('uniqid');
const Party = require('../models/Party');

const router = express();

router.get('/parties', async function (req, res) {

    let party = new Party();
    let partyResult = await party.getPartyList();
    res.send(partyResult);

});

router.post('/new', async function (req, res) {
    

    let insertData = req.body;
    insertData.partyID = uniqid();
    insertData.createdAt = Date.now();
    
    let party = new Party();
    let insertResult = await party.insertParty(insertData);
    res.send(insertResult);

});

router.post('/updateMember', async function (req, res) {
    

    let updateData = req.body;
    
    let party = new Party();
    let updateResult = await party.updatePartyMember(updateData);
    res.send(updateResult);

});

module.exports = router;