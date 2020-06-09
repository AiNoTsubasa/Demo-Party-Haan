const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const router = express();
router.set("view engine", "hbs");
router.set("views", path.join(__dirname, "../../views"));
router.use(express.static(path.join(__dirname, "../../public")));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

router.get('/', function (req, res) {
    let action = req.query.action ? req.query.action : '';
    let status = req.query.status ? req.query.status : '';

    let displayObj = {
        isDisplay: false,
        isPositiveMessage: false,
        message: ''
    };
    if( action === 'register' ) {
        displayObj.isDisplay = true;
        if( status === 'success') {
            displayObj.isPositiveMessage = true;
            displayObj.message = 'ทำการสมัครสมาชิกเรียบร้อย';
        } else {
            displayObj.isPositiveMessage = false;
            displayObj.message = 'ไม่สามารถสมัครสมาชิกได้ รบกวนติดต่อผู้ดูแลระบบ';
        }
    } else if( action === 'login' ) {
        displayObj.isDisplay = true;
        displayObj.isPositiveMessage = false;
        displayObj.message = 'ผิดพลาด! Email หรือ Password ไม่ถูกต้อง';
    }

    res.render('login', displayObj);
});

router.post('/', function (req, res) {
    
    let email = req.body.email;
    let password = req.body.password;
    if( email.length > 0 && password.length > 0) {

        let apiServerEndpoint = `http://${(process.env.API_HOST || "localhost")}:${(process.env.API_PORT || 1780)}/api/user/email/${email}/password/${password}`;

        axios.get(apiServerEndpoint).then((response) => {
            let selectedUserObj = response.data;
            if( selectedUserObj.hasOwnProperty('userID') ) {

                const privateKey = fs.readFileSync(`${__dirname}/../config/private.key`);

                const payload = {
                    userID: selectedUserObj.userID,
                    email: selectedUserObj.email,
                    role: selectedUserObj.role,
                }
               
                const token = jwt.sign(payload, privateKey);
                res.cookie('token', token, { maxAge: 900000 });
                
                res.redirect('/');
            } else {
                res.redirect('/login?action=login&status=123');
            }
        }).catch((err) => {
            console.log('err => ', err)
            res.redirect('/login?action=login&status=456');
        });
        
    } else {
        res.redirect('/login?action=login&status=789');
    }

    // const privateKey = fs.readFileSync(`${__dirname}/../../config/private.key`);
    // res.send('Test');
});

module.exports = router;