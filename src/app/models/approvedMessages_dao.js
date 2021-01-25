class approvedMessages_dao{

    constructor(db){
        this._db = db;
    }

    
    insertMessage(message, sentTime, idStr){
        return new Promise((resolve, reject) => {
            
            let query = `insert into approvedMessages (message, sentAt, approvedAt, idStr) values ('${message}', '${sentTime}', now(), '${idStr}');`

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
                        resolve('Mensagem aprovada com sucesso!');
                    }  
                })
                
            })
            
        })
    }

    selectAllApprovedMessages() {
        return new Promise((resolve, reject) => {

            let query = `select message, idMessage, DATE_FORMAT(sentAt, '%d-%m-%Y às %H:%i') as sentAt, idStr from approvedMessages order by sentAt desc;`
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
    selectMessage(id){
        return new Promise((resolve, reject) => {
            let query = `select message, idMessage, DATE_FORMAT(sentAt, '%d-%m-%Y às %H:%i') as sentAt, idStr from approvedMessages where idMessage = ${id};`

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
                        }else{
                            con.release();
                            reject('A mensagem não foi encontrada!')
                        }
                    }
                })
            })
        })
    }
    
    deleteAllApprovedMessages(){
        return new Promise((resolve, reject) => {
            let query = `delete from approvedMessages where idMessage > 0;`

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
                        resolve('Todas as mensagens aprovadas foram deletadas!');
                    }
                })
            })
        })
    }


    deleteMessage(id){
        return new Promise((resolve, reject) => {

            let query = `delete from approvedMessages where idMessage = ${id};`;
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
                        resolve('A mensagem foi excluída com sucesso!');
                    } 
                })

            })
        })
    }
}

module.exports = approvedMessages_dao;
