const express = require('express');
const fs = require('fs');
const formData = require('express-form-data');

const router = express();
router.use(formData.parse());

router.post('/upload', function (req, res) {

    const files = Object.values(req.files);
    // console.log("files: ", files);
    const promises = files.map( (file) => {
        const source = file.path;
        const originalFileName = file.originalFilename;
        const originalFileNameArray = originalFileName.split('.');
        const fileType = originalFileNameArray[ (originalFileNameArray.length - 1) ];
        const uploadedFileName = `${Date.now()}.${fileType}`;
        const destination = `../uploads/${uploadedFileName}`;
        fs.copyFile(source, destination, (err) => {
            if (err) throw err;
            // console.log(`source: ${source} was copied to destination: ${destination}`);
        });
        return `./uploaded/${uploadedFileName}`;
    });

    Promise.all(promises).then(results => res.json(results));

});

module.exports = router;