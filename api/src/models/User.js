const fs = require('fs');
const FileManager = require('../utils/FileManager');

class Contact extends FileManager {
    
    constructor() {
        super('USERS.json');
    }

    async insertUser(userData) {
        
        let userList = await this.readFile();
        userList.push(userData);
        let writeFileSuccess = this.writeFile(userList);
        if( writeFileSuccess ) {
            return { 'status': '000', 'statusText': 'Success' };
        } else {
            return { 'status': '001', 'statusText': 'Error' };
        }        
    }

    async getUser(email, password) {
        let foundUserObj = {};
        let userList = await this.readFile();
        
        if( userList.length > 0 ) {
            foundUserObj = userList.find((userObj) => {
                return (userObj.email === email && userObj.password === password);
            });
        }
        return foundUserObj;
    }

    async getUserByID(userID) {
        let foundUserObj = {};
        let userList = await this.readFile();
        
        if( userList.length > 0 ) {
            foundUserObj = userList.find((userObj) => {
                return (userObj.userID === userID);
            });
        }
        return foundUserObj;
    }

}

module.exports = Contact;