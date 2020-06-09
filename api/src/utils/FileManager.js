const fs = require('fs');

class FileManager {
    
    constructor(dbFile) {
        this.FILE_PATH = '../dbs/';
        this.DB_FILE = this.FILE_PATH + dbFile;
    }

    readFile() {
        try {
            const data = fs.readFileSync(this.DB_FILE);
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    writeFile(data) {
        let writeData = JSON.stringify(data, null, 2);
        
        try {
            fs.writeFileSync(this.DB_FILE, writeData);
            return true;
        } catch (err) {
            return false;
        }

    }
    
}

module.exports = FileManager;