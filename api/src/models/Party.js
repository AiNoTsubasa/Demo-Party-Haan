const fs = require('fs');
const FileManager = require('../utils/FileManager');

class Party extends FileManager {
    
    constructor() {
        super('PARTIES.json');
    }

    async getPartyList() {
        let partyList = await this.readFile();
        return partyList;
    }

    async insertParty(userData) {
        
        let partyList = await this.readFile();
        partyList.push(userData);
        let writeFileSuccess = this.writeFile(partyList);
        if( writeFileSuccess ) {
            return { 'status': '000', 'statusText': 'Success', 'partyList': partyList };
        } else {
            return { 'status': '001', 'statusText': 'Error' };
        }        
    }

    async updatePartyMember(updateData) {
        
        const partyID = updateData.partyID;
        const userID = updateData.userID;
        const action = updateData.action;

        let partyList = await this.readFile();
        for (var i in partyList) {
            
            if (partyList[i].partyID === partyID) {
                const members = partyList[i].members;
                if( action === 'ADD' ) {
                    members.push(userID);
                } else if( action === 'REMOVE' ) {
                    const index = members.indexOf(userID);
                    if (index > -1) {
                        members.splice(index, 1);
                    }
                }
            }
        }

        let writeFileSuccess = this.writeFile(partyList);
        if( writeFileSuccess ) {
            return { 'status': '000', 'statusText': 'Success', 'partyList': partyList };
        } else {
            return { 'status': '001', 'statusText': 'Error' };
        }        
    }

}

module.exports = Party;