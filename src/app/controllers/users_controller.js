const users_DAO = require('../models/users_dao');
let db = require('../../config/database');

const usersDAO = new users_DAO(db);

class users_controller{

    authenticate(email, password){
        return new Promise((resolve, reject) => {
            usersDAO.selectUser(email, password).then((resolved) => {
                resolve(resolved);
            }, (err) => {
                reject(err);
            })
        })
    }

    createUser(nome, email, password){
        return new Promise((resolve, reject) => {
            usersDAO.insertUser(nome, email, password).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    getUserInfo(email){
        return new Promise((resolve, reject) => {
            usersDAO.getUserInfo(email).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }
    
    changePass(newPass, email){
        return new Promise((resolve, reject) => {
            usersDAO.changePassword(newPass, email).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }

    selectPass(email){
        return new Promise((resolve, reject) => {
            usersDAO.selectPass(email).then((resolved) => {
                resolve(resolved);
            }, (rejected) => {
                reject(rejected);
            })
        })
    }
}
module.exports = users_controller;