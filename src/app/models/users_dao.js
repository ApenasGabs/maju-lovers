 class users_dao{

    constructor(db){
        this._db = db;
    }

    selectUser(email, password) {
       return new Promise((resolve,reject) => {
           
          let query = `select * from users where email = '${email}' and password = '${password}';`
          this._db.getConnection((err, con) => {
              if(err) reject(err);
              else
              con.query(query, function (error, results) {
                if (error){
                    con.release();
                    reject(err);
                }
                else{
                    if(results.length > 0){
                        con.release();
                        resolve(`Usuário autenticado!`);
                    }else{
                        con.release();
                        reject('Credenciais incorretas!');
                    }
                }
              })
              
          })

       })
    }
    

    insertUser(nome, email, password){
        return new Promise((resolve, reject) => {

            this.alreadyExists(email).then(() => {
                let query = `insert into users (nome, email, password) values('${nome}', '${email}', '${password}')`
                this._db.getConnection((err, con) => {
                    if(err) reject(err);   
                    else
                        con.query(query, (error, results) => {
                            if(error){
                                con.release();
                                reject(error);
                            }else{
                                con.release()
                                resolve('Usuario criado com sucesso!');
                            }
                        })   
                    
                })
               
            }, () => {
                reject('Este e-mail já foi cadastrado!');
            })
    
        })
    }

    getUserInfo(email){
        return new Promise((resolve, reject) => {
            let query = `select nome from users where email = '${email}';`
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
                            resolve(results[0]);
                        }
                        else{
                            con.release();
                            reject('O e-mail não está registrado!');
                        }
                    } 
                })
            })
        })
    }
    
    alreadyExists(email){
        return new Promise((resolve, reject) => { 
            let query = `select * from users where email = '${email}'`;

            this._db.getConnection((err, con) => {
                if(err) reject(err);
                else
                con.query(query, (error, results) => {
                    if(error){
                        con.release();
                        reject(error);
                    } 
                    else{
                        
                        if(results.length > 0){
                            con.release();
                            reject(new Error("E-mail já registrado!"));
                        }
                        else{
                            con.release();
                            resolve('Usuário criado com sucesso!')
                        }
                    }
                });
            })
        })    
    }

    changePassword(newPass, email){
        return new Promise((resolve, reject) => {
            let query = `update users set password = '${newPass}' where email = '${email}';`
            this._db.getConnection((err, con) => {
                if(err) reject(err);
                else
                con.query(query, (err, results) => {
                    if(err){
                        con.release();
                        reject(`Ocorreu um erro ao alterar sua senha :(`);
                    }
                    else{
                        con.release();
                        resolve(`Sua senha foi alterada com sucesso!`);
                    }
                })
            })  
        })
    }

    selectPass(email) {

        return new Promise((resolve, reject) => {
            let query = `select password from users where email = '${email}';`
            console.log(`query: ${query}`)

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
                            con.release()
                            resolve(results)
                        }
                        else{
                            con.release()
                            reject(`O e-mail não está cadastrado!`);
                        }  
                    }
                })
                
            })
        })
    }
}

module.exports = users_dao;

