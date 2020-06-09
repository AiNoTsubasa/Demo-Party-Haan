const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const axios = require('axios');

const router = express();
router.set("view engine", "hbs");
router.set("views", path.join(__dirname, "../../views"));
router.use(express.static(path.join(__dirname, "../../public")));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', async function (req, res) {
    let apiServerEndpoint = `http://${(process.env.API_HOST || "localhost")}:${(process.env.API_PORT || 1780)}/api/user/new`;

    axios.post(apiServerEndpoint, req.body).then((response) => {
        let insertUserResult = response.data;
        if( insertUserResult.status === '000' ) {
            res.redirect('/login?action=register&status=success');
        } else {
            res.redirect('/login?action=register&status=fail');
        }
    }).catch((err) => {
        res.redirect('/login?action=register&status=fail');
    });
    
});

module.exports = router;