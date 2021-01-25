const allMessages_DAO = require('../models/allMessages_dao');
let db = require('../../config/database');

const allMessagesDAO = new allMessages_DAO(db);

class allMessages_controller{

    sendMessage(message){
        return new Promise((resolve, reject) => {
           allMessagesDAO.insertMessage(message).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    selectAllMessages(){
        return new Promise((resolve, reject) => {
            allMessagesDAO.selectAllMessages().then((resolved) => {
                resolve(resolved)
            }, (rejected) => {
                reject(rejected)
            })
        })
    }



    selectMessage(id, status){

        return new Promise((resolve, reject) => {
            allMessagesDAO.selectMessage(id, status).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    deleteMessage(id){
        return new Promise((resolve, reject) => {
            allMessagesDAO.deleteMessage(id).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }


}
module.exports = allMessages_controller;