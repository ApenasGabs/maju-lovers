const approvedMessages_DAO = require('../models/approvedMessages_dao');
let db = require('../../config/database');

const approvedMessagesDAO = new approvedMessages_DAO(db);

class approvedMessages_controller{

    approveMessage(message, sentTime, idStr){
        return new Promise((resolve, reject) => {
            approvedMessagesDAO.insertMessage(message, sentTime, idStr).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    selectAllApprovedMessages(){
        return new Promise((resolve, reject) => {
            approvedMessagesDAO.selectAllApprovedMessages().then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    selectMessage(id){
        return new Promise((resolve, reject) => {
            approvedMessagesDAO.selectMessage(id).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    deleteAllApprovedMessages(){
        return new Promise((resolve, reject) => {
            approvedMessagesDAO.deleteAllApprovedMessages().then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    deleteMessage(id){
        return new Promise((resolve, reject) => {
            approvedMessagesDAO.deleteMessage(id).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }


}
module.exports = approvedMessages_controller;