class allMessages_dao{

    constructor(db){
        this._db = db;
    }

    
    insertMessage(message){
        return new Promise((resolve, reject) => {
            if(message == null || message.length == 0){
                reject('Digita alguma coisa aí, vai!');
            }else{
                let query = `insert into allMessages (message, date) values ('${message}', now());`
                this._db.getConnection((err, con) => {
                    if(err) reject(err);
                    else
                    con.query(query, (err, results) => {
                    
                        if(err){
                            con.release();
                            reject(err);
                        }
                        else{
                            con.release();
                            resolve('Mensagem enviada com sucesso! Aguarde a aprovação.');
                        }
                    })

                })
                
            }
        })
    }

    selectAllMessages() {
        return new Promise((resolve, reject) => {

            let query = `select idMessage, message, DATE_FORMAT(date, '%d-%m-%Y %T') as date from allMessages order by date desc`
            this._db.getConnection((err, con) => {
                if(err) reject(err);
                else
                con.query(query, (err, results) => {
                    if(err){
                        con.release();
                        reject(err);
                    } 
                    else{
                        if(results.length > 0){
                            con.release();
                            resolve(results);
                        }   
                        else{
                            con.release();
                            reject(null);
                        }
                    }
                })
            })
        })
    }
    selectMessage(id, status){ 
        return new Promise((resolve, reject) => {

            if(status == 1){
                let query = `select idMessage, message, DATE_FORMAT(date, '%Y/%m-%d %T') as date from allMessages where idMessage = ${id};`
                this._db.getConnection((err, con) => {
                    if(err) reject(err);
                    else
                    con.query(query, (err, results) => {
                        if(err){
                            con.release();
                            reject(err);
                        }else{
                            if(results.length > 0){
                                con.release();
                                resolve(results);
                            }
                            else{
                                con.release();
                                reject('A mensagem não existe!');
                            }
                        } 
                    })
                })
                
            } else {
                let query = `select idMessage, message, DATE_FORMAT(date, '%d-%m-%Y %T') as date from allMessages where idMessage = ${id};`
                this._db.getConnection((err, con) => {
                    if(err) reject(err);
                    else
                    con.query(query, (err, results) => {
                        if(err){
                            con.release();
                            reject(err);
                        }else{
                            if(results.length > 0){
                                con.release();
                                resolve(results);
                            }
                            else{
                                con.release();
                                reject('A mensagem não existe!');
                            }
                        }  
                    })
                }) 
            }

        })
    }

   deleteMessage(id){
        return new Promise((resolve, reject) => {
            let query = `delete from allMessages where idMessage = ${id};`;
            this._db.getConnection((err, con) => {
                if(err){
                    reject(err);
                } 
                else{
                    con.query(query, (err, results) => {
                        if(err){
                            con.release();
                            reject(err);
                        }   
                        else{
                            con.release();
                            resolve('Mensagem excluída com sucesso!');
                        } 
                    })
                }
            })
        })
   }
    
}

module.exports = allMessages_dao;
